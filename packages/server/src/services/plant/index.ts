import { DataAccess } from "../../core/dataAccess/types";
import { Plant } from "../../entity/plant";
import { UserIdentifier } from "../../entity/user";

export interface PlantService {
    ownerHasPlant(owner: UserIdentifier): Promise<boolean>;
    getPlantInfo(owner: UserIdentifier): Promise<Plant>;
    updateOrCreatePlant(owner: UserIdentifier, plant: Plant): Promise<void>;
}

export class PlantServiceImpl implements PlantService {
    constructor(private readonly dataAccess: DataAccess<"plant">) {}

    async ownerHasPlant(owner: UserIdentifier): Promise<boolean> {
        const plant = await this.dataAccess.plant.getPlantByOwnerIdentifier(owner);
        return plant !== null;
    }

    async getPlantInfo(owner: UserIdentifier): Promise<Plant> {
        const plant = await this.dataAccess.plant.getPlantByOwnerIdentifier(owner);
        if (plant === null) {
            throw new PlantNotFoundError(owner);
        }
        return plant;
    }

    async updateOrCreatePlant(owner: UserIdentifier, plant: Plant): Promise<void> {
        await this.dataAccess.plant.saveOrCreatePlant(owner, plant);
    }
}

class PlantNotFoundError extends Error {
    constructor(user: UserIdentifier) {
        super(`Plant of username ${user.username} not found.`);
    }
}
