<script lang="tsx">
import * as Vue from "vue";
import Icon from "./Icon.vue";
import { mdiStoreOutline, mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";

export default Vue.defineComponent({
    render() {
        return (
            <header class="Header">
                <Icon class="Header-logoIcon" d={ mdiStoreOutline } />
                <span class="Header-logo">Trading Post</span>
                <div class="Header-currentUser">
                    <div class="Header-userName">George</div>
                    <div class="Header-userBalance">
                        <div class="Header-userBalanceRow">
                            <span class="Header-userBalanceAmount">8</span>
                            <Icon class="Header-currencyIcon" d={ mdiEmoticonOutline } />
                        </div>
                        <div class="Header-userBalanceRow">
                            <span class="Header-userBalanceAmount">3,523,125.93214</span>
                            <Icon class="Header-currencyIcon" d={ mdiCoinOutline } />
                        </div>
                    </div>
                    <div class="Header-userAvatar"></div>
                </div>
                <div class="Header-newTrade">
                    Trade
                </div>
            </header>
        );
    }
});
</script>

<style>
.Header {
    display: flex;
    background-color: var(--colorAbsenceOfLight);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    align-items: center;
    padding: 16px;
}

.Header-logoIcon {
    fill: var(--colorBeer);
    width: 32px;
}

.Header-logo {
    margin-inline-start: 16px;
    color: var(--colorWhite);
    flex-grow: 1;
    font-size: 24px;
}

.Header-currentUser {
    color: var(--colorWhite);
    display: grid;
    justify-items: end;
    grid-template-areas: "userName userAvatar" "userBalance userAvatar";
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    align-items: center;
    margin-inline: 24px;
}

.Header-userName {
    grid-area: userName;
}

.Header-userBalance {
    grid-area: userBalance;
    display: grid;
    grid-column-gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.Header-userBalanceRow {
    display: flex;
    align-items: center;
}

.Header-currencyIcon {
    fill: var(--colorBeer);
    height: 24px;
}

.Header-userBalanceAmount {
    margin-inline-end: 8px;
}

.Header-userAvatar {
    width: 40px;
    grid-area: userAvatar;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
}

.Header-newTrade {
    padding-block: 8px;
    user-select: none;
    cursor: pointer;
    padding-inline: 14px;
    margin-inline-end: 4px;
    color: var(--colorWhite);
    display: flex;
    align-items: center;
    background-color: var(--colorBeer);
    border-radius: 4px;
}
</style>
