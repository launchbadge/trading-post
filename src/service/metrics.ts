import { User } from "../domain/user";
import { Emoji } from "../domain/tokens";
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
export function userWithMostEmoji(): UserMetric | null {
    const users = Array.from(state.network.users.values());

    if (users.length < 1) return null;

    const user = users.reduce((previous, current) => previous.balance.emoji.size > current.balance.emoji.size ? previous : current)
    return { value: user, count: user.balance.emoji.size }
}

// User with the largest gold balance
export function userWithMostGold(): UserMetric | null {
    const users = Array.from(state.network.users.values());

    if (users.length < 1) return null;

    const user = users.reduce((previous, current) => previous.balance.gold.isGreaterThan(current.balance.gold) ? previous : current)
    return { value: user, count: user.balance.gold.toNumber() }
}

// Emoji that has been requested the most times
export function mostRequestedEmoji(): EmojiMetric | null {
    const trades = Array.from(state.network.trades.values());
    const requestedEmojis = new Map<Emoji, number>();
    
    if (trades.length > 0) {
        for (const trade of trades) {
            Array.from(trade.requesteeEmoji)
                .map((emoji: Emoji) => requestedEmojis.set(emoji, (requestedEmojis.get(emoji) ?? 0) + 1));
        }

        const emoji = Array.from(requestedEmojis.entries())
            .reduce((previous, current) => previous[1] > current[1] ? previous : current);

        return { value: emoji[0], count: emoji[1] }
    }

    return null;
}

// Emoji that has been requested and accepted on either side of a trade the most times
export function mostAcceptedEmoji(): EmojiMetric | null{
    const trades = Array.from(state.network.trades.values());
    const acceptedTrades = trades.filter((trade) => trade.isAccepted);
    const requestedEmojis = new Map<Emoji, number>();

    if (trades.length > 0) {
        for (const trade of acceptedTrades) {
            const requestorEmoji = Array.from(trade.requestorEmoji);
            const requesteeEmoji = Array.from(trade.requesteeEmoji);
            const emojis = requestorEmoji.concat(requesteeEmoji);
            emojis.map((emoji: Emoji) => requestedEmojis.set(emoji, (requestedEmojis.get(emoji) ?? 0) + 1));
        }

        const emoji = Array.from(requestedEmojis.entries())
            .reduce((previous, current) => previous[1] > current[1] ? previous : current);

        return { value: emoji[0], count: emoji[1] }
    }
    
    return null;
}
