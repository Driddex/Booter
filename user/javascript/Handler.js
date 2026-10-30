"use strict";
function MoveToHtml(pather) {
    window.location.href = pather;
}
async function login() {
    const input = document.getElementById('1');
    const button = document.getElementById('2');
    if (!input || !button) {
        console.error('Login input or button not found');
        return;
    }
    try {
        const response = await fetch('/api/l', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: input.value.trim() })
        });
        const result = await response.json();
        console.log(result);
        if (response.ok && result.status === 'login') {
            MoveToHtml('/screens/mainhome.html');
        }
        else {
            console.error('Login failed', result);
        }
    }
    catch (error) {
        console.error('Login request failed', error);
    }
}
async function postUser() {
    try {
        const response = await fetch('/api/p', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 56 })
        });
        const result = await response.json();
        console.log(result);
    }
    catch (error) {
        console.log('failed to create a user');
    }
}
window.login = login;
