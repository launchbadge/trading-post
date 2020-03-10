<script lang="tsx">
import * as Vue from "vue";
import state from "../store/state";
import Icon from "../components/Icon.vue";
import { mdiCoinOutline } from "@mdi/js";
import { useRoute } from "vue-router";
import { getUser } from "../store/user";
import Avatar from "../components/Avatar.vue";
import { AllEmoji, Emoji, Gold } from "../domain/tokens";
import { User } from "../domain/user";
import BigNumber from "bignumber.js";
import UserVue from "./User.vue";
import GoldAmount from "./GoldAmount.vue";

interface Props {
    user: User;
    emoji: Set<Emoji>;
    gold: Gold;
    readonly: boolean;

    onChangeGold: (gold: BigNumber) => void;

    onAddEmoji: (emoji: Emoji) => void;
    onRemoveEmoji: (emoji: Emoji) => void;
}

export default Vue.defineComponent({
    name: "TradeWindow",
    setup(props: Props) {
        function handleChangeGold(event: Event) {
            if (props.readonly) {
                event.preventDefault();
                return;
            }

            props.onChangeGold(new BigNumber((event.target as HTMLInputElement).value));
        }

        function handleToggleEmoji(emoji: number) {
            if (props.readonly) return;

            if (props.emoji.has(emoji)) {
                props.onRemoveEmoji(emoji);
            } else {
                props.onAddEmoji(emoji);
            }
        }

        return () => {
            return (
                <div class="TradeWindow">
                    <div class="TradeWindow-user">
                        <UserVue user={ props.user }/>
                        <GoldAmount amount={ props.user.balance.gold.toFormat() } />
                    </div>
                    <div class="TradeWindow-gold">
                        <input
                            readonly={props.readonly}
                            class="TradeWindow-goldInput"
                            type="text"
                            value={props.gold.toString()}
                            onChange={ handleChangeGold }
                        />
                        <div class="TradeWindow-goldIconContainer">
                            <Icon class="TradeWindow-goldIcon" d={ mdiCoinOutline } />
                        </div>
                    </div>
                    <div class="TradeWindow-main">
                        {
                            Array.from(props.user.balance.emoji!).map((i) => (
                                <span
                                    class={["TradeWindow-emoji", { "is-selected": props.emoji.has(i) }]}
                                    onClick={() => handleToggleEmoji(i)}
                                >
                                    { AllEmoji[i] }
                                </span>
                            ))
                        }
                    </div>
                </div>
            );
        };
    }
});
</script>

<style>
.TradeWindow {
    display: grid;
    grid-row-gap: 10px;
    grid-template-rows: repeat(3, min-content);
}

.TradeWindow-user {
    background-color: var(--colorBlackGrey);
    padding: 16px;
    display: flex;
    justify-content: space-between;
}

.TradeWindow-main {
    background-color: var(--colorBlackGrey);
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
}

.TradeWindow-emoji {
    padding: 10px 14px;
    margin: 6px;
    user-select: none;
    box-sizing: border-box;
    font-size: 25px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    &.is-selected {
        box-shadow: 0 0 0 2px color-mod(var(--colorSpandexGreen) alpha(20%)) inset;
        background: color-mod(var(--colorSpandexGreen) alpha(10%));
    }
}

.TradeWindow-gold {
    background-color: var(--colorBlackGrey);
    display: flex;
}

.TradeWindow-goldInput {
    outline: none;
    border: none;
    flex-grow: 1;
    margin-block: 8px;
    margin-inline: 4px;
    padding: 6px 8px;
    font-size: inherit;
    font-family: inherit;
    background: transparent;
    color: var(--colorWhite);
}

.TradeWindow-goldIconContainer {
    background-color: color-mod(var(--colorSpandexGreen) alpha(10%));
    display: flex;
    padding-inline: 8px;
    justify-content: center;
    align-items: center;
}

.TradeWindow-goldIcon {
    height: 32px;
    fill: var(--colorSpandexGreen);
}
</style>
