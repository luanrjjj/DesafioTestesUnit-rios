import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

@injectable()
export class CreateStatementUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ user_id, type, amount, description,receiver_id }: ICreateStatementDTO) {
    const user = await this.usersRepository.findById(user_id);
    console.log(receiver_id)
    console.log('oi',user_id)

    if(!user) {
      throw new CreateStatementError.UserNotFound();
    }

    if(type === 'withdraw'||type==='transfer') {
      const { balance } = await this.statementsRepository.getUserBalance({ user_id });

    console.log('balance',balance)

      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }
    }

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type,
      receiver_id,
      amount,
      description
    });
    

    return statementOperation;
  }
}
