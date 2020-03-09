import { Emoji, Gold } from "./tokens";

export interface User {
    name: string;
    publicKey: string;
    balance: {
        gold: Gold;
        emoji: Set<Emoji>;
    };
}
