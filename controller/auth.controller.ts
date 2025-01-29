import { Request, Response } from "express";

import { STATUS_CODE } from "@/constants";
import { UserService } from "@/services/user.service";
import { ResponseHelper } from "@/helper/response.helper";
export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  async signUp({ body }: Request, res: Response) {
    try {
      const { email } = body;

      const existingUser = await this.userService.findUserbyEmail(email);

      if (existingUser) {
        return ResponseHelper.json({
          res,
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: "User with email already exist",
        });
      }

      const newUser = await this.userService.create(body);

      return ResponseHelper.json({
        res,
        statusCode: STATUS_CODE.CREATED,
        data: newUser,
      });
    } catch (error) {
      return ResponseHelper.json({
        res,
        errors: error,
        statusCode: STATUS_CODE.SERVER_ERROR,
      });
    }
  }

  async login({ body }: Request, res: Response) {
    try {
      const { email, password } = body;

      const existingUser = await this.userService.findUserbyEmail(email);

      if (!existingUser || !existingUser.isVerified) {
        return ResponseHelper.json({
          res,
          statusCode: STATUS_CODE.UNAUTHORIZED,
          message: !existingUser.isVerified
            ? "User not verified"
            : "Invalid Credentials",
        });
      }

      const isPasswordCorrect = await existingUser.comparePassword(password);

      return ResponseHelper.json({
        res,
        statusCode: STATUS_CODE.CREATED,
        data: isPasswordCorrect,
      });
    } catch (error) {
      return ResponseHelper.json({
        res,
        errors: error,
        statusCode: STATUS_CODE.SERVER_ERROR,
      });
    }
  }
}
