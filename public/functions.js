// function lineThrough() {
//     const listItem = document.querySelectorAll('.item');

//     listItem.forEach(li => {
//         li.addEventListener('click', function (event) {
//             if (event.target.tagName === 'LI') {
//                 li.classList.toggle('lineThrough');
//                 const taskId = li.getAttribute('data-task-id');
//                 const isLineThrough = li.classList.contains('lineThrough');
//                 localStorage.setItem(`task-${taskId}`, isLineThrough);
//             }
//         });

//         const taskId = li.getAttribute('data-task-id');
//         const isLineThrough = localStorage.getItem(`task-${taskId}`);
//         if (isLineThrough === 'true') {
//             li.classList.add('lineThrough');
//         }
//     });
// }

// document.addEventListener('DOMContentLoaded', lineThrough);

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


