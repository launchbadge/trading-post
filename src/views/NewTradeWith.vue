<script lang="tsx">
import * as Vue from "vue";
import state from "../store/state";
import { useRouter } from "vue-router";
import User from "../components/UserRow.vue";
import * as user from "../domain/user";

export default Vue.defineComponent({
    name: "NewTradeWith",
    setup() {
        const router = useRouter();

        function handlePressTrade(user: user.User): void {
            router.push({ name: "NewTradeFor", params: { user: user.publicKey } });
        }

        return () => (
            <div class="NewTradeWith">
                <div class="NewTradeWith-title">
                    New Trade
                </div>
                <div class="NewTradeWith-subTitle">
                    Select a user to trade with
                </div>
                <div class="NewTradeWith-main">
                    {
                        Array.from(state.network.users.values()).map((user) => (
                            <User
                                key={user.publicKey}
                                user={user}
                                onPressTrade={() => handlePressTrade(user)}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
});
</script>

<style>
.NewTradeWith {
    color: var(--colorWhite);
    padding: 20px;
}

.NewTradeWith-main {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 10px;
}

.NewTradeWith-subTitle {
    opacity: 0.6;
    margin-block-start: 5px;
    margin-block-end: 40px;
}
</style>
