import { ConfigService, ConfigServiceImpl, defaultConfig } from ".";
import { ConfigMemoryDataAccess } from "../../core/dataAccess/memory/config";
import { ConfigDataAccess } from "../../core/dataAccess/types/config";

describe("Config Service", () => {
    const configDataAccess: ConfigDataAccess = new ConfigMemoryDataAccess();
    const config: ConfigService = new ConfigServiceImpl({ config: configDataAccess });

    beforeEach(async () => {
        ConfigMemoryDataAccess.clear();
        await config.setupIfNoConfig();
    });

    test("setup default configs", async () => {
        ConfigMemoryDataAccess.clear();
        await config.setupIfNoConfig();

        expect(config.getConfig("adminUsername")).resolves.toBe(defaultConfig.adminUsername);
    });

    test("set other config", async () => {
        await config.setConfig("adminUsername", "zzzz");
        expect(config.getConfig("adminUsername")).resolves.toBe("zzzz");
    });

    test("error on invalid config key", async () => {
        ConfigMemoryDataAccess.clear();

        expect(config.getConfig("adminUsername")).rejects.toThrow();
    });
});
