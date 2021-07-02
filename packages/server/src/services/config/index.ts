import { DataAccess } from "../../core/dataAccess/types";
import { ConfigData } from "../../entity/config";

export interface ConfigService {
    setupIfNoConfig(): Promise<void>;
    getConfig<Key extends keyof ConfigData>(key: Key): Promise<ConfigData[Key]>;
    setConfig<Key extends keyof ConfigData>(key: Key, value: ConfigData[Key]): Promise<void>;
}

export const defaultConfig = {
    adminUsername: "admin",
} as ConfigData;

export class ConfigServiceImpl implements ConfigService {
    constructor(private readonly dataAccess: DataAccess<"config">) {}

    async setupIfNoConfig(): Promise<void> {
        for (const rkey in defaultConfig) {
            const key = rkey as keyof ConfigData;
            const configNotExists = (await this.dataAccess.config.getConfig(key)) === null;
            if (configNotExists) {
                await this.dataAccess.config.setConfig(key, defaultConfig[key]);
            }
        }
    }

    async getConfig<Key extends keyof ConfigData>(key: Key): Promise<ConfigData[Key]> {
        const value = await this.dataAccess.config.getConfig(key);
        if (value === null) {
            throw new Error(`Unexpected unavailable config '${key}'.`);
        }
        return value;
    }

    async setConfig<Key extends keyof ConfigData>(key: Key, value: ConfigData[Key]): Promise<void> {
        await this.dataAccess.config.setConfig(key, value);
    }
}
