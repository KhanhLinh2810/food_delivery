export declare class EncUtil {
    static createHash(data: string): Promise<string>;
    static comparePassword(data: string, hash: string): Promise<boolean>;
}
