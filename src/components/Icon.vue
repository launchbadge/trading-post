<script lang="tsx">
import * as Vue from "vue";

interface Props {
    d: string;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <svg viewBox="0 0 24 24"><path d={ props.d } /></svg>
        );
    }
});
</script>
