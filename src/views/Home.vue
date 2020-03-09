<script lang="tsx">
import * as Vue from "vue";
import User from "../components/User.vue";
import { useRouter } from "vue-router";

export default Vue.defineComponent({
    setup() {
        const router = useRouter();

        return () => (
            <div class="Home">
                {/* TODO: Get the current user object here */}
                <User onTrade={() => {
                    router.push({name: "NewTrade"});
                }} />
                <div class="Home-heading">
                    Open Trades
                </div>
                <div class="Home-area">
                    No open trades
                </div>
                <div class="Home-heading">
                    Recent Trades
                </div>
                <div class="Home-area">
                    No trades
                </div>
            </div>
        );
    }
});
</script>

<style>
.Home {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.Home-heading {
    color: var(--colorWhite);
    margin-block-start: 32px;
    margin-block-end: 8px;
}

.Home-area {
    color: white;
    opacity: 0.5;
    font-style: italic;
}
</style>
