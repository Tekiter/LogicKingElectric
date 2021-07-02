import { registerController } from "./util";

import { authorizeController, issueTokenController } from "./controller/auth";
import { registerUserController } from "./controller/register";

registerController(issueTokenController);
registerController(authorizeController);
registerController(registerUserController);
