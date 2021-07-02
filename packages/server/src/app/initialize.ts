import { ServiceFacade } from "../services";

export async function initialize(services: ServiceFacade): Promise<void> {
    const init = new Initializer(services);
    await init.init();
}

class Initializer {
    constructor(private readonly services: ServiceFacade) {}

    async init(): Promise<void> {
        await this.services.initialize.initConfig();
        await this.services.initialize.initDefaultAdmin();
    }
}
