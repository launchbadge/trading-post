<script lang="tsx">
import * as Vue from "vue";
import UserRow from "../components/UserRow.vue";
import OpenTrades from "../components/OpenTrades.vue";
import Trades from "../components/Trades.vue";
import { getCurrentUser } from "../store/user";
import { useRouter } from "vue-router";

export default Vue.defineComponent({
    setup() {
        const router = useRouter();

        function handlePressTrade() {
            router.push({ name: "NewTradeWith" });
        }

        return () => (
            <div class="Home">
                {/* TODO: Get the current user object here */}
                <UserRow
                    user={getCurrentUser()!}
                    onPressTrade={handlePressTrade}
                />
                <div class="Home-heading">
                    Open Trades
                </div>
                <OpenTrades
                    user={getCurrentUser()!}
                />
                <div class="Home-heading">
                    Recent Trades
                </div>
                <Trades
                    user={getCurrentUser()!}
                />
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
    margin-block-end: 14px;
}

.Home-area {
    color: white;
    opacity: 0.5;
    font-style: italic;
}
</style>
