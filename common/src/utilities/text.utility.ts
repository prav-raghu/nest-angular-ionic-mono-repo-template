export class TextUtility {
    public static generatePassword(length: number = 8): string {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const digits = "0123456789";
        const specials = "!@#$%^&*()_+-=[]{}|;:',.<>/?";
        if (length < 3) throw new Error("Password length must be at least 3");
        let password = [
            upper[Math.floor(Math.random() * upper.length)],
            digits[Math.floor(Math.random() * digits.length)],
            specials[Math.floor(Math.random() * specials.length)],
        ];
        const allChars = upper + lower + digits + specials;
        for (let i = 3; i < length; i++) {
            password.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }
        for (let i = password.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [password[i], password[j]] = [password[j], password[i]];
        }
        return password.join("");
    }
}
