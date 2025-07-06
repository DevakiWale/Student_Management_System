import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';


interface JwtUserPayload {
  id: number;
  email: string;
  role: 'admin' | 'student';
}

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req: Request) {
    console.log('📦 req.user:', req.user);
    const rawUser = req.user as any;
    const userId = parseInt(rawUser?.id, 10);

    if (isNaN(userId)) {
      console.error('❌ Invalid user ID from token:', rawUser?.id);
      throw new BadRequestException('Invalid user ID from token');
    }

    const student = await this.studentService.findByUserId(userId);
    if (!student) {
      throw new BadRequestException(`No student found for user ID ${userId}`);
    }

    return student;
}



  @Post()
  create(@Body() data: Partial<Student>) {
    return this.studentService.create(data);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Student>,
  ) {
    return this.studentService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.delete(id);
  }

}
