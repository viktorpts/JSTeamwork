import * as requester from './requester';


function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.participant;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('teamId', userInfo.teamId);

    //observer.onSessionUpdate();
}

// Anonymous access to backend
async function createImplicitUser() {
    // Check if we already have an anonymous user session
    if (sessionStorage.getItem('authToken')) {
        return;
    }

    let userInfo = await requester.post('user', '', {}, 'basic');
    saveSession(userInfo);
}

// user/login
async function login(username, password, callback) {
    let userData = {
        username,
        password
    };

    let userInfo = await requester.post('user', 'login', userData, 'basic');
    saveSession(userInfo);
}

// user/register
async function register(username, password, callback) {
    let userData = {
        username,
        password
    };

    let userInfo = await requester.post('user', '', userData, 'basic');
    //observer.showSuccess('Successful registration.');
    saveSession(userInfo);
}

// user/logout
async function logout(callback) {
    await requester.post('user', '_logout', null, 'kinvey');
    sessionStorage.clear();
    //observer.onSessionUpdate();
}

export {login, register, logout, createImplicitUser};