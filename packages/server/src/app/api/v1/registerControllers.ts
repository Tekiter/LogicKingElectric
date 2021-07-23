import { registerController } from "./util";

import { authorizeController, issueTokenController } from "./controller/auth";
import { registerUserController } from "./controller/register";
import { getPlantInfoController, updatePlantInfoController } from "./controller/plant";
import {
    getSolarPlantInfoController,
    predictSolarPlantController,
    updateSolarPlantInfoController,
} from "./controller/solarPlant";
import { monthlyHistoryReportController } from "./controller/analysis";
import { submitActualController, submitPredictionController } from "./controller/submit";

registerController(issueTokenController);
registerController(authorizeController);
registerController(registerUserController);

registerController(getPlantInfoController);
registerController(updatePlantInfoController);

registerController(getSolarPlantInfoController);
registerController(updateSolarPlantInfoController);
registerController(predictSolarPlantController);

registerController(monthlyHistoryReportController);

registerController(submitActualController);
registerController(submitPredictionController);
