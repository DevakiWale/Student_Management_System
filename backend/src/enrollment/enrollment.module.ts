import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Course])],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
})
export class EnrollmentModule {}
