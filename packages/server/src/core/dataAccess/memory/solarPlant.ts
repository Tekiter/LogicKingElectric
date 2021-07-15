import { SolarPlant } from "../../../entity/plant";
import { UserIdentifier } from "../../../entity/user";
import { SolarPlantDataAccess } from "../types/solarPlant";

const store = new Map<string, SolarPlant>();

export class SolarPlantMemoryDataAccess implements SolarPlantDataAccess {
    async getSolarPlantByOwnerIdentifier(owner: UserIdentifier): Promise<SolarPlant | null> {
        const plant = store.get(owner.username);
        if (plant === undefined) {
            return null;
        }
        return plant;
    }

    async saveOrCreateSolarPlant(owner: UserIdentifier, solarPlant: SolarPlant): Promise<void> {
        store.set(owner.username, solarPlant);
    }

    static clear(): void {
        store.clear();
    }
}
