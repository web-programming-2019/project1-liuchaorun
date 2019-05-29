import actionType from './actionType';

export function setData(data) {
    return {
        type: actionType.GET_DATA,
        data
    }
}

export function submit() {
    return {
        type: actionType.HANDLE_SUBMIT
    }
}

export function change(value) {
    return {
        type: actionType.HANDLE_VALUE,
        value,
    }
}

export function setScore(score) {
    return {
        type: actionType.SCORE_CHANGE,
        score,
    }
}
