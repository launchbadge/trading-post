<script lang="tsx">
import * as Vue from "vue";

const jdenticon = require("jdenticon");

interface Props {
    publicKey: string;
}

export default Vue.defineComponent({
    setup(props: Props) {
        const contents = Vue.computed(() => {
            return jdenticon.toSvg(props.publicKey.slice("302a300506032b6570032100".length), 36, { replaceMode: "never" });
        });

        const container = Vue.ref<HTMLElement | null>(null);

        Vue.onMounted(() => {
            if (container.value != null) {
                container.value.innerHTML = contents.value;
            }
        });

        Vue.onUpdated(() => {
            if (container.value != null) {
                container.value.innerHTML = contents.value;
            }
        });

        return () => (
            <div ref={container} class="Avatar" />
        );
    }
});
</script>

<style>
.Avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.2);
    background-color: var(--colorBlack);
    justify-self: center;
}
</style>
