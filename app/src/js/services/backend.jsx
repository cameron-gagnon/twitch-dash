export const urls = {
    login: '/api/login',
    logout: '/api/logout',
    token: '/api/token'
}

export const cookie_name = 'twitch_dash';

class Backend {
    login(json, successFn, errorFn) {
        this._post(urls.login, json, successFn, errorFn);
    }

    logout(redirectFn){ 
        this._post(urls.logout, {}, redirectFn);
    }

    _post(url, json = {}, successFn = ()=>{}, errorFn = ()=>{}) {
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
            redirect: 'follow'
        })
        .then(res => {
            if (!res.ok) {
                const errorStr = `Error: ${res.status} ${res.statusText}`
                console.error(errorStr);
                errorFn(errorStr);
                return;
            }
            console.log('Successfully posted to: ', url);
            successFn();
        },
        (error) => {
            const errorStr = `Error from request to ${urls.login}: ${error}`;
            console.error(errorStr);
            errorFn(errorStr);
        });
    }
}

export default Backend;