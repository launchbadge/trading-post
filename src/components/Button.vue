<script lang="tsx">
import * as Vue from "vue";

interface Props {
    disabled?: boolean;
    busy?: boolean;
    onClick: () => void;
}

export default Vue.defineComponent({
    setup(props: Props, context) {
        return () => (
            <button onClick={props.onClick} class={["Button", {"is-busy": props.busy}]} disabled={ props.disabled || props.busy }>
                { props.busy ? "..." : context.slots.default?.() }
            </button>
        );
    }
});
</script>

<style>
.Button {
    padding-block: 8px;
    user-select: none;
    cursor: pointer;
    padding-inline: 14px;
    margin-inline-end: 4px;
    color: var(--colorWhite);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--colorBeer);
    border-radius: 2px;
    font-size: inherit;
    border: none;

    &:disabled {
        cursor: default;
        background-color: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
    }

    &.is-busy {
        cursor: default;
        color: var(--colorWhite);
        background-color: color-mod(var(--colorBeer) shade(10%));
    }
}
</style>
