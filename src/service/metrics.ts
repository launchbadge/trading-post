import { User } from "../domain/user";
import { Emoji } from "../domain/tokens"; 
import { Trade } from "../domain/trade";
import state from "../store/state";

export type Metric = UserMetric | EmojiMetric;

export interface UserMetric {
    value: User;
    count: number;
}

export interface EmojiMetric {
    value: Emoji;
    count: number;
}

// User with the largest number of Emojis
export function userWithMostEmoji(): Metric {
    const users: User[] = Array.from(state.network.users.values());
    const user = users.reduce((previous, current) => previous.balance.emoji.size > current.balance.emoji.size ? previous : current)
    return { value: user, count: user.balance.emoji.size }
}

// User with the largest gold balance
export function userWithMostGold(): Metric {
    const users: User[] = Array.from(state.network.users.values());
    const user = users.reduce((previous, current) => previous.balance.gold.isGreaterThan(current.balance.gold) ? previous : current)
    return { value: user, count: user.balance.gold.toNumber() }
}

// Emoji that has been requested on either side of a trade the most times
export function mostRequestedEmoji(): Metric {
    const trades: Trade[] = Array.from(state.network.trades.values()) as Trade[];
    const requestedEmojis: { [key: number]: number } = {};
    for (const trade of trades) {
        const requestorEmoji = Array.from(trade.requestorEmoji);
        const requesteeEmoji = Array.from(trade.requesteeEmoji);
        const emojis = requestorEmoji.concat(requesteeEmoji);
        emojis.map((emoji: Emoji) => requestedEmojis[emoji] = requestedEmojis[emoji] ? requestedEmojis[emoji] + 1 : 1);
    }
    const emoji = Object.keys(requestedEmojis).map(Number).reduce((previous, current) => requestedEmojis[previous] > requestedEmojis[current] ? previous : current);
    return { value: emoji, count: requestedEmojis[emoji] }
}

// Emoji that has been requested and accepted on either side of a trade the most times
export function mostAcceptedEmoji(): Metric {
    const trades: Trade[] = Array.from(state.network.trades.values()) as Trade[];
    const acceptedTrades: Trade[] = trades.filter((trade) => trade.isAccepted);
    const requestedEmojis: { [key: number]: number } = {};
    for (const trade of acceptedTrades) {
        const requestorEmoji = Array.from(trade.requestorEmoji);
        const requesteeEmoji = Array.from(trade.requesteeEmoji);
        const emojis = requestorEmoji.concat(requesteeEmoji);
        emojis.map((emoji: Emoji) => requestedEmojis[emoji] = requestedEmojis[emoji] ? requestedEmojis[emoji] + 1 : 1);
    }
    const emoji = Object.keys(requestedEmojis).map(Number).reduce((previous, current) => requestedEmojis[previous] > requestedEmojis[current] ? previous : current);
    return { value: emoji, count: requestedEmojis[emoji] }
}