import { Emoji, Gold } from "./tokens";
import { User } from "./user";

// Seconds
export const TRADE_DURATION: number = 60;

export interface Trade {
    // The sequence number on the network
    id: number;

    // states of a trade are PENDING, ACCEPTED, and EXPIRED
    isAccepted: boolean;

    requestor: User;
    requestorGold: Gold;
    requestorEmoji: Set<Emoji>;

    requestee: User;
    requesteeGold: Gold;
    requesteeEmoji: Set<Emoji>;

    // Time that this trade is valid to act on
    // DURATION number of seconds after this, it is invalid
    validStartAt: Date;
}
