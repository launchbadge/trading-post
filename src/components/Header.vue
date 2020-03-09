<script lang="tsx">
import * as Vue from "vue";
import Icon from "./Icon.vue";
import { mdiStoreOutline, mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Avatar from "./Avatar.vue";
import state from "../store/state";
import { getCurrentUser } from "../store/user";

export default Vue.defineComponent({
    render() {
        return (
            <header class="Header">
                <span class="Header-logo">Trading Post</span>
                <Avatar publicKey={ getCurrentUser() != null ? getCurrentUser()!.publicKey.toString() : "" } />
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
</style>
