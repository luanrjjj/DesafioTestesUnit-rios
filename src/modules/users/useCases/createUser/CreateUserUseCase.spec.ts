import {CreateUserUseCase} from './CreateUserUseCase';
import {InMemoryUsersRepository} from '../../repositories/in-memory/InMemoryUsersRepository'
import {UsersRepository} from '../../repositories/UsersRepository'


let usersRepository: UsersRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let createUser:CreateUserUseCase


describe('CreateUser',()=> {
    beforeEach(()=>{
        inMemoryUsersRepository = new InMemoryUsersRepository()
        usersRepository = new UsersRepository()
        createUser= new CreateUserUseCase(inMemoryUsersRepository)
        
    })
  

    it('should be able to create user',async() => {

        const user = await createUser.execute({
            name:'luan',
            email:'teste@hotmail.com',
            password:'123456'
        })
        console.log('KKKKKKK',user)
        expect(user).toHaveProperty('id')
})




})