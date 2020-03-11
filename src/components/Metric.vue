<script lang="tsx">
import * as Vue from "vue";

interface Props {
    title: string;
}

export default Vue.defineComponent({
    name: "Metric",
    setup(props: Props, context) {
        return (): JSX.Element => (
            <div class="Metric-main">
                <div class="Metric-title">{ props.title }</div>
                <div class="Metric-content">{ context.slots["default"]?.() }</div>
            </div>
        )
    }
});
</script>

<style>
.Metric-main {
    padding: 5px;
}
</style>
