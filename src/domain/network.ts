import { Emoji } from "./tokens";
import { User } from "./user";
import { Trade } from "./trade";

export interface Network {
    // The remaining Emoji that are available for distribution
    availableEmoji: Set<Emoji>;
    users: Map<string, User>;
    trades: Trade[];
}
