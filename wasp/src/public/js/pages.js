document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.incidencia-row');
    const paginations = document.querySelectorAll('.pagination-controls');
    const rowsPerPage = 5;
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
        paginations.forEach(pagination => {
            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                li.className = 'page-item' + (i === currentPage ? ' active' : '');
                li.innerHTML = `<button class="page-link">${i}</button>`;
                li.querySelector('button').addEventListener('click', () => showPage(i));
                pagination.appendChild(li);
            }
        });
    }

    showPage(1);
});
