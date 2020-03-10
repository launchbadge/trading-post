<script lang="tsx">
import * as Vue from "vue";

export default Vue.defineComponent({
    setup() {
        return () => (
            <div class="Spinner-wrapper">
                <div class="Spinner" />
            </div>
        );
    }
});
</script>

<style>

.Spinner-wrapper {
    margin-inline: auto;
}

.Spinner,
.Spinner::after {
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    font-size: 10px;
}

@media screen and ( prefers-reduced-motion: reduce ) {
    .Spinner {
        animation: none;
    }
}

.Spinner {
    position: relative;
    border-top: 0.4em solid color-mod(var(--colorWhite) shade(25%));
    border-right: 0.4em solid color-mod(var(--colorWhite) shade(25%));
    border-bottom: 0.4em solid color-mod(var(--colorWhite) shade(25%));
    border-left: 0.4em solid color-mod(var(--colorWhite) alpha(25%));
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
