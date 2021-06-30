import { registerController } from "../util";

import { issueTokenController } from "./auth";
import { registerUserController } from "./register";

registerController(issueTokenController);
registerController(registerUserController);
