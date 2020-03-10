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
import { validateTrade } from "../service/trade";

interface Props {
    user: User;
}

export default Vue.defineComponent({
    setup(props: Props) {
        const router = useRouter();

        const isCheckingTime = Vue.ref(true);
        const timeoutId = Vue.ref<number | null>(null);

        function refreshValidity() {
            if (!isCheckingTime.value) {
                return;
            } else {
                state.network.openTrades.forEach((trade) => validateTrade(state.network.trades.get(trade)!));
                timeoutId.value = window.setTimeout(refreshValidity, 1000);
            }   
        }

        Vue.onMounted(() => {
            refreshValidity();
        });

        Vue.onBeforeUnmount(() => {
            isCheckingTime.value = false;
        });

        return () => {
            const openTrades = state.network.openTrades;

            if (openTrades.length === 0) {
                return (
                    <div class="OpenTrades">
                        <div class="OpenTrades-empty">
                            No open trades
                        </div>
                    </div>
                );
            }

            return (
                <div class="OpenTrades">
                    {
                        openTrades.map((i) => (
                            <TradeRow
                                key={i} trade={ state.network.trades.get(i)! }
                                onPressView={() => {
                                    router.push({ name: "Trade", params: { id: i.toString() } });
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
.OpenTrades {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 10px;
}

.OpenTrades-empty {
    color: white;
    opacity: 0.5;
    font-style: italic;
}
</style>
