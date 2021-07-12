import { Plant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";
import { PlantDataAccess } from "../types/plant";

const store = new Map<string, Plant>();

export class PlantMemoryDataAccess implements PlantDataAccess {
    async getPlantByOwnerIdentifier(owner: UserIdentifier): Promise<Plant | null> {
        const plant = store.get(owner.username);
        if (plant === undefined) {
            return null;
        }
        return plant;
    }

    async saveOrCreatePlant(owner: UserIdentifier, plant: Plant): Promise<void> {
        store.set(owner.username, plant);
    }

    static clear(): void {
        store.clear();
    }
}
