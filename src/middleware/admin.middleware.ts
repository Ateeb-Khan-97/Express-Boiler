import { Handler } from "express";
import { ResponseMapper } from "../common/mapper/response.mapper";
import { HttpStatus } from "../utils/http-status.util";
import { userService } from "../modules/user/user.service";
import { $Enums } from "@prisma/client";

export const adminMiddleware: Handler = async (req, res, next) => {
  try {
    const user = (await userService.findOneById((req as any).userId))!;
    if (user.role != $Enums.UserRole.ADMIN) throw new Error();

    next();
  } catch (error: any) {
    ResponseMapper.map({
      res,
      status: HttpStatus.FORBIDDEN,
      message: HttpStatus.FORBIDDEN_MESSAGE,
    });
  }
};