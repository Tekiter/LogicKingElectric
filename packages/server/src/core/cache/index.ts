interface Entry<T> {
    value: T;
    timeout: unknown;
}

export class RequestCache<R, T> {
    private map = new Map<string, Entry<T>>();

    private timeout = 300000;

    constructor(config?: { timeout?: number }) {
        if (config) {
            this.timeout = config.timeout ?? this.timeout;
        }
    }

    set(key: R, value: T): void {
        const nkey = this.getKey(key);
        this.map.set(nkey, {
            value,
            timeout: setTimeout(() => {
                this.map.delete(nkey);
            }, this.timeout),
        });
    }

    get(key: R): T | undefined {
        const entry = this.map.get(this.getKey(key));
        if (entry === undefined) {
            return undefined;
        }

        return entry.value;
    }

    private getKey(key: R) {
        return JSON.stringify(key);
    }
}
