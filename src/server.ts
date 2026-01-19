import express from "express";
import dotenv from "dotenv";
import { authRoute } from "./presentation/routes/authRoutes.js";
import { AuthController } from "./presentation/controllers/AuthController.js";
import { RegisterUserUseCase } from "./application/usecases/auth/RegisterUserUseCase.js";
import { BcryptPasswordHasher } from "./infrastructure/services/bcryptHasher.js";
import { UserRepository } from "./infrastructure/repository/UserRepository.js";
import { connect } from "./infrastructure/database/connect.js";
import { LoginUserUsecase } from "./application/usecases/auth/LoginUserUsecase.js";
import { TockenService } from "./infrastructure/services/TokenService.js";
import { authMiddleware } from "./presentation/middleware/authMiddleware.js";

connect();
dotenv.config();
const PORT = process.env.PORT || 3000;

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

app.get("/users", authMiddleware(tokenService), (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully" });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
