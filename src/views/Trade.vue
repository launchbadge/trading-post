<script lang="tsx">
import * as Vue from "vue";
import User from "../components/UserRow.vue";
import state from "../store/state";
import Icon from "../components/Icon.vue";
import { mdiCoinOutline, mdiSwapHorizontalVariant } from "@mdi/js";
import { useRoute, useRouter } from "vue-router";
import { getUser, getCurrentUser } from "../store/user";
import TradeWindow from "../components/TradeWindow.vue";
import Button from "../components/Button.vue";
import { AllEmoji, Emoji, Gold } from "../domain/tokens";
import * as tradeAccept from "../store/events/trade-accept";
import { Trade } from "../domain/trade";

export default Vue.defineComponent({
    name: "Trade",
    setup() {
        const route = useRoute();
        const router = useRouter();

        const { id: tradeId } = route.value.params;

        const formBusy = Vue.ref(false);

        async function handleSubmit() {
            formBusy.value = true;

            await tradeAccept.publish(Number(tradeId));
            await router.push({ name: "Home" });
        }

        return () => {
            const trade: Trade | null = state.network.trades.get(Number(tradeId));
            if (trade == null) {
                // No point in continuing if someone refreshed the page
                return null;
            }

            let header;

            if (!trade.isAccepted) {
                header = (
                    <div class="Trade-header">
                        <div class="Trade-headerTitle">
                            <div class="Trade-title">
                                Open Trade
                            </div>
                            <div class="Trade-subTitle">
                                Accept the trade or go back
                            </div>
                        </div>
                        <Button onClick={ handleSubmit } busy={ formBusy.value }>
                            Accept
                        </Button>
                    </div>
                );
            }

            return (
                <div class="Trade">
                    { header }
                    <div class="Trade-main">
                        <TradeWindow
                            readonly
                            user={ trade.requestor }
                            gold={ trade.requestorGold }
                            emoji={ trade.requestorEmoji }
                        />
                        <Icon class="Trade-swapIcon" d={ mdiSwapHorizontalVariant } />
                        <TradeWindow
                            readonly
                            user={ trade.requestee }
                            gold={ trade.requesteeGold }
                            emoji={ trade.requesteeEmoji }
                        />
                    </div>
                </div>
            );
        };
    }
});
</script>

<style>
.Trade {
    padding: 20px;
    color: var(--colorWhite);
}

.Trade-header {
    display: flex;
    margin-block-end: 20px;
    padding-block-end: 10px;
    align-items: center;
}

.Trade-headerTitle {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: column;
    margin-inline-end: 20px;
}

.Trade-main {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: repeat(3, auto);
}

.Trade-subTitle {
    opacity: 0.6;
    margin-block-start: 5px;
}

.Trade-swapIcon {
    fill: var(--colorWhite);
    height: 40px;
    margin-top: 15px;
    opacity: 0.5;
    justify-self: center;
}
</style>
