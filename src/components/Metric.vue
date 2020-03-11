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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.Metric-title {
    font-size: 20px;
    color: var(--colorBeer);
}

.Metric-content {
    padding-block-start: 10px;
}
</style>
