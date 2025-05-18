document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const chatOffcanvasEl = document.getElementById('chatOffcanvas');

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('chat') === '1') {
        const chatOffcanvas = new bootstrap.Offcanvas(chatOffcanvasEl);
        chatOffcanvas.show();

        history.replaceState(null, '', window.location.pathname);
    }

    chatOffcanvasEl.addEventListener('shown.bs.offcanvas', () => {
        scrollToBottom();
    });

    scrollToBottom();
});