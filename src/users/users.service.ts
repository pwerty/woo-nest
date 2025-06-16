// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "./user.entity";
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService
// {
//     constructor(
//         @InjectRepository(User)
//         private userRepository: Repository<User>,
//     ) {}

//     async create(email: string, name: string, password: string): Promise<User> {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = this.userRepository.create({
//             email, name, password: hashedPassword,
            
//         });
//         return await this.userRepository.save(user);
//     }

//     async findByEmail(email: string): Promise<User | null> {
//         return await this.userRepository.findOne({where: {email}});
//     }

//     async validatePassword(user: User, password: string): Promise<boolean>
//     {
//         return await bcrypt.compare(password, user.password);
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, name: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    
    const savedUser = await this.userRepository.save(user);
    
    if (!savedUser) {
      throw new Error('사용자 생성에 실패했습니다');
    }
    
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
