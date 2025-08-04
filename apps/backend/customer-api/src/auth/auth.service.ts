import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient
  ) {}

  public async register(dto: RegisterDto): Promise<{ message: string; userId: number }> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new ConflictException('Email address already registered');
    }
    const customerRole = await this.prisma.role.findUnique({
      where: { name: 'Customer' },
    });
    if (!customerRole) {
      throw new ConflictException('Customer role not found');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const newUser: Pick<User, 'id'> = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        passwordHash,
        role: { connect: { id: customerRole.id } },
      },
      select: {
        id: true,
      },
    });
    return { message: 'User registered successfully', userId: newUser.id };
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<{ id: number; email: string } | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) return null;

    return { id: user.id, email: user.email };
  }

  public login(user: { id: number; email: string }): { accessToken: string } {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
