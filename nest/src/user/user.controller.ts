// src/users/users.controller.ts
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('create user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '회원가입 성공',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '유저 생성됨' },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'uuid',
            },
            email: { type: 'string', example: 'test@test.com' },
            nickName: { type: 'string', example: 'yang' },
            isActive: { type: 'boolean', example: true },
            role: { type: 'string', example: 'user' },
            createdAt: { type: 'string', example: '' },
            updatedAt: { type: 'string', example: '' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '이미 존재하는 이메일',
  })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: '유저 생성됨', user };
  }
}
