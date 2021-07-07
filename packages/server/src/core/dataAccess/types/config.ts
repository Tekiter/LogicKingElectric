import { ConfigData, ConfigDataKey } from "../../../services/config";

export interface ConfigDataAccess {
    getConfig<KeyType extends ConfigDataKey>(key: KeyType): Promise<ConfigData[KeyType] | null>;
    setConfig<KeyType extends ConfigDataKey>(key: KeyType, value: ConfigData[KeyType]): Promise<void>;
}
