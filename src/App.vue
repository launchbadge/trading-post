<script lang="tsx">
import * as Vue from "vue";

export default Vue.defineComponent({
    render() {
        return (
            <div class="App-main" onClick={() => {
                console.log("click!")
            }}/>
        );
    }
});
</script>

<style>
.App-main {
}
</style>
