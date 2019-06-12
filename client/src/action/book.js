import actionType from './actionType';

export function setData(data) {
    let total = 0;
    for (let c of data.comments) {
        total += c.score;
    }
    data.bookDetails.comments = data.comments ? data.comments.length : 0;
    if (data.bookDetails.comments === 0) {
        data.bookDetails.averageScore = 0;
    } else {
        data.bookDetails.averageScore = total / data.comments.length;
    }
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
