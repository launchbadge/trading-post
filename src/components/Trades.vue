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

interface Props {
    user: User;
}

export default Vue.defineComponent({
    setup(props: Props) {
        const router = useRouter();

        return () => {
            const trades = Array.from(state.network.trades.values());

            if (trades.length === 0) {
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
                        trades.filter((trade) => trade.isAccepted).map((trade) => (
                            <TradeRow
                                key={ trade.id }
                                trade={ trade }
                                onPressView={() => {
                                    router.push({ name: "Trade", params: { id: trade.id.toString() } });
                                }}
                            />
                        ))
                    }
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
</style>
