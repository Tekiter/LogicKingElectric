import { Plant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";

export interface PlantDataAccess {
    getPlantByOwnerIdentifier(owner: UserIdentifier): Promise<Plant | null>;
    saveOrCreatePlant(owner: UserIdentifier, plant: Plant): Promise<void>;
}
