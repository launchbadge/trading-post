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
                    <EmojiList class="Holder-balanceEmoji" emoji={ props.user.balance.emoji } />
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

.Holder-balanceIcon {
    fill: var(--colorSpandexGreen);
    height: 24px;
    margin-inline-start: 8px;
}

.Holder-balance {
    display: flex;
    margin-right: 20px;
    align-items: center;
    justify-content: end;
    flex-grow: 1;
}

.Holder-balanceEmoji {
    justify-content: end;
    align-items: center;
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
