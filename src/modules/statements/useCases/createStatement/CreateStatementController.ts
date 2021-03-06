import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER='transfer'
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    
    const { amount, description ,user_id} = request.body;
    const  receiver_id = user_id

    const splittedPath = request.originalUrl.split('/')

    
    const type = splittedPath[splittedPath.length - 1] as OperationType;


    
    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      user_id,
      receiver_id,
      type,
      amount,
      description
    });
    console.log(statement)

    return response.status(201).json(statement);
  }
}
