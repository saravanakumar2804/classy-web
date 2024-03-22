import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { usersModel } from './users.model';
import { userDTO } from './users.dto';

@Injectable()
export class usersService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers(): Promise<usersModel[]> {
    return this.prisma.users.findMany();
  }

  async createUsers(user: userDTO) {
    return await this.prisma.users.create({
      data: user,
    });
  }

  async updateUsers(
    id: string,
   user: userDTO
  ): Promise<usersModel> {
    return this.prisma.users.update({
      where: { id },
      data: {
       ...user
      },
    });
  }

  async deleteUsers(id: string): Promise<boolean> {
    const deleteResult = await this.prisma.users.delete({
      where: { id },
    });

    return !!deleteResult;
  }
}
