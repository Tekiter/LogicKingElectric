import { WindPlant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";

export interface WindPlantDataAccess {
    getWindPlantByOwnerIdentifier(owner: UserIdentifier): Promise<WindPlant | null>;
    saveOrCreateWindPlant(owner: UserIdentifier, windPlant: WindPlant): Promise<void>;
}
