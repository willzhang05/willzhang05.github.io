var mb = document.querySelector("#menu-toggle"),
    sb = document.querySelector("nav#menu"),
    //tb = document.querySelector("#banner h1"),
    wr = document.querySelector("#wrapper");
    bd = document.body;

mb.addEventListener("click", function () {
    toggleSidebar(true)
}, false);
wr.addEventListener("click", function () {
    toggleSidebar(false)
}, false);
/*tb.addEventListener("click", function () {
    toggleSidebar(false)
}, false);*/
mb.addEventListener("touchleave", function () {
    toggleSidebar(true)
}, false);
wr.addEventListener("touchleave", function () {
    toggleSidebar(false)
}, false);
/*tb.addEventListener("touchleave", function () {
    toggleSidebar(false)
}, false);*/


function toggleSidebar(toggleOpenAllowed) {
    if ((bd.style.left == "" || bd.style.left == "0px") && toggleOpenAllowed) {
        sb.style.left = "0";
        bd.style.left = "150px";
        mb.style.left = "150px";
    } else {
        sb.style.left = "-150px";
        bd.style.left = "0px";
        mb.style.left = "0px";
    }
}
window.onresize = function(event) {
    if (!sb.style.disabled) {
        bd.style.left = "0px";
        sb.style.disabled = true;
    }
}