<script lang="tsx">
import * as Vue from "vue";
import { User } from "../domain/user";
import Avatar from "./Avatar.vue";

interface Props {
    user: User;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => (
            <div class="User">
                <Avatar publicKey={ props.user.publicKey } />
                <div class="User-meta">
                    <div class="User-name">{ props.user.name }</div>
                    <div class="User-key">{ props.user.publicKey.slice("302a300506032b6570032100".length) }</div>
                </div>
            </div>
        );
    }
});
</script>

<style>
.User {
    display: flex;
}

.User-meta {
    display: flex;
    margin-inline-start: 20px;
    flex-direction: column;
}

.User-name {
    margin-block-end: 6px;
}

.User-key {
    opacity: 0.5;
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: 'Jetbrains Mono', monospace;
}
</style>
