function MoveToHtml_IsLogined(path:string){
    window.location.href = path
}

function ISLoginEnabled(){
    let basetest = false

    if (basetest === false){
        MoveToHtml_IsLogined("/screens/mainhome.html")
    }
}
(window as any).ISLoginEnabled = ISLoginEnabled