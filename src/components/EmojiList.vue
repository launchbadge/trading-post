<script lang="tsx">
import * as Vue from "vue";
import { AllEmoji, Emoji } from "../domain/tokens";
import Icon from "./Icon.vue";
import { mdiDotsHorizontal } from "@mdi/js";

interface Props {
    emoji: Set<Emoji>;
}

export default Vue.defineComponent({
    name: "EmojiList",
    setup(props: Props) {
        return () => (
            <div class="EmojiList">
                {
                    Array.from(props.emoji).map((i) => (
                        <div class="EmojiList-emoji">{ AllEmoji[i] }</div>
                    ))
                }
            </div>
        );
    }
});
</script>

<style>
.EmojiList {
    display: flex;
    flex-wrap: wrap;
}

.EmojiList-emoji {
    font-size: 20px;
    margin-inline: 6px;
    font-family: 'NotoColorEmoji';
}
</style>
