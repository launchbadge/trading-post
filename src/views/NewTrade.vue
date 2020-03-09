<script lang="tsx">
import * as Vue from "vue";
import User from "../components/User.vue";
import state from "../store/state";

export default Vue.defineComponent({
    setup() {
        return () => (
            <div class="NewTrade">
                {
                    Array.from(state.network.users.values()).map((user) => (
                        <User user={user} />
                    ))
                }
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
