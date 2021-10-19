import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransferUseCase } from './CreateTranferUseCase';



enum OperationType {
  TRANSFER='transfer'
}

export class CreateTransferController {
  async execute(request: Request, response: Response) {
    
    const { amount, description ,user_id} = request.body;
    const  receiver_id = request.params.user_id
    
    //const type = splittedPath[splittedPath.length - 2] as OperationType;
   
  
   
    const createStatement = container.resolve(CreateTransferUseCase);

    const type = 'transfer' as OperationType;
     

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
