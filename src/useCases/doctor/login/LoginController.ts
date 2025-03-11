import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { LoginUseCase } from "./LoginUseCase";
import { ILoginDTO } from "./DTO";
import { sign } from "jsonwebtoken";
import AuthConfig from '../../../constants/jwt'

export class LoginController {
    constructor(private createDoctorUseCase: LoginUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.body as ILoginDTO;

        try {
            const result = await this.createDoctorUseCase.execute(
                { email, senha }
            );
            console.log('data=>', result.data)
            const token = sign({ id: result.data.dataValues.id }, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn,
            });
            return response.status(200).json({
                token, 
                userData: result.data.dataValues
            });
        } catch (e) {
            const error = e as Error;
            console.log('error =>',error)
            return response.status(400).json(
                new ResponseEntity(false, "Login error", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
