export interface UserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  role: 'waiter' | 'kitchen' | 'admin';
}