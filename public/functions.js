function lineThrough() {
    const listItem = document.querySelectorAll('.item');

    listItem.forEach(li => {
        li.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                li.classList.toggle('lineThrough');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', lineThrough);


