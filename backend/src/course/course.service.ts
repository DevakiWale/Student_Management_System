import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  create(course: Partial<Course>) {
    return this.courseRepo.save(course);
  }

  findAll() {
    return this.courseRepo.find();
  }

  findOne(id: number) {
    return this.courseRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Course>) {
    return this.courseRepo.update(id, data);
  }

  delete(id: number) {
    return this.courseRepo.delete(id);
  }
}
