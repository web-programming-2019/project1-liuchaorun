const crypto = require('crypto');

export function sha256(id) {
    return crypto.createHmac('sha256', 'bytu').update(`${id}`).digest('hex');
}

export const code = {
    SUCCESS: 200,
    PARAM_ERROR: 0,
    PARAM_MISSING: 1,
    LOGIN_ERROR: 2,
};
