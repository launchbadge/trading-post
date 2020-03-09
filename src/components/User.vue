<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Icon from "./Icon.vue";
import { User } from "../domain/user";
import { AllEmoji } from "../domain/tokens";

interface Props {
    user: User;
    onTrade: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="Holder">
                <div class="Holder-avatar" />
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
                        {
                            Array.from(props.user.balance.emoji).map((i) => (
                                <span class="Holder-emoji">{ AllEmoji[i] }</span>
                            ))
                        }
                    </span>
                    <Icon class="Holder-balanceIcon" d={ mdiEmoticonOutline } />
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">{ props.user.balance.gold.toFormat() }</span>
                    <Icon class="Holder-balanceIcon" d={ mdiCoinOutline } />
                </div>
                <button class="Holder-newTrade" onClick={props.onTrade} >
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

.Holder-emoji {
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

.Holder-avatar {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
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
