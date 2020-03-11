<script lang="tsx">
import * as Vue from "vue";
import Metric from "./Metric.vue";
import * as metrics from "../service/metrics";

export default Vue.defineComponent({
    name: "NetworkMetrics",
    setup() {
        const starEmoji = Vue.computed(() => <span>{ metrics.mostRequestedEmoji() }</span>);
        const commonEmoji = Vue.computed(() => <span>{ metrics.mostAcceptedEmoji() }</span>);
        const emojiWhale = Vue.computed(() => <span>{ metrics.userWithMostEmoji() }</span>);
        const goldWhale = Vue.computed(() => <span>{ metrics.userWithMostGold() }</span>);
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
}
</style>
