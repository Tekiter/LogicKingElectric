import { PlantService, PlantServiceImpl } from ".";
import { PlantMemoryDataAccess } from "../../core/dataAccess/memory/plant";
import { Plant } from "../../entity/plant";
import { UserIdentifier } from "../../entity/user";

describe("PlantService", () => {
    const dataAccess = {
        plant: new PlantMemoryDataAccess(),
    };

    const plantService: PlantService = new PlantServiceImpl(dataAccess);

    const sampleOwner: UserIdentifier = { username: "TEST_USERNAME" };
    const samplePlant: Plant = {
        name: "Sample Plant",
        location: {
            coordinate: {
                laditude: 30,
                longitude: 40,
            },
            name: "Seoul",
        },
        type: "solar",
    };

    beforeEach(() => {
        PlantMemoryDataAccess.clear();
    });

    test("create plant", async () => {
        await plantService.updateOrCreatePlant(sampleOwner, samplePlant);
    });

    test("get plant", async () => {
        await plantService.updateOrCreatePlant(sampleOwner, samplePlant);
        const plantInfo = await plantService.getPlantInfo(sampleOwner);

        expect(plantInfo).toEqual(samplePlant);
    });

    test("update plant", async () => {
        await plantService.updateOrCreatePlant(sampleOwner, { ...samplePlant, name: "Other Name" });

        await plantService.updateOrCreatePlant(sampleOwner, samplePlant);
        const plantInfo = await plantService.getPlantInfo(sampleOwner);

        expect(plantInfo).toEqual(samplePlant);
    });

    test("has own plant", async () => {
        expect(plantService.ownerHasPlant(sampleOwner)).resolves.toBe(false);

        await plantService.updateOrCreatePlant(sampleOwner, samplePlant);
        expect(plantService.ownerHasPlant(sampleOwner)).resolves.toBe(true);
    });
});
