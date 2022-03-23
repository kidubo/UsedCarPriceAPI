/* eslint-disable @typescript-eslint/ban-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const _scrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    //Hash the users password
    //Generate a salt
    const salt = randomBytes(8).toString('hex'); //sixteen char random string

    //Has the salt and the password together
    const hash = (await _scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    //Create a new user and save it
    const user = await this.usersService.create(email, result);
    return user;
  }

  signin() {}
}
