import $ from 'jquery';

const baseUrl = 'https://baas.kinvey.com/';
const appKey = 'kid_HJ4bWzxMZ';
const appSecret = '5ad6a3e5f39d4b89b0ec339f99110b76';

function makeAuth(type) {
    if (type === 'basic') return 'Basic ' + btoa(appKey + ':' + appSecret);
    else return 'Kinvey ' + sessionStorage.getItem('authToken');
}

function makeRequest(method, module, url, auth) {
    return {
        url: baseUrl + module + '/' + appKey + '/' + url,
        method,
        headers: {
            'Authorization': makeAuth(auth)
        }
    };
}

function get(module, url, auth) {
    return $.ajax(makeRequest('GET', module, url, auth));
}

function post(module, url, data, auth) {
    let req = makeRequest('POST', module, url, auth);
    req.data = JSON.stringify(data);
    req.headers['Content-Type'] = 'application/json';
    return $.ajax(req);
}

function update(module, url, data, auth) {
    let req = makeRequest('PUT', module, url, auth);
    req.data = JSON.stringify(data);
    req.headers['Content-Type'] = 'application/json';
    return $.ajax(req);
}

function remove(module, url, auth) {
    return $.ajax(makeRequest('DELETE', module, url, auth));
}

export { get, post, update, remove };