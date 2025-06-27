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
    return this.studentRepo.find();
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  delete(id: number) {
    return this.studentRepo.delete(id);
  }
}
