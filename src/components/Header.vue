<script lang="tsx">
import * as Vue from "vue";
import Icon from "./Icon.vue";
import { mdiStoreOutline, mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Avatar from "./Avatar.vue";
import state from "../store/state";
import { getCurrentUser } from "../store/user";
import { Link as RouterLink } from "vue-router";
import logo from "../assets/trading-post.svg";

export default Vue.defineComponent({
    render() {
        return (
            <header class="Header">
                <RouterLink to={{name: "Home"}}><img src={logo} class="Header-logo" alt="Trading Post" /></RouterLink>
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
    justify-content: space-between;
    padding: 16px;
}

.Header-logo {
    width: 135px;
    height: 30px;
}
</style>
