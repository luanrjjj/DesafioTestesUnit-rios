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
    let type;
    const { amount, description ,user_id} = request.body;
    const  receiver_id = request.params.user_id
  
    console.log('receiver_id',receiver_id)
    console.log('user_id',user_id)
    const splittedPath = request.originalUrl.split('/')
    console.log('kkkkk',splittedPath)

    if(splittedPath[splittedPath.length -1].length>10) {
        type = splittedPath[splittedPath.length - 2] as OperationType;
    } else {
       type = splittedPath[splittedPath.length - 1] as OperationType;
    }
    console.log('sasdsadsa',type)
    
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
