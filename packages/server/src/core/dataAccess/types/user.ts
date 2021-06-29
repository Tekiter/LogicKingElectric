import { User } from "../../../entity/user";

export interface UserDataAccess {
    getUserByUsername(username: string): Promise<User | null>;
    saveOrCreateUser(user: User): Promise<void>;
}
