import { ServiceFacade } from "../services";

export async function initialize(services: ServiceFacade): Promise<void> {
    await services.initialize.initialize();
    await services.demo.setupDemoData();
}
