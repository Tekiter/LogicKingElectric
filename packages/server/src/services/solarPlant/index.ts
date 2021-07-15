import { DataAccess } from "../../core/dataAccess/types";
import { SolarPlant } from "../../entity/plant";
import { UserIdentifier } from "../../entity/user";

export interface SolarPlantService {
    ownerHasSolarPlantInfo(owner: UserIdentifier): Promise<boolean>;
    getSolarPlantInfo(owner: UserIdentifier): Promise<SolarPlant>;
    updateOrCreateSolarPlant(owner: UserIdentifier, solarPlant: SolarPlant): Promise<void>;
}

export class SolarPlantServiceImpl implements SolarPlantService {
    constructor(private readonly dataAccess: DataAccess<"solarPlant">) {}

    async ownerHasSolarPlantInfo(owner: UserIdentifier): Promise<boolean> {
        const solarPlant = await this.dataAccess.solarPlant.getSolarPlantByOwnerIdentifier(owner);
        return solarPlant !== null;
    }

    async getSolarPlantInfo(owner: UserIdentifier): Promise<SolarPlant> {
        const plant = await this.dataAccess.solarPlant.getSolarPlantByOwnerIdentifier(owner);
        if (plant === null) {
            throw new SolarPlantNotFoundError(owner);
        }
        return plant;
    }

    async updateOrCreateSolarPlant(owner: UserIdentifier, solarPlant: SolarPlant): Promise<void> {
        await this.dataAccess.solarPlant.saveOrCreateSolarPlant(owner, solarPlant);
    }
}

class SolarPlantNotFoundError extends Error {
    constructor(user: UserIdentifier) {
        super(`SolarPlant of username ${user.username} not found.`);
    }
}
