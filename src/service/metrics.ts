import { User } from "../domain/user";
import { Emoji } from "../domain/tokens"; 
import { Trade } from "../domain/trade";
import state from "../store/state";

// User with the largest number of Emojis
export function userWithMostEmoji(): User {
    const users: User[] = Array.from(state.network.users.values());
    return users.reduce((previous, current) => previous.balance.emoji.size > current.balance.emoji.size ? previous : current)
}

// User with the largest gold balance
export function userWithMostGold(): User {
    const users: User[] = Array.from(state.network.users.values());
    return users.reduce((previous, current) => previous.balance.gold > current.balance.gold ? previous : current)
}

// Emoji that has been requested on either side of a trade the most times
export function mostRequestedEmoji(): Emoji {
    const trades: Trade[] = Array.from(state.network.trades.values()) as Trade[];
    const requestedEmojis: { [key: number]: number } = {};
    for (const trade of trades) {
        const requestorEmoji = Array.from(trade.requestorEmoji);
        const requesteeEmoji = Array.from(trade.requesteeEmoji);
        const emojis = requestorEmoji.concat(requesteeEmoji);
        emojis.map((emoji: Emoji) => requestedEmojis[emoji] = requestedEmojis[emoji] ? requestedEmojis[emoji] + 1 : 1);
    }
    return Object.keys(requestedEmojis).map(Number).reduce((previous, current) => requestedEmojis[previous] > requestedEmojis[current] ? previous : current);
}

// Emoji that has been requested and accepted on either side of a trade the most times
export function mostAcceptedEmoji(): Emoji {
    const trades: Trade[] = Array.from(state.network.trades.values()) as Trade[];
    const acceptedTrades: Trade[] = trades.filter((trade) => trade.isAccepted);
    const requestedEmojis: { [key: number]: number } = {};
    for (const trade of acceptedTrades) {
        const requestorEmoji = Array.from(trade.requestorEmoji);
        const requesteeEmoji = Array.from(trade.requesteeEmoji);
        const emojis = requestorEmoji.concat(requesteeEmoji);
        emojis.map((emoji: Emoji) => requestedEmojis[emoji] = requestedEmojis[emoji] ? requestedEmojis[emoji] + 1 : 1);
    }
    return Object.keys(requestedEmojis).map(Number).reduce((previous, current) => requestedEmojis[previous] > requestedEmojis[current] ? previous : current);
}