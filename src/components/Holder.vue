<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline, mdiEmoticonOutline } from "@mdi/js";
import Icon from "./Icon.vue";

interface Props {
    onTrade: () => void;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="Holder">
                <div class="Holder-avatar" />
                <div class="Holder-info">
                    <div class="Holder-name">
                        Smith
                    </div>
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">
                        {/* TODO */}
                        ...
                    </span>
                    <Icon class="Holder-balanceIcon" d={ mdiEmoticonOutline } />
                </div>
                <div class="Holder-balance">
                    <span class="Holder-balanceAmount">12,412.231</span>
                    <Icon class="Holder-balanceIcon" d={ mdiCoinOutline } />
                </div>
                <button class="Holder-newTrade" onClick={props.onTrade} >
                    Trade
                </button>
            </div>
        );
    }
});
</script>

<style>
.Holder {
    background-color: var(--colorBlackGrey);
    color: var(--colorWhite);
    padding: 16px;
    border-radius: 2px;
    display: flex;
    align-items: center;
}


.Holder-avatar {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

.Holder-info {
    margin-inline-start: 20px;
    flex-grow: 1;
}

.Holder-balanceIcon {
    fill: var(--colorSpandexGreen);
    height: 24px;
}

.Holder-balance {
    display: flex;
    margin-right: 20px;
    align-items: center;
}

.Holder-balanceAmount {
    margin-inline-end: 8px;
}

.Holder-newTrade {
    padding-block: 8px;
    user-select: none;
    cursor: pointer;
    padding-inline: 14px;
    margin-inline-end: 4px;
    color: var(--colorWhite);
    display: flex;
    align-items: center;
    background-color: var(--colorBeer);
    border-radius: 2px;
    font-size: inherit;
    border: none;
}
</style>
