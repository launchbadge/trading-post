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
        const clearState = () => {
            name.value = "";
        }

        const handleChange = (event: Event) => {
            const e = event.target as HTMLInputElement;
            name.value = e.value;
        }

        const handleSubmit = (event: Event) => {
            event.preventDefault();
            void store.createNewUserIfNeeded(name.value);
            busy.value = true;
        }

        return () => (
            <div class="Signup-container">
                <div class="Signup-title">
                    Sign up to get started
                </div>
                <form class="Signup-form">
                    <label for="name">Name</label>
                    <input name="name" onChange={handleChange} type="string" value={name.value}/>
                    <div class="Signup-button">
                        <Button
                            onClick={handleSubmit}
                            busy={busy.value}
                        >
                            Signup
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
});
</script>

<style>
.Signup-container {
    color: var(--colorWhite);
    flex-direction: column;
    height: calc(100vh - 73px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.Signup-title {
    font-size: 20px;
}

.Signup-form {
    display: flex;
    width: 250px;
    flex-direction: column;
    padding: 30px;
    align-content: space-between;
}

.Signup-button {
    height: 40px;
    width: 100%;

    & :first-child {
        width: 100%;
        height: 100%;
    }
}

label {
    padding-block-end: 5px;
    padding-inline-start: 5px;
}
input {
    border-radius: 5px;
    margin-block-end: 25px;
    height: 35px; 
    border: 2px solid var(--colorRiverStyx);

    &:focus {
        outline: none;
        border: 2px solid var(--colorBeer);
    }
}
</style>
