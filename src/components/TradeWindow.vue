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
            let emojiList;
            if (props.readonly) {
                emojiList = Array.from(props.emoji).map((i) => (
                    <span class="TradeWindow-emoji">{ AllEmoji[i] }</span>
                ));
            } else {
                emojiList = Array.from(props.user.balance.emoji!).map((i) => (
                    <span
                        class={["TradeWindow-emoji", { "is-selected": props.emoji.has(i) }]}
                        onClick={() => handleToggleEmoji(i)}
                    >
                        { AllEmoji[i] }
                    </span>
                ));
            }

            return (
                <div class="TradeWindow">
                    <div class="TradeWindow-user">
                        <UserVue user={ props.user }/>
                        { props.readonly ? null : <GoldAmount amount={ props.user.balance.gold.toFormat() } /> }
                    </div>
                    {
                        props.readonly && props.gold.eq(0) ? 
                            null :
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
                    }
                    { emojiList.length > 0 ? <div class="TradeWindow-main">{ emojiList }</div> : null }
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
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
}

.TradeWindow-main {
    background-color: var(--colorBlackGrey);
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    border-radius: 4px;
}

.TradeWindow-emoji {
    padding: 10px 14px;
    margin: 6px;
    user-select: none;
    box-sizing: border-box;
    font-size: 25px;
    font-family: 'NotoColorEmoji';

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
    border-radius: 4px;
}

.TradeWindow-goldInput {
    outline: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-color: transparent;
    flex-grow: 1;
    padding: 15px 12px;
    font-size: inherit;
    font-family: inherit;
    background: transparent;
    color: var(--colorWhite);
    margin-bottom: 0;

    &:focus {
        border-color: var(--colorSpandexGreen);
    }
}

.TradeWindow-goldIconContainer {
    background-color: color-mod(var(--colorSpandexGreen) alpha(10%));
    display: flex;
    padding-inline: 8px;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.TradeWindow-goldIcon {
    height: 32px;
    fill: var(--colorSpandexGreen);
}
</style>
