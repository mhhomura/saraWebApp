
export function reload() {
    function recarregarPagina() {

    }
    var TimeOut;
    clearTimeout(TimeOut);
    TimeOut = setTimeout(recarregarPagina(), 10);

}

/* function recarregarPagina() {
    history.push('/attendant/chat');
}
var TimeOut;
window.onresize = function () {
    clearTimeout(TimeOut);
    TimeOut = setTimeout(recarregarPagina, 10);
}; */