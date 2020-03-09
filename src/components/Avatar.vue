<script lang="tsx">
import * as Vue from "vue";

interface Props {
    d: string;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="Avatar" />
        );
    }
});
</script>

<style>
.Avatar {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}
</style>
