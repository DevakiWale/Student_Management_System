import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/enrollment.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Devaki@2729',
      database: 'student_management',
      entities: [Student, Course, Enrollment],
      synchronize: true,
    }),
    StudentModule,
    CourseModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
