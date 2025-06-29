import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  create(student: Partial<Student>) {
    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({
      relations: ['user', 'enrollments', 'enrollments.course'], // helpful for admin view
    });
  }

  findOne(id: number) {
    return this.studentRepo.findOne({
      where: { id },
      relations: ['user', 'enrollments', 'enrollments.course'],
    });
  }

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  delete(id: number) {
    return this.studentRepo.delete(id);
  }

  // ✅ NEW: used to get student data from the logged-in user's ID
  async findByUserId(userId: number) {
    return this.studentRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'enrollments', 'enrollments.course'],
    });
  }
}
