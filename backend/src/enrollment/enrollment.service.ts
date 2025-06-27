import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async enroll(studentId: number, courseId: number) {
    const student = await this.studentRepo.findOneBy({ id: studentId });
    const course = await this.courseRepo.findOneBy({ id: courseId });

    if (!student || !course) throw new NotFoundException('Student or Course not found');

    const enrollment = this.enrollmentRepo.create({ student, course });
    return this.enrollmentRepo.save(enrollment);
  }

  findAll() {
    return this.enrollmentRepo.find({
      relations: ['student', 'course'],
    });
  }
}
