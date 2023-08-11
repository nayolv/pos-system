import { UsersDto } from './user.model';

export interface LoginDto {
    users: UsersDto[]
}


export interface LoginDataDto {
    email: string
    password: string
  }
  