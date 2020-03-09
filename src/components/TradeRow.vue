<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline, mdiSwapHorizontalVariant } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import Avatar from "./Avatar.vue";
import Button from "./Button.vue";
import { AllEmoji } from "../domain/tokens";
import EmojiList from "./EmojiList.vue";
import { Trade } from "../domain/trade";

interface Props {
    trade: Trade;
    onPressView: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="TradeRow">
                <Avatar publicKey={ props.trade.requestor.publicKey } />
                <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requestorEmoji } />
                <Icon class="TradeRow-swapIcon" d={ mdiSwapHorizontalVariant } />
                <EmojiList class="TradeRow-emojiList" emoji={ props.trade.requesteeEmoji } />
                <Avatar publicKey={ props.trade.requestee.publicKey } />
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
    display: flex;
    align-items: center;
}

.TradeRow-emojiList {
    margin-inline: 16px;
}

.TradeRow-viewButton {
    margin-inline-start: 20px;
}

.TradeRow-swapIcon {
    height: 32px;
    fill: var(--colorWhite);
    margin-inline: 20px;
    flex-grow: 1;
    opacity: 0.7;
}
</style>
