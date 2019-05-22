import {LOGIN, CHANGE, LOGIN_FAIL} from "./actionType";

export function login() {
    return {
        type: LOGIN
    }
}

export function loginFail() {
    return {
        type: LOGIN_FAIL
    }
}

export function change(operate) {
    return {
        type: CHANGE,
        operate
    }
}
