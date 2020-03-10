import { Event, EventType } from "../../domain/event";
import * as announce from "./announce";
import * as tradeRequest from "./trade-request";
import * as tradeAccept from "./trade-accept";

export function handle(event: Event): void {
    if (event.signature == null) {
        console.log("Ignoring: ", event);
        return;
    }
    
    console.log("Handle: ", event);

    switch (event.type) {
        case EventType.Announce:
            announce.handle(event);
            break;

        case EventType.TradeRequest:
            tradeRequest.handle(event);
            break;

        case EventType.TradeAccept:
            tradeAccept.handle(event);
            break;
    }
}
