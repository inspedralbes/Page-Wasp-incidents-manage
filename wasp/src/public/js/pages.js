document.addEventListener('DOMContentLoaded', () => {
    const rowsPerPage = 5;

    document.querySelectorAll('.paginable').forEach(section => {
        const rows = section.querySelectorAll('.incidencia-row');
        const pagination = section.querySelector('.pagination-controls');
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        let currentPage = 1;

        function showPage(page) {
            currentPage = page;
            rows.forEach((row, i) => {
                row.style.display = (i >= (page - 1) * rowsPerPage && i < page * rowsPerPage) ? '' : 'none';
            });
            renderPagination();
        }

        function renderPagination() {
            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                li.className = 'page-item' + (i === currentPage ? ' active' : '');
                li.innerHTML = `<button class="page-link">${i}</button>`;
                li.querySelector('button').addEventListener('click', () => showPage(i));
                pagination.appendChild(li);
            }
        }

        showPage(1);
    });
});
