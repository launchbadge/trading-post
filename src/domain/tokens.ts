import BigNumber from "bignumber.js";

// @ts-ignore
import emojis from "emojis-list";

export type Emoji = number;

export const AllEmoji: string[] = emojis;

export type Gold = BigNumber;

export function hasSubset(superset: Set<Emoji>, subset: Set<Emoji>): boolean {
    for (const item of subset) {
        if (!superset.has(item)) {
            return false;
        }
    }

    return true;
}