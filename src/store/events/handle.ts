import { Event } from "../../domain/event";
import * as announce from "./announce";
import * as tradeRequest from "./trade-request";
import * as tradeAccept from "./trade-accept";

export function handle(event: Event): void {
    console.log(event);

    switch (event.type) {
        case "Announce":
            announce.handle(event);
            break;

        case "TradeRequest":
            tradeRequest.handle(event);
            break;

        case "TradeAccept":
            tradeAccept.handle(event);
            break;
    }
}
