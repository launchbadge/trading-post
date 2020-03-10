<script lang="tsx">
import * as Vue from "vue";
import { AllEmoji, Emoji } from "../domain/tokens";
import Icon from "./Icon.vue";
import { mdiDotsHorizontal } from "@mdi/js";

interface Props {
    emoji: Set<Emoji>;
    limit?: number; 
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => {
            const limit = props.limit ?? 10;

            return (
                <div class="EmojiList">
                    {
                        Array.from(props.emoji).slice(0, limit).map((i) => (
                            <div class="EmojiList-emoji">{ AllEmoji[i] }</div>
                        ))
                    }
                    { props.emoji.size > limit ? <Icon class="EmojiList-plus" d={ mdiDotsHorizontal } />: null }
                </div>
            );
        }
    }
});
</script>

<style>
.EmojiList {
    display: flex;
}

.EmojiList-emoji {
    font-size: 20px;
    margin-inline: 6px;
}

.EmojiList-plus {
    height: 24px;
    margin-inline: 6px;
    fill: var(--colorGlazedGranite);
}
</style>
