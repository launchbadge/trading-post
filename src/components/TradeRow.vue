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
import GoldAmount from "./GoldAmount.vue";

interface Props {
    trade: Trade;
    onPressView: () => void;
}

export default Vue.defineComponent({
    name: "TradeRow",
    setup(props: Props) {
        const acceptStatus = computed(() => props.trade.isAccepted ? AcceptStatus.accepted : (props.trade.isValid ? AcceptStatus.pending : AcceptStatus.rejected));

        return () => (
            <div class="TradeRow">
                <Avatar publicKey={ props.trade.requestor.publicKey } />
                <div class="TradeRow-requestor">
                    <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requestorEmoji } />
                    {!props.trade.requestorGold.eq(0) ? <GoldAmount amount={ props.trade.requestorGold.toFormat() } /> : null}
                </div>
                <Icon class="TradeRow-swapIcon" d={ mdiSwapHorizontalVariant } />
                <div class="TradeRow-requestee">
                    {!props.trade.requesteeGold.eq(0) ? <GoldAmount amount={ props.trade.requesteeGold.toFormat() } reverse={true}/> : null}
                    <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requesteeEmoji } />
                </div>
                <Avatar publicKey={ props.trade.requestee.publicKey } />
                <StatusIcon class="TradeRow-accepted" accepted={ acceptStatus.value } />
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
    grid-template-columns: auto 1fr min-content 1fr auto auto auto;
    align-items: center;
}

.TradeRow-emojiList {
    margin-inline: 16px;
}

.TradeRow-requestor {
    display: grid;
    grid-template-columns: 1fr auto;
}

.TradeRow-requestee {
    display: inline-grid;
    grid-template-columns: auto 1fr;

    & .TradeRow-emojiList {
        grid-column: 2;
        justify-content: flex-end;
    }
}

.TradeRow-swapIcon {
    height: 32px;
    fill: var(--colorWhite);
    margin-inline: 10px;
    opacity: 0.7;
    justify-self: center;
}

.TradeRow-accepted {
    justify-self: center;
}
</style>
