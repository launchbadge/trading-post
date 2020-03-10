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
import BigNumber from "bignumber.js";
import * as tradeRequest from "../store/events/trade-request";

export default Vue.defineComponent({
    name: "NewTradeFor",
    setup() {
        const route = useRoute();
        const router = useRouter();

        const { user: userKey } = route.value.params;

        const requestor = Vue.reactive({
            gold: new BigNumber(0),
            emoji: new Set<Emoji>(),
        });

        const requestee = Vue.reactive({
            gold: new BigNumber(0),
            emoji: new Set<Emoji>(),
        });

        const submitting = Vue.ref(false);

        async function handleSubmit() {
            submitting.value = true;

            await tradeRequest.publish({
                requesteePublicKey: userKey!.toString(),
                requesteeEmoji: requestee.emoji,
                requesteeGold: requestee.gold as Gold,
                requestorPublicKey: getCurrentUser()!.publicKey,
                requestorEmoji: requestor.emoji,
                requestorGold: requestor.gold as Gold,
            });

            await router.push({ name: "Home" });
        }

        return () => {
            const user = getUser(userKey.toString());
            if (user == null) {
                // No point in continuing if someone refreshed the page
                return null;
            }

            const submitButtonDisabled = !(
                (requestor.gold.isGreaterThan(new BigNumber(0)) ||
                requestor.emoji.size > 0) &&
                (requestee.gold.isGreaterThan(new BigNumber(0)) ||
                requestee.emoji.size > 0)
            );

            return (
                <div class="NewTradeFor">
                    <div class="NewTradeFor-header">
                        <div class="NewTradeFor-headerTitle">
                            <div class="NewTradeFor-title">
                                New Trade
                            </div>
                            <div class="NewTradeFor-subTitle">
                                Select emoji and/or enter an amount of gold to trade
                            </div>
                        </div>
                        <Button onClick={handleSubmit} busy={submitting.value} disabled={submitButtonDisabled}>
                            Trade
                        </Button>
                    </div>
                    <div class="NewTradeFor-main">
                        <TradeWindow
                            user={ getCurrentUser()! }
                            gold={ requestor.gold as Gold }
                            emoji={ requestor.emoji }
                            onChangeGold={(gold) => {
                                if (!submitting.value) requestor.gold = gold;
                            }}
                            onAddEmoji={(emoji) => {
                                if (!submitting.value) requestor.emoji.add(emoji);
                            }}
                            onRemoveEmoji={(emoji) => {
                                if (!submitting.value) requestor.emoji.delete(emoji);
                            }}
                            readonly={false}
                        />
                        <Icon class="NewTradeFor-swapIcon" d={ mdiSwapHorizontalVariant } />
                        <TradeWindow
                            user={ user }
                            gold={ requestee.gold as Gold }
                            emoji={ requestee.emoji }
                            onChangeGold={(gold) => {
                                if (!submitting.value) requestee.gold = gold;
                            }}
                            onAddEmoji={(emoji) => {
                                if (!submitting.value) requestee.emoji.add(emoji);
                            }}
                            onRemoveEmoji={(emoji) => {
                                if (!submitting.value) requestee.emoji.delete(emoji);
                            }}
                            readonly={false}
                        />
                    </div>
                </div>
            );
        };
    }
});
</script>

<style>
.NewTradeFor {
    padding: 20px;
    color: var(--colorWhite);
}

.NewTradeFor-header {
    display: flex;
    margin-block-end: 20px;
    padding-block-end: 10px;
    align-items: center;
}

.NewTradeFor-headerTitle {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: column;
    margin-inline-end: 20px;
}

.NewTradeFor-main {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 1fr auto 1fr;
}

.NewTradeFor-subTitle {
    opacity: 0.6;
    margin-block-start: 5px;
}

.NewTradeFor-swapIcon {
    fill: var(--colorWhite);
    height: 40px;
    margin-top: 15px;
    opacity: 0.5;
    justify-self: center;
    align-self: center;
}
</style>
