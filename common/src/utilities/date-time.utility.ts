export class DateTimeUtility {
    public static async delay(milliseconds: number): Promise<unknown> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
