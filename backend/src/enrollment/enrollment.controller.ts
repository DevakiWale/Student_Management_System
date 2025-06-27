import { Controller, Post, Body, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  enroll(@Body() data: { studentId: number; courseId: number }) {
    return this.enrollmentService.enroll(data.studentId, data.courseId);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }
}
