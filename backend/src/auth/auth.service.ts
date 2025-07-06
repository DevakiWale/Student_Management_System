import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Student } from '../student/student.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'student',
  ) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ name, email, password: hashed, role });
    const savedUser = await this.userRepo.save(user);

    if (role === 'student') {
      await this.studentRepo.save({
        user: savedUser,
        name: savedUser.name,
        email: savedUser.email,
      });
    }

    return savedUser;
}
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
});

    return { access_token: token, role: user.role };
  }
}
