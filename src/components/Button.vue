<script lang="tsx">
import * as Vue from "vue";
import Spinner from "./Spinner.vue";

interface Props {
    disabled?: boolean;
    busy?: boolean;
    onClick: () => void;
    primary?: boolean;
}

export default Vue.defineComponent({
    name: "Button",
    setup(props: Props, context) {
        return () => (
            <button onClick={props.onClick} class={["Button", {"is-busy": props.busy}, { "primary": props.primary ?? true }]} disabled={ props.disabled || props.busy }>
                { props.busy ? <Spinner /> : context.slots.default?.() }
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
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    font-size: inherit;
    border: none;
    position: relative;
    height: inherit;
    width: inherit;

    &.primary {
        color: var(--colorWhite);
        background-color: var(--colorBeer);

        &:active {
            background-color: var(--colorSoftToneInk);
        }
    }

    &:not(.primary) {
        color: var(--colorBeer);
        background-color: var(--colorBeerTransparent);

        &:active {
            background-color: var(--colorSoftToneInk);
            color: var(--colorWhite);
        }
    }

    &:disabled {
        cursor: default;
        background-color: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
    }

    &:active,
    &:focus {
        outline: none;
    }
}
</style>
