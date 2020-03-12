<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import Avatar from "./Avatar.vue";
import { AllEmoji } from "../domain/tokens";
import state from "../store/state";
import TradeRow from "./TradeRow.vue";
import { useRouter } from "vue-router";
import Button from "./Button.vue";

interface Props {
    user: User;
}

export default Vue.defineComponent({
    name: "Trades",
    setup(props: Props) {
        const router = useRouter();

        const trades = Vue.computed(() => {
            return Array.from(
                state.network.trades.values()
            ).filter(
                (trade) => !state.network.openTrades.includes(trade.id)
            ).reverse().slice(0, 10);
        });

        function handleClick() {
            void router.push({ name: "AllTrades" });
        }

        return () => {
            if (trades.value.length === 0) {
                return (
                    <div class="Trades">
                        <div class="Trades-empty">
                            No trades
                        </div>
                    </div>
                );
            }

            return (
                <div class="Trades">
                    {
                        trades.value.map((trade) => (
                            <TradeRow
                                key={ trade.id }
                                trade={ trade }
                                onPressView={() => {
                                    router.push({ name: "Trade", params: { id: trade.id.toString() } });
                                }}
                            />
                        ))
                    }
                    <Button class="Trades-allTrades" onClick={ handleClick }>All Trades</Button>
                </div>
            );
        };
    }
});
</script>

<style>
.Trades {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 10px;
}

.Trades-empty {
    color: white;
    opacity: 0.5;
    font-style: italic;
}

.Trades-allTrades {
    justify-self: end;
    margin: 10px 0;
}
</style>
