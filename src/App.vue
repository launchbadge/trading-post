<script lang="tsx">
import * as Vue from "vue";
import { View } from "vue-router";
import Header from "./components/Header.vue";
import Signup from "./views/Signup.vue";
import { createNewUserIfNeeded, doesCurrentUserExist } from "./store/user";
import { startListening } from "./service/mirror";
import state from "./store/state";
import { computed } from "vue";
import { getRunningHash } from "./service/hedera";
import NProgress from "./components/NProgress.vue";

export default Vue.defineComponent({
    name: "App",
    setup() {
        Vue.onBeforeMount(() => {
            void startListening(state.topicId!);
            void getRunningHash(state.topicId!);
        });

        const main = Vue.ref(<Signup />)    
        Vue.watch(
            () => doesCurrentUserExist(), 
            (newVal) => {
                if (newVal) {
                    main.value = (
                        <div class="App-main">
                            <View/>
                        </div>
                    )
                } else {
                    main.value = <Signup />
                }
            } 
            )

        return() => (
            <div class="App">
                <Header/>
                <NProgress />
                { main.value }
            </div>
        );
    }
});
</script>

<style lang="css">
/* Found at body in src/index.html */
#app {
    min-height: inherit;
}

.App {
    display: flex;
    min-height: inherit;
    flex-direction: column;
    background-color: var(--colorRiverStyx);
}

.App-main {
}
</style>
