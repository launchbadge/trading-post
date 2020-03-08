<script lang="tsx">
import * as Vue from "vue";
import { View } from "vue-router";
import Header from "./components/Header.vue";

export default Vue.defineComponent({
    name: "App",
    render() {
        return (
            <>
                <Header />
                <div class="App-main">
                    <View />
                </div>
            </>
        );
    }
});
</script>

<style lang="css">
/* Found at body in src/index.html */
#app {
    display: flex;
    min-height: inherit;
    flex-direction: column;
    background-color: var(--colorRiverStyx);
}

.App-main {
}
</style>
