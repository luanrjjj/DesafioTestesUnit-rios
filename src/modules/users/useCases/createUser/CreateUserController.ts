import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserUseCase);
    console.log("passou aqui")
    await createUser.execute({
      name,
      email,
      password
    });
   console.log("passou aqui 1")
    return response.status(201).send();
  }
}
