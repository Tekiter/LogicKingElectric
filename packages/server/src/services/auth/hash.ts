import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class HashError extends Error {
    constructor() {
        super("Unexpected password hash error occured.");
    }
}

export async function hashPassword(password: string): Promise<string> {
    if (typeof password !== "string") {
        throw new HashError();
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}

export async function checkHashedPassword(hashed_password: string, password: string): Promise<boolean> {
    if (typeof password !== "string" || typeof hashed_password !== "string") {
        throw new HashError();
    }
    const result = await bcrypt.compare(password, hashed_password);
    return result;
}
