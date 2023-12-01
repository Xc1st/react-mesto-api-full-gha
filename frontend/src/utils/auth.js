const baseUrl = 'http://localhost:3000'

function getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

export function registration(password, email) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email,
        })
    })
        .then(res => getRes(res))
}
export function authorization(password, email) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email,
        })
    })
        .then(res => getRes(res))
}
export function getUser(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => getRes(res))
}