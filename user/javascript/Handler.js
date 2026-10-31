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
    const button = document.getElementById('create-user');
    const message = document.getElementById('create-user-result');
    if (!button || !message || button.disabled)
        return;
    button.disabled = true;
    message.textContent = 'Creating user…';
    try {
        const response = await fetch('/api/p', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 56 })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail ?? `Request failed (${response.status})`);
        }
        message.textContent = result.status;
        console.log(result);
    }
    catch (error) {
        message.textContent = error instanceof Error ? error.message : 'Could not create user';
        console.error('Create user request failed', error);
    }
    finally {
        button.disabled = false;
    }
}
window.login = login;
window.postUser = postUser;
