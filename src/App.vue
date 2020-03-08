<script lang="tsx">
import * as Vue from "vue";
import { View } from "vue-router";
import Header from "./components/Header.vue";

export default Vue.defineComponent({
    name: "App",
    render() {
        return (
            <div class="App">
                <Header />
                <div class="App-main">
                    <View />
                </div>
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
