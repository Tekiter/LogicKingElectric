import { subDays } from "date-fns";
import { Plant, SolarPlant } from "../../entity/plant";
import { PlantService } from "../plant";
import { RegisterService } from "../register";
import { SolarPlantService } from "../solarPlant";
import { SubmitActualService } from "../submitActual";
import { SubmitPredictionService } from "../submitPrediciton";
import { UserService } from "../user";

export interface DemoService {
    setupDemoData(): Promise<void>;
}

export class DemoServiceImpl implements DemoService {
    constructor(
        private readonly userService: UserService,
        private readonly registerService: RegisterService,
        private readonly plantService: PlantService,
        private readonly solarPlantService: SolarPlantService,
        private readonly submitActual: SubmitActualService,
        private readonly submitPrediction: SubmitPredictionService,
    ) {}

    async setupDemoData(): Promise<void> {
        if ((await this.isDemoExists()) === true) {
            return;
        }

        await this.createAndrew();
    }

    private async isDemoExists(): Promise<boolean> {
        return await this.userService.isUserExists(USER_ANDREW.username);
    }

    private async createAndrew() {
        await this.registerService.registerUser({ username: USER_ANDREW.username, password: USER_ANDREW.password });
        const user = await this.userService.getUserIdentifier(USER_ANDREW.username);

        await this.plantService.updateOrCreatePlant(user, USER_ANDREW.plant);
        await this.solarPlantService.updateOrCreateSolarPlant(user, USER_ANDREW.solarPlant);

        await Promise.all([
            ...USER_ANDREW.actualGeneration.map(({ target, amount }) => {
                return (async () => {
                    this.submitActual.submitActual(user, { targetDate: target, amount });
                })();
            }),
            ...USER_ANDREW.predictionGeneration.map(({ target, amount }) => {
                return (async () => {
                    this.submitPrediction.submitPredicted(user, { date: target, amount });
                })();
            }),
        ]);
    }
}

interface UserInfo {
    username: string;
    password: string;
    plant: Plant;
    solarPlant: SolarPlant;
    actualGeneration: { target: Date; amount: number }[];
    predictionGeneration: { target: Date; amount: number }[];
}

const USER_ANDREW: UserInfo = {
    username: "andrew123",
    password: "helloworld",
    plant: {
        name: "우리집태양광발전소",
        type: "solar",
        location: {
            name: "경기도 부천시 XX로 XX",
            coordinate: {
                latitude: 37.486,
                longitude: 126.801,
            },
        },
    },
    solarPlant: {
        arrayType: "fixed",
        temperatureCoefficientPmpp: -0.415,
        meridianAngle: 180,
        tiltAngle: 30,
        capacity: 1000,
    },
    actualGeneration: generateRandomData(),
    predictionGeneration: generateRandomData(),
};

type GenData = { target: Date; amount: number }[];
function generateRandomData(): GenData {
    const result: GenData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < 30; i++) {
        result.push({
            target: curDate,
            amount: randint(5000, 7000),
        });

        curDate = subDays(curDate, 1);
    }

    return result;
}

function randint(a: number, b: number) {
    return Math.random() * (b - a) + a;
}
