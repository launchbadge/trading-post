<script lang="tsx">
import * as Vue from "vue";
import Metric from "./Metric.vue";
import UserVue from "./User.vue";
import * as metrics from "../service/metrics";
import { AllEmoji } from "../domain/tokens";

export default Vue.defineComponent({
    name: "NetworkMetrics",
    setup() {
        const starEmojiMetric = Vue.computed(() => metrics.mostRequestedEmoji() as metrics.EmojiMetric);
        const commonEmojiMetric = Vue.computed(() => metrics.mostAcceptedEmoji() as metrics.EmojiMetric);
        const emojiWhaleMetric = Vue.computed(() => metrics.userWithMostEmoji() as metrics.UserMetric);
        const goldWhaleMetric = Vue.computed(() => metrics.userWithMostGold() as metrics.UserMetric);
        
        const starEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { AllEmoji[ starEmojiMetric.value.value ] }
        </div>);
        const commonEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { AllEmoji[ commonEmojiMetric.value.value ] }
        </div>);
        const emojiWhale = Vue.computed(() => 
        <div class="userMetric">
            <UserVue user={ emojiWhaleMetric.value.value } />
        </div>);
        const goldWhale = Vue.computed(() => 
        <div class="userMetric">
            <UserVue user={ goldWhaleMetric.value.value } />
        </div>);
        
        return (): JSX.Element => (
            <div class="NetworkMetrics-main">
                <Metric 
                    title="Most Wanted Emoji" 
                    value={ `${starEmojiMetric.value.count} Requests` }>
                    { starEmoji.value }
                 </Metric>
                <Metric 
                    title="Most Traded Emoji" 
                    value={ `${commonEmojiMetric.value.count} Trades` }>
                    { commonEmoji.value }
                </Metric>
                <Metric 
                    title="Most Emojis" 
                    value={ `${emojiWhaleMetric.value.count} Emojis` }>
                    { emojiWhale.value }
                </Metric>
                <Metric 
                    title="Most Gold" 
                    value={ `${goldWhaleMetric.value.count} Gold` }>
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
