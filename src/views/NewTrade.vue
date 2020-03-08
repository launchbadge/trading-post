<script lang="tsx">
import * as Vue from "vue";
import Holder from "../components/Holder.vue";

export default Vue.defineComponent({
    render() {
        return (
            <div class="NewTrade">
                <Holder />
                <Holder />
                <Holder />
                <Holder />
                <Holder />
                <Holder />
                <Holder />
                <Holder />
                <Holder />
            </div>
        );
    }
});
</script>

<style>
.NewTrade {
    padding: 20px;
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 10px;
}
</style>
