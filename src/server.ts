import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRoute } from "./presentation/routes/authRoutes.js";
import { AuthController } from "./presentation/controllers/AuthController.js";
import { RegisterUserUseCase } from "./application/usecases/auth/RegisterUserUseCase.js";
import { BcryptPasswordHasher } from "./infrastructure/services/bcryptHasher.js";
import { UserRepository } from "./infrastructure/repository/UserRepository.js";
import { connect } from "./infrastructure/database/connect.js";
import { LoginUserUsecase } from "./application/usecases/auth/LoginUserUsecase.js";
import { TockenService } from "./infrastructure/services/TokenService.js";
import { authMiddleware } from "./presentation/middleware/authMiddleware.js";
import { userRoute } from "./presentation/routes/userRoutes.js";
import { UserController } from "./presentation/controllers/UserController.js";
import { UpdateUserDetailsUsecase } from "./application/usecases/user/UpdateUserDetailsUsecase.js";
import { authorizationMiddleware } from "./presentation/middleware/authorizationMiddleware.js";
// import { redisConnection } from "./infrastructure/queue/redisConnection.js";
// import {
//   enqueueUserCreated,
//   enqueUserUpdated,
// } from "./infrastructure/queue/userSyncQueue.js";

import { BullMQMessageService } from "./infrastructure/services/BullMQMessageService.js";

import { worker } from "./infrastructure/queue/worker.js";
import { AdminUsecase } from "./application/usecases/admin/AdminUsecase.js";
import { AdminController } from "./presentation/controllers/AdminController.js";
import { adminRoute } from "./presentation/routes/adminRoutes.js";
import { RefreshTokenUsecase } from "./application/usecases/auth/RefreshTokenUsecase.js";

connect();
// redisConnection.on("connect", () => console.log("Connected to Redis"));

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passwordHasher = new BcryptPasswordHasher();
const userRepository = new UserRepository();
const messageService = new BullMQMessageService();
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
  messageService,
);

const tokenService = new TockenService();
const loginUserUsecase = new LoginUserUsecase(
  userRepository,
  passwordHasher,
  tokenService,
);

const refreshTokenUsecase = new RefreshTokenUsecase(
  userRepository,
  tokenService,
);
const authController = new AuthController(
  registerUserUseCase,
  loginUserUsecase,
  refreshTokenUsecase,
);

const upadteUserDetailsUsecase = new UpdateUserDetailsUsecase(
  userRepository,
  messageService,
);
const userController = new UserController(upadteUserDetailsUsecase);

const adminUsecase = new AdminUsecase(userRepository);
const adminController = new AdminController(adminUsecase);

app.use("/", authRoute(authController));

app.use("/user", authMiddleware(tokenService), userRoute(userController));

app.use(
  "/admin",
  authMiddleware(tokenService),
  authorizationMiddleware,
  adminRoute(adminController),
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
