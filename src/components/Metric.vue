<script lang="tsx">
import * as Vue from "vue";

interface Props {
    title: string;
    value: string;
}

export default Vue.defineComponent({
    name: "Metric",
    setup(props: Props, context) {
        return (): JSX.Element => (
            <div class="Metric-main">
                <div class="Metric-title">{ props.title }</div>
                <div class="Metric-content">{ context.slots["default"]?.() }</div>
                <div class="Metric-value">{ props.value }</div>
            </div>
        )
    }
});
</script>

<style>
.Metric-main {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.Metric-title {
    font-size: 20px;
    color: var(--colorBeer);
}

.Metric-content {
    border: 1px solid var(--colorGlazedGranite);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
}

.Metric-value {
    font-size: 20px;
    color: var(--colorBeer);
}
</style>
