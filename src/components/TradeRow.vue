<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline, mdiSwapHorizontalVariant, mdiTimelapse } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import Avatar from "./Avatar.vue";
import Button from "./Button.vue";
import { AllEmoji } from "../domain/tokens";
import EmojiList from "./EmojiList.vue";
import { Trade, TRADE_DURATION } from "../domain/trade";
import StatusIcon, { AcceptStatus } from "./StatusIcon.vue";
import { computed } from "vue";

interface Props {
    trade: Trade;
    onPressView: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        const acceptStatus = computed(() => props.trade.isAccepted ? AcceptStatus.accepted : Date.now() > (props.trade.validStartAt.valueOf() + TRADE_DURATION) ? AcceptStatus.rejected : AcceptStatus.pending );

        return () => (
            <div class="TradeRow">
                <Avatar publicKey={ props.trade.requestor.publicKey } />
                <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requestorEmoji } />
                <div class="TradeRow-goldSwap">
                    <div class="TradeRow-gold">
                        <span class="TradeRow-goldAmount">{ props.trade.requestorGold.toFixed() }</span>
                        <Icon class="TradeRow-goldIcon" d={ mdiCoinOutline } />
                    </div>
                    <Icon class="TradeRow-swapIcon" d={ mdiSwapHorizontalVariant } />
                    <div class="TradeRow-goldMirror">
                        <Icon class="TradeRow-goldIconMirror" d={ mdiCoinOutline } />
                        <span>{ props.trade.requesteeGold.toFixed() }</span>
                    </div>
                </div>
                <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requesteeEmoji } />
                <Avatar publicKey={ props.trade.requestee.publicKey } />
                <StatusIcon accepted={ acceptStatus.value } />
                <Button disabled={false} busy={false} onClick={props.onPressView} class="TradeRow-viewButton">View</Button>
            </div>
        );
    }
});
</script>

<style>
.TradeRow {
    background-color: var(--colorBlackGrey);
    color: var(--colorWhite);
    padding: 16px;
    border-radius: 2px;
    display: inline-grid;
    grid-template-columns: 1fr 5fr 230px 5fr 1fr 2fr;
    align-items: center;
}

.TradeRow-emojiList {
    margin-inline: 16px;
}

.TradeRow-goldSwap {
    display: inline-grid;
    grid-template-columns: 2fr 1fr 2fr;
    justify-content: center;
}

.TradeRow-swapIcon {
    height: 32px;
    fill: var(--colorWhite);
    margin-inline: 20px;
    opacity: 0.7;
    justify-self: center;
}

.TradeRow-gold {
    display: flex;
    align-items: center;
    justify-self: right;
}

.TradeRow-goldIcon {
    fill: var(--colorSpandexGreen);
    height: 24px;
}

.TradeRow-goldAmount {
    margin-inline-end: 8px;
}

.TradeRow-goldMirror {
    display: flex;
    align-items: center;
}

.TradeRow-goldIconMirror {
    fill: var(--colorSpandexGreen);
    height: 24px;
    margin-inline-end: 8px;
}

</style>
