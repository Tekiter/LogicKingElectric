import { DataAccess } from "../../core/dataAccess/types";
import { WindPlant } from "../../entity/plant";
import { UserIdentifier } from "../../entity/user";

export interface WindPlantService {
    ownerHasWindPlantInfo(owner: UserIdentifier): Promise<boolean>;
    getWindPlantInfo(owner: UserIdentifier): Promise<WindPlant>;
    updateOrCreateWindPlant(owner: UserIdentifier, windPlant: WindPlant): Promise<void>;
}

export class WindPlantServiceImpl implements WindPlantService {
    constructor(private readonly dataAccess: DataAccess<"windPlant">) {}

    async ownerHasWindPlantInfo(owner: UserIdentifier): Promise<boolean> {
        const solarPlant = await this.dataAccess.windPlant.getWindPlantByOwnerIdentifier(owner);
        return solarPlant !== null;
    }

    async getWindPlantInfo(owner: UserIdentifier): Promise<WindPlant> {
        const plant = await this.dataAccess.windPlant.getWindPlantByOwnerIdentifier(owner);
        if (plant === null) {
            throw new WindPlantNotFoundError(owner);
        }
        return plant;
    }

    async updateOrCreateWindPlant(owner: UserIdentifier, windPlant: WindPlant): Promise<void> {
        await this.dataAccess.windPlant.saveOrCreateWindPlant(owner, windPlant);
    }
}

class WindPlantNotFoundError extends Error {
    constructor(user: UserIdentifier) {
        super(`WindPlant of username ${user.username} not found.`);
    }
}
