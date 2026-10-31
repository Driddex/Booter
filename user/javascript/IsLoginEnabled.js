"use strict";
function MoveToHtml_IsLogined(path) {
    window.location.href = path;
}
function ISLoginEnabled() {
    let basetest = false;
    if (basetest === false) {
        MoveToHtml_IsLogined("/screens/mainhome.html");
    }
}
window.ISLoginEnabled = ISLoginEnabled;
