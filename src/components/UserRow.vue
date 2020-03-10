<script lang="tsx">
import * as Vue from "vue";
import { mdiEmoticonOutline } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import EmojiList from "./EmojiList.vue";
import { AllEmoji } from "../domain/tokens";
import Avatar from "./Avatar.vue";
import UserVue from "./User.vue";
import GoldAmount from "./GoldAmount.vue";

interface Props {
    user: User;
    onPressTrade: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="Holder">
                <div class="Holder-info">
                    <UserVue user={ props.user } />
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">
                        <EmojiList emoji={ props.user.balance.emoji } />
                    </span>
                    <Icon class="Holder-balanceIcon" d={ mdiEmoticonOutline } />
                </div>
                <GoldAmount amount={ props.user.balance.gold.toFormat() } />
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

.Holder-info {
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
    margin-inline-start: 20px;
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
