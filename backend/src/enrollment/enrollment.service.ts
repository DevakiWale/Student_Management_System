import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';
import * as nodemailer from 'nodemailer';

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

  async enroll(studentId: number, courseId: number): Promise<Enrollment> {
    const student = await this.studentRepo.findOneBy({ id: studentId });
    const course = await this.courseRepo.findOneBy({ id: courseId });

    if (!student || !course) {
      throw new NotFoundException('Student or Course not found');
    }

    const enrollment = this.enrollmentRepo.create({ student, course });
    const savedEnrollment = await this.enrollmentRepo.save(enrollment);

    // ✅ Send email notification
    try {
      await this.sendEnrollmentEmail(student.email, student.name, course.title); // Use course.name instead of course.title
    } catch (error) {
      console.error('❌ Failed to send email:', error);
    }

    return savedEnrollment;
  }

  findAll() {
    return this.enrollmentRepo.find({
      relations: ['student', 'course'],
    });
  }

  // ✅ Email Notification
  async sendEnrollmentEmail(toEmail: string, studentName: string, courseName: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Student Management System" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: '🎓 Course Enrollment Confirmation',
      html: `
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>You have been successfully enrolled in the course: <strong>${courseName}</strong>.</p>
        <p>Best wishes,<br/>Student Management Team</p>
      `,
    });
  }
}
