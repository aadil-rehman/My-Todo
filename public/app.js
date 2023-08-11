const list = document.querySelectorAll('li');
const checkboxes = document.querySelectorAll('.checkbox');

// data attribute
// checkboxes.forEach((checkbox) => {
//     debugger;
//     if(checkbox.checked) {
//         deleteTask(checkbox.dataset.taskid);
//     }
// });

checkboxes.forEach((checkbox) => {
    //checking if checkbox is clicked then delete particular task
    checkbox.addEventListener('change', async () => {
        await deleteTask(checkbox.dataset.taskid);
        console.log("YAtyyyyyyyy, deleted");
    });
})

// event delegation
async function deleteTask(todoId) {
    // get the id of the task whose checkbox is clicked

    // call the api with that id
    const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: "DELETE",
    });

    console.log(response.json());
    // reload the home page programatically
    window.location.href = "/";
};