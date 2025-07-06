// src/enrollment/enrollment.controller.ts
import { Controller, Post, Get, Req, Body, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  enroll(@Req() req: Request, @Body() body: { courseId: number }) {
    const student = req.user as { id: number };
    return this.enrollmentService.enroll(student.id, body.courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getEnrollments(@Req() req: Request) {
    const user = req.user as { id: number; role: string };
    return user.role === 'admin'
      ? this.enrollmentService.findAll()
      : this.enrollmentService.findByStudent(user.id);
  }
}