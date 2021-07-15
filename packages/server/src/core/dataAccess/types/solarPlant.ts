import { SolarPlant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";

export interface SolarPlantDataAccess {
    getSolarPlantByOwnerIdentifier(owner: UserIdentifier): Promise<SolarPlant | null>;
    saveOrCreateSolarPlant(owner: UserIdentifier, solarPlant: SolarPlant): Promise<void>;
}
