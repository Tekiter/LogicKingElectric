import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class HashError extends Error {
    constructor() {
        super("Unexpected password hash error occured.");
    }
}

export async function hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch {
        throw new HashError();
    }
}

export async function checkHashedPassword(hashed_password: string, password: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(password, hashed_password);
        return result;
    } catch {
        throw new HashError();
    }
}
