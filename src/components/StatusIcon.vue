<script lang="tsx">
import * as Vue from "vue";
import { mdiTimelapse, mdiCheckCircle, mdiCloseCircle } from "@mdi/js";
import Icon from "./Icon.vue";

export enum AcceptStatus {
    accepted,
    pending,
    rejected
}

interface Props {
    accepted: AcceptStatus;
}

export default Vue.defineComponent({
    setup(props: Props) {
        return () => {
            switch (props.accepted) {
                case AcceptStatus.accepted:
                    return ( <Icon class="StatusIcon accepted" d={ mdiCheckCircle } /> )
                case AcceptStatus.rejected:
                    return ( <Icon class="StatusIcon rejected" d={ mdiCloseCircle } /> )
                case AcceptStatus.pending:
                    return ( <Icon class="StatusIcon pending" d={ mdiTimelapse } /> )
            }
        }
    }
});
</script>

<style>
.StatusIcon {
    height: 24px;
    margin-inline: 16px;
    fill: var(--colorWhite);
}

.StatusIcon.pending {
    fill: var(--colorWhite);
}

.StatusIcon.accepted {
    fill: var(--colorSpandexGreen);
}

.StatusIcon.rejected {
    fill: var(--colorTeaberry);
}

</style>
