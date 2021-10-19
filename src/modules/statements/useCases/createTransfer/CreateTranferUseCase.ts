import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { ICreateTransferDTO } from "./ICreateTranserDTO";

import {OperationType} from '../../../statements/entities/Statement'

@injectable()
export class CreateTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ user_id, amount, description,receiver_id }: ICreateTransferDTO) {
    const user = await this.usersRepository.findById(user_id);

  

    if(!user) {
      throw new CreateStatementError.UserNotFound();
    }

  
      const { balance } = await this.statementsRepository.getUserBalance({ user_id });



      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }
    

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type:OperationType.TRANSFER,
      receiver_id,
      amount,
      description
    });
    
  
    return statementOperation;
  }
}
