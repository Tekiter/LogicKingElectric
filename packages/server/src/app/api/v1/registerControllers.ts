import { registerController } from "./util";

import { authorizeController, issueTokenController } from "./controller/auth";
import { registerUserController } from "./controller/register";
import { getPlantInfoController, updatePlantInfoController } from "./controller/plant";

registerController(issueTokenController);
registerController(authorizeController);
registerController(registerUserController);

registerController(getPlantInfoController);
registerController(updatePlantInfoController);
