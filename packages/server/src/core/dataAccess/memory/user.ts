import { User } from "../../../entity/user";
import { UserDataAccess } from "../types/user";

const store = new Map<string, User>();

export class UserMemoryDataAccess implements UserDataAccess {
    async getUserByUsername(username: string): Promise<User | null> {
        const user = store.get(username);
        if (user === undefined) {
            return null;
        }
        return user;
    }
    async saveOrCreateUser(user: User): Promise<void> {
        store.set(user.username, user);
    }
}
