<script lang="tsx">
import * as Vue from "vue";
import { View } from "vue-router";
import Header from "./components/Header.vue";
import Splash from "./components/Splash.vue";
import { createNewUserIfNeeded, doesCurrentUserExist } from "./store/user";
import { startListening } from "./service/mirror";
import state from "./store/state";

export default Vue.defineComponent({
    name: "App",
    setup() {
        Vue.onBeforeMount(() => {
            void startListening(state.topicId!);
            void createNewUserIfNeeded();
        });

        return () => {
            let main;

            if (doesCurrentUserExist()) {
                main = (
                    <div class="App-main">
                        <View/>
                    </div>
                );
            } else {
                main = (<Splash />);
            }

            return (
                <div class="App">
                    <Header/>
                    { main }
                </div>
            );
        };
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
