import { Emoji, Gold } from "./tokens";

export type Event = AnnounceEvent | TradeRequestEvent | TradeAcceptEvent;

export enum EventType {
    Announce = "Announce",
    TradeRequest = "Trade Request",
    TradeAccept = "Trade Accept"
}

export interface Message {
    type: EventType;
    payload: object;
    signature?: string;
}

export interface AnnounceEvent {
    id: number;
    timestamp: Date;
    type: EventType.Announce;
    payload: {
        publicKey: string;
        name: string;
    };
    signature: string;
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
    signature: string;
}

export interface TradeAcceptEvent {
    id: number;
    timestamp: Date;
    type: EventType.TradeAccept;
    payload: {
        tradeId: number;
    };
    signature: string;
}
