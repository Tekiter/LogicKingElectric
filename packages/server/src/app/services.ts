import { createMemoryDataAccessFacade } from "../core/dataAccess/memory";
import { AuthWithPassword } from "../service/auth";

export interface ServiceFacade {
    auth: AuthWithPassword;
}

export function createServices(): ServiceFacade {
    const dataAccess = createMemoryDataAccessFacade();

    const auth = new AuthWithPassword(dataAccess);

    return {
        auth,
    };
}
