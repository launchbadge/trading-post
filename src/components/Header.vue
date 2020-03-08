<script lang="tsx">
import * as Vue from "vue";
import Icon from "./Icon.vue";
import { mdiStoreOutline, mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";

export default Vue.defineComponent({
    render() {
        return (
            <header class="Header">
                <span class="Header-logo">Trading Post</span>
                <div class="Header-userAvatar"></div>
            </header>
        );
    }
});
</script>

<style>
.Header {
    display: flex;
    background-color: var(--colorAbsenceOfLight);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    align-items: center;
    padding: 16px;
}

.Header-logo {
    color: var(--colorWhite);
    flex-grow: 1;
    font-size: 24px;
}

.Header-userAvatar {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}
</style>
