import { v4 as uuidv4 } from "uuid";
export class UUIDUtility {
    public static generateUUID(): string {
        return uuidv4();
    }
}
