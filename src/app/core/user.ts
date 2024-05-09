
import { Role } from "./role";

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
  registrationDate: Date;


  constructor(
    userId: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    role: Role,
    registrationDate: Date,

  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.role = role;
    this.registrationDate = registrationDate;

  }


  
}
