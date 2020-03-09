<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import EmojiList from "./EmojiList.vue";
import { AllEmoji } from "../domain/tokens";
import Avatar from "./Avatar.vue";

interface Props {
    user: User;
    onPressTrade: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="Holder">
                <Avatar publicKey={ props.user.publicKey } />
                <div class="Holder-info">
                    <div class="Holder-name">
                        { props.user.name }
                    </div>
                    <div class="Holder-publicKey">
                        { props.user.publicKey.slice("302a300506032b6570032100".length) }
                    </div>
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">
                        <EmojiList emoji={ props.user.balance.emoji } />
                    </span>
                    <Icon class="Holder-balanceIcon" d={ mdiEmoticonOutline } />
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">{ props.user.balance.gold.toFormat() }</span>
                    <Icon class="Holder-balanceIcon" d={ mdiCoinOutline } />
                </div>
                <button class="Holder-newTrade" onClick={ props.onPressTrade } >
                    Trade
                </button>
            </div>
        );
    }
});
</script>

<style>
.Holder {
    background-color: var(--colorBlackGrey);
    color: var(--colorWhite);
    padding: 16px;
    border-radius: 2px;
    display: flex;
    align-items: center;
}

.Holder .EmojiList-emoji {
    margin-inline-start: 12px;
}

.Holder-publicKey {
    opacity: 0.5;
    font-size: 14px;
    margin-block-start: 6px;
    font-family: "JetBrains Mono", monospace;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Holder-info {
    margin-inline-start: 20px;
    flex-grow: 1;
}

.Holder-balanceIcon {
    fill: var(--colorSpandexGreen);
    height: 24px;
}

.Holder-balance {
    display: flex;
    margin-right: 20px;
    align-items: center;
}

.Holder-balanceAmount {
    margin-inline-end: 8px;
}

.Holder-newTrade {
    padding-block: 8px;
    user-select: none;
    cursor: pointer;
    padding-inline: 14px;
    margin-inline-end: 4px;
    color: var(--colorWhite);
    display: flex;
    align-items: center;
    background-color: var(--colorBeer);
    border-radius: 2px;
    font-size: inherit;
    border: none;
}
</style>
