import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() data: Partial<Student>) {
    return this.studentService.create(data);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Student>) {
    return this.studentService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.delete(+id);
  }
}
