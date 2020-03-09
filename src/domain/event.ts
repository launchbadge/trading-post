import { Emoji, Gold } from "./tokens";

export type Event = AnnounceEvent | TradeRequestEvent | TradeAcceptEvent;

export enum EventType {
    Announce = "Announce",
    TradeRequest = "Trade Request",
    TradeAccept = "Trade Accept"
}

export interface AnnounceEvent {
    id: number;
    timestamp: Date;
    type: EventType.Announce;
    payload: {
        publicKey: string;
    };
}

export interface TradeRequestEvent {
    id: number;
    timestamp: Date;
    type: EventType.TradeRequest;
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
    type: EventType.TradeAccept;
    payload: {
        tradeId: number;
    };
}
