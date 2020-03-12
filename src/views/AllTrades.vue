<script lang="tsx">
import * as Vue from "vue";
import state from "../store/state";
import TradeRow from "../components/TradeRow.vue";
import { useRouter } from "vue-router";

export default Vue.defineComponent({
    name: "AllTrades",
    setup() {
        const router = useRouter();

        return () => (
            <div class="AllTrades">
                <div class="AllTrades-title">All Trades</div>
                { Array.from(state.network.trades.values()).reverse().map((trade) => (
                    <TradeRow 
                        key={ trade.id }
                        trade={ trade }
                        onPressView={() => {
                            router.push({ name: "Trade", params: { id: trade.id.toString() } });
                        }}
                    />
                ))}
            </div>
        );
    }
});
</script>

<style>
.AllTrades {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 10px;
    padding: 20px;
}

.AllTrades-title {
    color: var(--colorWhite);
    padding-block-end: 10px; 
}
</style>
