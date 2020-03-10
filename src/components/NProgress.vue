<script lang="tsx">
import * as Vue from 'vue'
import state from "../store/state"

export default Vue.defineComponent({
    setup() {
        const style = Vue.computed(() => {
            const x = state.network.currentSequenceNumber;
            const y = state.network.sequenceLength;
            const z = (x/y)*100; 

            return {"width": `${z}%`}  
        })

        return() => (
            <div class="NProgress">
                <div class="NProgress-progress" style={style.value}/>
            </div>
        );
    }    
});
</script>

<style>
.NProgress {
    height: 2px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: var(--colorRiverStyx);
}
.NProgress-progress {
    height: 2px;
    background-color: var(--colorSpandexGreen);
    transition: width 0.75s ease;
}
</style>