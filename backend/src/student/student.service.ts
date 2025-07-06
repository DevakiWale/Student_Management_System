import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async create(student: Partial<Student>) {
    const newStudent = this.studentRepo.create(student);
    return this.studentRepo.save(newStudent);
  }

  async findAll() {
    return this.studentRepo.find({
      relations: ['user', 'enrollments', 'enrollments.course'],
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['enrollments', 'enrollments.course'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, data: Partial<Student>) {
    const student = await this.findOne(id); // ensure student exists
    Object.assign(student, data);
    return this.studentRepo.save(student);
  }

  async delete(id: number) {
    const student = await this.findOne(id); // ensure student exists
    return this.studentRepo.remove(student);
  }

  async findByUserId(userId: number): Promise<Student | null> {
    return this.studentRepo.findOne({
      where: { user: { id: userId } },
      relations: ['enrollments', 'enrollments.course'],
    });
  }
}
