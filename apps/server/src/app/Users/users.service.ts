import { Injectable } from '@nestjs/common';
import { usersModel } from './users.model';
import { userDTO } from './users.dto';

@Injectable()
export class usersService {
    [x: string]: any;
  private users: usersModel[] = [];

  getUsers(): usersModel[] {
    return this.users;
  }

  createUsers(input: userDTO): usersModel {
    const user: usersModel = {
      id: (this.users.length + 1).toString(),
      name: input.name,
      email: input.email,
      mobileNumber: input.mobileNumber,
    };

    this.users.push(user);
    return user;
  }
//  async updateUsers(id: string, name: string, description: string): Promise<usersModel> {
//       return this.prisma.Users.update({
//         where: { id },
//         data: {
//           name,
//           description,
//         },
//       });
//     }
  
//     async deleteUsers(id: string): Promise<boolean> {
//       const deleteResult = await this.prisma.Users.delete({
//         where: { id },
//       });
  
//       return !!deleteResult;
//     }

}