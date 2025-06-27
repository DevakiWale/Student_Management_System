import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;
}
