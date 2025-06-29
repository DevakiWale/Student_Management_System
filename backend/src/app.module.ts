import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './auth/user.entity';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
import { Enrollment } from './enrollment/enrollment.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Devaki@2729',
      database: 'student_management',
      entities: [User, Student, Course, Enrollment],
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    CourseModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
