// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string; role: 'admin' | 'student' },
  ) {
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const { email, password } = body;

    const result = await this.authService.login(email, password);

    if (!result) {
      throw new BadRequestException('Invalid credentials');
    }

    res.cookie('token', result.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { role: result.role };
  }
}
