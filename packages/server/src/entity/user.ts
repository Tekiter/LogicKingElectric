interface UserInfo {
    nickname: string;
}

export class User {
    username: string;
    info: UserInfo;

    constructor(username: string, info: UserInfo) {
        this.username = username;
        this.info = info;
    }
}
