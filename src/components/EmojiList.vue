a<script lang="tsx">
import * as Vue from "vue";
import { AllEmoji, Emoji } from "../domain/tokens";

interface Props {
    emoji: Set<Emoji>;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="EmojiList">
                {
                    Array.from(props.emoji).map((i) => (
                        <span class="EmojiList-emoji">{ AllEmoji[i] }</span>
                    ))
                }
            </div>
        );
    }
});
</script>

<style>
.EmojiList-emoji {
    margin-inline: 6px;
}
</style>
