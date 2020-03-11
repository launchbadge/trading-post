<script lang="tsx">
import * as Vue from "vue";
import state from "../store/state";
import { useRouter } from "vue-router";
import User from "../components/UserRow.vue";
import Button from "../components/Button.vue";
import * as user from "../domain/user";
import * as store from "../store/user";

interface State {
    [key: string]: string;
}

export default Vue.defineComponent({
    name: "Signup",
    setup() {
        const router = useRouter();
        const name = Vue.ref("");
        const busy = Vue.ref(false);
        const isEmpty = Vue.ref(false);
        const isLoaded = Vue.computed(() => state.network.sequenceLength > 0 && state.network.sequenceLength === state.network.currentSequenceNumber);

        const clearState = () => {
            name.value = "";
        }

        const handleChange = (event: Event) => {
            const e = event.target as HTMLInputElement;
            name.value = e.value.trim();
        }

        const handleSubmit = (event: Event) => {
            event.preventDefault();
            if (name.value.length > 0) {
                void store.createNewUserIfNeeded(name.value);
                isEmpty.value = false;
                busy.value = true;
            } else {
                isEmpty.value = true;
            }
        }

        return () => (
            <div class="Signup-container">
                <div class="Signup-title">
                    { isLoaded.value ? "Sign up to get started" : "Checking for existing account..." }
                </div>
                { isLoaded.value? <form class="Signup-form">
                    <label class="label" for="name">Name</label>
                    <input class="input" name="name" onChange={handleChange} type="text" value={name.value}/>
                    <div class="error">{ isEmpty.value ? "Name is required" : "" }</div>
                    <div class="Signup-button">
                        <Button
                            onClick={handleSubmit}
                            busy={busy.value || !isLoaded.value}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div class="notice">{ busy.value ? "This may take a few minutes": "" }</div>
                </form>: null}
            </div>
        );
    }
});
</script>

<style>
.Signup-container {
    color: var(--colorWhite);
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.Signup-title {
    font-size: 20px;
}

.Signup-form {
    display: flex;
    flex-direction: column;
    width: 250px;
    padding: 35px;
}

.Signup-button {
    height: 40px;
    width: 100%;
}

.label {
    padding-block-end: 10px;
}

.input {
    background-color: transparent;
    border-radius: 5px;
    height: 35px;
    padding-inline: 8px;
    border: 2px solid var(--colorGlazedGranite);
    color: var(--colorWhite);

    &:focus {
        outline: none;
        border-color: var(--colorBeer);
    }
}

.error {
    height: 16px;
    margin-block-start: 5px;
    margin-block-end: 25px;
    color: var(--colorTeaberry);
}

.notice {
    height: 16px;
    margin-block-start: 15px;
    text-align: center;
    color: color-mod(var(--colorWhite) alpha(70%));
}
</style>
