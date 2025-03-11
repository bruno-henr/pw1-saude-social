import { doctorRepository } from "../../../repositories";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const loginUseCase = new LoginUseCase(
    doctorRepository,
);
const loginController = new LoginController(loginUseCase);

export { loginController };
