import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/getAllEmployees').get(
    (req,res)=> new UserController().getAllEmployees(req,res)
)

userRouter.route('/getTotalWorkingHours').get(
    (req,res)=> new UserController().getTotalWorkingHours(req,res)
)



export default userRouter