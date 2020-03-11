<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        title: String,
    },
    setup(props) {
        return (): JSX.Element => (
            <div class="Metric-main">
                <div class="Metric-title">{ props.title }</div>
                <div class="Metric-content"><slot></slot></div>
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