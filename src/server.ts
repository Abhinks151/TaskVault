import express from "express";
import { authRoute } from "./presentation/routes/authRoutes.js";
import { AuthController } from "./presentation/controllers/AuthController.js";
import { RegisterUserUseCase } from "./application/usecases/auth/RegisterUserUseCase.js";
import { BcryptPasswordHasher } from "./infrastructure/services/bcryptHasher.js";
import { UserRepository } from "./infrastructure/repository/UserRepository.js";
import { connect } from "./infrastructure/database/connect.js";
import { LoginUserUsecase } from "./application/usecases/auth/LoginUserUsecase.js";
import { TockenService } from "./infrastructure/services/TokenService.js";

connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passwordHasher = new BcryptPasswordHasher();
const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
);

const tokenService = new TockenService();
const loginUserUsecase = new LoginUserUsecase(
  userRepository,
  passwordHasher,
  tokenService,
);
const authController = new AuthController(
  registerUserUseCase,
  loginUserUsecase,
);

app.use("/", authRoute(authController));

app.listen(3000, () => console.log("Server running on port 3000"));
