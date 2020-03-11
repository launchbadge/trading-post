import { Buffer } from "buffer";

window["Buffer"] = Buffer;

window["process"] = {
    browser: true,
    env: { },
    nextTick(callback: () => void) {
        window.setTimeout(callback, 0);
    }
};
