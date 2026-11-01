let IS_LOGIN_ENABLED

function MoveToHtml(pather: string) {
    window.location.href = pather;
}

async function login() {
    const input = document.getElementById('1') as HTMLInputElement | null;
    const button = document.getElementById('2') as HTMLButtonElement | null;

    if (!input || !button) {
        console.error('Login input or button not found')
        return;
    }

    try {
        const response = await fetch('/api/l', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: input.value.trim() })
        });
        const result = await response.json();
        console.log(result)

        if (response.ok && result.status === 'login') {
            MoveToHtml('/screens/mainhome.html')
        } else {
            console.error('Login failed', result)
        }
    } catch (error) {
        console.error('Login request failed', error)
    }
}

async function postUser() {
    const button = document.getElementById('11') as HTMLButtonElement | null
    const message = document.getElementById('10') as HTMLInputElement | null

    if (!button || !message || button.disabled) return;

    const vall = Number(message.value)
    button.disabled = true;

    try {
        const response = await fetch('/api/p', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: vall })
        });
        const result = await response.json()

        if (!response.ok) {
            console.log('Response is ERROR')
        }

        console.log(result)
    } catch (error) {
        console.error('Create user request failed', error)
    } finally {
        button.disabled = false;
    }
}

async function AskForEnv() {
    const button = document.getElementById('3') as HTMLButtonElement | null
    const status = document.getElementById('login-status')

    if (!button || !status || button.disabled) return;

    button.disabled = true;
    status.textContent = 'Checking'

    try {
        const response = await fetch('/api/k', { method: 'POST' })
        if (!response.ok) console.log('ERROR RESPONSE WITH ASKING FOR ENV')

        const answers = await response.json()
        if (answers.key === 'yes') {
            IS_LOGIN_ENABLED = true
            status.textContent = 'Success'
        } else if (answers.key === 'no') {
            IS_LOGIN_ENABLED = false
            MoveToHtml('/screens/mainhome.html')
        }

    } catch (error) {
        status.textContent = 'Unexpected error'
        console.error('failed to check', error)
    } finally {
        button.disabled = false;
    }
}

async function OnButtonClick(path:string) {
    if (!path){
        console.log('Where the path to the html?')
        return;
    }

    MoveToHtml(path)
}

async function DeleteUserWithID() {
    const button = document.getElementById('') as HTMLButtonElement | null
    const message = document.getElementById('') as HTMLOutputElement | null

    if (!button || !message){
        console.log('Elements not found...')
        return;
    }

    const vall = Number(message.value)

    try{
        const response = await fetch('/api/d',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: vall})
        })

        const answer = await response.json()
        if (!response.ok){
            console.log('Invalid Response,Error')
        }
        console.log(answer)
    }
    catch{
        console.log('Error apperead, failed to delete a user!')
    }
}

(window as any).OnButtonClick = OnButtonClick;
(window as any).AskForEnv = AskForEnv;
(window as any).login = login;
(window as any).postUser = postUser;
