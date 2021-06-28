export interface User {
    username: string;
}

export interface UserService {
    createNewUser(userInfo: User): Promise<void>;
}
