<script lang="tsx">
import * as Vue from "vue";
import UserRow from "../components/UserRow.vue";
import OpenTrades from "../components/OpenTrades.vue";
import Trades from "../components/Trades.vue";
import NetworkMetrics from "../components/NetworkMetrics.vue";
import { getCurrentUser } from "../store/user";
import { useRouter } from "vue-router";
import { User } from "../domain/user";
import { computed } from "vue";

export default Vue.defineComponent({
    name: "Home",
    setup() {
        const router = useRouter();

        function handlePressTrade() {
            router.push({ name: "NewTradeWith" });
        }

        const user = computed((): User => {
            return getCurrentUser()!
        });

        return () => (
            <div class="Home">
                <div class="Home-heading">
                    Network
                </div>
                <NetworkMetrics />
                <div class="Home-heading">
                    Me
                </div>
                <UserRow
                    user={user.value}
                    onPressTrade={handlePressTrade}
                />
                <div class="Home-heading">
                    Open Trades
                </div>
                <OpenTrades
                    user={user.value}
                />
                <div class="Home-heading">
                    Recent Trades
                </div>
                <Trades
                    user={user.value}
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
