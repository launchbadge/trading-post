<script lang="tsx">
import * as Vue from "vue";
import Metric from "./Metric.vue";
import UserVue from "./User.vue";
import * as metrics from "../service/metrics";
import { AllEmoji } from "../domain/tokens";

export default Vue.defineComponent({
    name: "NetworkMetrics",
    setup() {
        const starEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { AllEmoji[ metrics.mostRequestedEmoji() ] }
        </div>);
        const commonEmoji = Vue.computed(() => 
        <div class="emojiMetric">
            { AllEmoji[ metrics.mostAcceptedEmoji() ] }
        </div>);
        const emojiWhale = Vue.computed(() => 
        <div class="userMetric">
            <UserVue user={ metrics.userWithMostEmoji() } />
        </div>);
        const goldWhale = Vue.computed(() => 
        <div class="userMetric">
            <UserVue user={ metrics.userWithMostGold() } />
        </div>);
        return (): JSX.Element => (
            <div class="NetworkMetrics-main">
                <Metric title="Most Requested Emoji">{ starEmoji.value }</Metric>
                <Metric title="Most Accepted Emoji">{ commonEmoji.value }</Metric>
                <Metric title="Largest Emoji Collection">{ emojiWhale.value }</Metric>
                <Metric title="Largest Gold Balance">{ goldWhale.value }</Metric>
            </div>
        );
    }
});
</script>

<style>
.NetworkMetrics-main {
    background-color: var(--colorBlackGrey);
    color: var(--colorWhite);
    padding: 16px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.emojiMetric {
    font-size: 36px;
    margin-inline: 6px;
    font-family: 'NotoColorEmoji';
}
</style>
