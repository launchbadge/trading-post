<script lang="tsx">
import * as Vue from "vue";
import Metric from "./Metric.vue";
import UserVue from "./User.vue";
import * as metrics from "../service/metrics";
import { AllEmoji } from "../domain/tokens";

export default Vue.defineComponent({
    name: "NetworkMetrics",
    setup() {
        const starEmojiMetric = Vue.computed(() => metrics.mostRequestedEmoji());
        const commonEmojiMetric = Vue.computed(() => metrics.mostAcceptedEmoji());
        const emojiWhaleMetric = Vue.computed(() => metrics.userWithMostEmoji());
        const goldWhaleMetric = Vue.computed(() => metrics.userWithMostGold());
        
        const starEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { starEmojiMetric.value != null ? AllEmoji[ starEmojiMetric.value.value ] : "-" }
        </div>);
        const commonEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { commonEmojiMetric.value != null ? AllEmoji[ commonEmojiMetric.value.value ] : "-"}
        </div>);
        const emojiWhale = Vue.computed(() => 
        <div class="userMetric">
            { emojiWhaleMetric.value != null ? <UserVue user={ emojiWhaleMetric.value.value } /> : null }
        </div>);
        const goldWhale = Vue.computed(() => 
        <div class="userMetric">
            { goldWhaleMetric.value != null ? <UserVue user={ goldWhaleMetric.value.value } /> : null }
        </div>);
        
        return (): JSX.Element => (
            <div class="NetworkMetrics-main">
                <Metric 
                    title="Most Wanted Emoji" 
                    value={ starEmojiMetric.value != null ? `${starEmojiMetric.value.count} Requests` : "" }>
                    { starEmoji.value }
                 </Metric>
                <Metric 
                    title="Most Traded Emoji" 
                    value={ commonEmojiMetric.value != null ? `${commonEmojiMetric.value.count} Trades`: "" }>
                    { commonEmoji.value }
                </Metric>
                <Metric 
                    title="Most Emojis" 
                    value={ emojiWhaleMetric.value != null ? `${emojiWhaleMetric.value.count} Emojis` : "" }>
                    { emojiWhale.value }
                </Metric>
                <Metric 
                    title="Most Gold" 
                    value={ goldWhaleMetric.value != null ? `${goldWhaleMetric.value.count} Gold`: "" }>
                    { goldWhale.value }
                </Metric>
            </div>
        );
    }
});
</script>

<style>
.NetworkMetrics-main {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: var(--colorBlackGrey);
    color: var(--colorWhite);
    padding: 16px;
    border-radius: 2px;
    align-items: center;
    

}
@media (max-width: 930px){
    .NetworkMetrics-main {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 50px;
    }
}

.emojiMetric {
    font-size: 36px;
    margin-inline: 6px;
    font-family: 'NotoColorEmoji';
}
</style>
