import { Trade } from "../domain/trade";
import state from "./state";

export function getTrade(id: number): Trade | null {
    return state.network.trades.get(id) ?? null;
}