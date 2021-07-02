import { ConfigData } from "../../../services/config";
import { ConfigDataAccess } from "../types/config";

const store = {} as Partial<ConfigData>;

export class ConfigMemoryDataAccess implements ConfigDataAccess {
    async getConfig<KeyType extends keyof ConfigData>(key: KeyType): Promise<ConfigData[KeyType] | null> {
        const value = store[key] as ConfigData[KeyType] | undefined;
        if (value === undefined) {
            return null;
        }
        return value;
    }

    async setConfig<KeyType extends keyof ConfigData>(key: KeyType, value: ConfigData[KeyType]): Promise<void> {
        store[key] = value;
    }

    static clear(): void {
        for (const key of Object.getOwnPropertyNames(store)) {
            delete store[key as keyof ConfigData];
        }
    }
}
