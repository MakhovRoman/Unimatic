import { Request, Response } from "express";
import { ApiError } from "../api/apiError";
import bcrypt from "bcrypt";
import { User } from "../db";
import { generateJWT } from "../helpers/generateJWT";


class UserController {
  async registration(req: Request, res: Response, next: (arg: ApiError) => any) {
    const {email, password, firstName, lastName} = req.body;

    // Check no-empty field
    if(!email || !password) {
      return next(ApiError.badRequest('Неправильный email или password'))
    }

    // Check for email availability
    const isAuth = await User.findOne({where: {email}})
    if(isAuth) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }

    // Create new User
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, password: hashPassword, firstName, lastName});
    const token = generateJWT(user.id, email)

    return res.json({token})
  }

  async login(req: Request, res: Response, next: (arg: ApiError) => any) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}})

    // checking for user presence
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    // checking password validity
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }

    const token = generateJWT(user.id, user.email);
    return res.json({token})
  }

  async checkAuth(req: Request, res: Response, next: (arg: ApiError) => void) {
    // @ts-ignore
    const token = generateJWT(req.user.id, req.user.email);
    return res.json({token})
  }

  async me(req: Request, res: Response, next: (arg: ApiError) => void) {
    const {email} = req.body;
    const user = await User.findOne({where: {email}});

    return res.json(user)
  }
 }


export const userController = new UserController;
