document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const chatOffcanvasEl = document.getElementById('chatOffcanvas');

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    // Abre el offcanvas si la URL contiene ?chat=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('chat') === '1') {
        const chatOffcanvas = new bootstrap.Offcanvas(chatOffcanvasEl);
        chatOffcanvas.show();

        // Limpia la URL
        history.replaceState(null, '', window.location.pathname);
    }

    // Siempre que se abra el canvas, baja el scroll al fondo
    chatOffcanvasEl.addEventListener('shown.bs.offcanvas', () => {
        scrollToBottom();
    });

    // También baja al fondo si ya estaba abierto y se recarga la página
    scrollToBottom();
});