import { DataAccess } from "../../core/dataAccess/types";
import { User } from "../../entity/user";

export interface UserService {
    createNewUser(userInfo: User): Promise<CreateNewUserResult>;
    isUserExists(username: string): Promise<boolean>;
}

interface CreateNewUserResult {
    state: "created" | "userExists";
}

export class UserServiceImpl implements UserService {
    constructor(private readonly dataAccess: DataAccess<"user">) {}

    async createNewUser(userInfo: User): Promise<CreateNewUserResult> {
        const existingUser = await this.dataAccess.user.getUserByUsername(userInfo.username);
        const userExists = existingUser !== null;

        if (userExists) {
            return {
                state: "userExists",
            };
        }

        await this.dataAccess.user.saveOrCreateUser(userInfo);
        return { state: "created" };
    }

    async isUserExists(username: string): Promise<boolean> {
        const existingUser = await this.dataAccess.user.getUserByUsername(username);
        const userExsits = existingUser !== null;

        return userExsits;
    }
}
