import { Emoji, Gold } from "./tokens";

export type Event = AnnounceEvent | TradeRequestEvent | TradeAcceptEvent;

export interface AnnounceEvent {
    id: number;
    timestamp: Date;
    type: "Announce";
    payload: {
        publicKey: string;
    };
}

export interface TradeRequestEvent {
    id: number;
    timestamp: Date;
    type: "TradeRequest";
    payload: {
        requestorPublicKey: string;
        requesteePublicKey: string;
        requestorGold: Gold;
        requestorEmoji: Set<Emoji>;
        requesteeGold: Gold;
        requesteeEmoji: Set<Emoji>;
    };
}

export interface TradeAcceptEvent {
    id: number;
    timestamp: Date;
    type: "TradeAccept";
    payload: {
        tradeId: number;
    };
}
