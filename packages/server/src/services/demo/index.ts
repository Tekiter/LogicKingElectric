import { PlantService } from "../plant";
import { RegisterService } from "../register";
import { SolarPlantService } from "../solarPlant";
import { SubmitActualService } from "../submitActual";
import { SubmitPredictionService } from "../submitPrediciton";
import { UserService } from "../user";
import { WindPlantService } from "../windPlant";
import { USER_ANDREW, USER_HELLOWORLD } from "./data";
import { UserInfo } from "./types";

export interface DemoService {
    setupDemoData(): Promise<void>;
}

export class DemoServiceImpl implements DemoService {
    constructor(
        private readonly userService: UserService,
        private readonly registerService: RegisterService,
        private readonly plantService: PlantService,
        private readonly solarPlantService: SolarPlantService,
        private readonly windPlantService: WindPlantService,
        private readonly submitActual: SubmitActualService,
        private readonly submitPrediction: SubmitPredictionService,
    ) {}

    async setupDemoData(): Promise<void> {
        if ((await this.isDemoExists()) === true) {
            return;
        }

        await this.createUser(USER_ANDREW);
        await this.createUser(USER_HELLOWORLD);
    }

    private async isDemoExists(): Promise<boolean> {
        return await this.userService.isUserExists(USER_ANDREW.username);
    }

    private async createUser(userInfo: UserInfo) {
        await this.registerService.registerUser({ username: userInfo.username, password: userInfo.password });
        const user = await this.userService.getUserIdentifier(userInfo.username);

        await this.plantService.updateOrCreatePlant(user, userInfo.plant);

        if (userInfo.solarPlant !== undefined) {
            await this.solarPlantService.updateOrCreateSolarPlant(user, userInfo.solarPlant);
        }
        if (userInfo.windPlant !== undefined) {
            await this.windPlantService.updateOrCreateWindPlant(user, userInfo.windPlant);
        }

        await Promise.all([
            ...userInfo.actualGeneration.map(({ target, amount }) => {
                return (async () => {
                    this.submitActual.submitActual(user, { targetDate: target, amount });
                })();
            }),
            ...userInfo.predictionGeneration.map(({ target, amount }) => {
                return (async () => {
                    this.submitPrediction.submitPredicted(user, { date: target, amount });
                })();
            }),
        ]);
    }
}
