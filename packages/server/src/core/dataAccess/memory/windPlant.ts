import { WindPlant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";
import { WindPlantDataAccess } from "../types/windPlant";

const store = new Map<string, WindPlant>();

export class WindPlantMemoryDataAccess implements WindPlantDataAccess {
    async getWindPlantByOwnerIdentifier(owner: UserIdentifier): Promise<WindPlant | null> {
        const plant = store.get(owner.username);
        if (plant === undefined) {
            return null;
        }
        return plant;
    }

    async saveOrCreateWindPlant(owner: UserIdentifier, solarPlant: WindPlant): Promise<void> {
        store.set(owner.username, solarPlant);
    }

    static clear(): void {
        store.clear();
    }
}
