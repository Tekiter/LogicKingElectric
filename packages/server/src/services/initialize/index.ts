import { ConfigService } from "../config";
import { RegisterService } from "../register";

export interface InitializeService {
    initConfig(): Promise<void>;
    initDefaultAdmin(): Promise<void>;
}

export class InitializeServiceImpl implements InitializeService {
    constructor(private readonly configService: ConfigService, private readonly registerService: RegisterService) {}

    async initConfig(): Promise<void> {
        this.configService.setupIfNoConfig();
    }

    async initDefaultAdmin(): Promise<void> {
        const defaultAdminUsername = await this.configService.getConfig("adminUsername");
        const defaultAdminPassword = await this.configService.getConfig("adminPassword");

        await this.registerService.registerUser({
            username: defaultAdminUsername,
            password: defaultAdminPassword,
        });
    }
}
