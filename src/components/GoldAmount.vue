<script lang="tsx">
import * as Vue from "vue";
import { mdiCoinOutline } from "@mdi/js";
import Icon from "./Icon.vue";

interface Props {
    amount: string;
    reverse?: boolean;
}

export default Vue.defineComponent({
    name: "GoldAmount",
    setup(props: Props) {
        return () => (
            <div class={["GoldAmount", { "GoldAmount-reverse": props.reverse } ]}>
                <div>{ props.amount }</div>
                <Icon class="GoldAmount-icon" d={ mdiCoinOutline } />
            </div>
        );
    }
});
</script>

<style>
.GoldAmount {
    display: flex;
    align-items: center;
    justify-self: right;

    & > :first-child {
        margin-inline-end: 8px;
    }
}

.GoldAmount-reverse {
    flex-direction: row-reverse;

    & > :first-child {
        margin-inline-end: 0;
    }

    & > :nth-child(2) {
        margin-inline-end: 8px;
    }
}

.GoldAmount-icon {
    fill: var(--colorSpandexGreen);
    height: 24px;
}
</style>
