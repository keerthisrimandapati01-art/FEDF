// Initial student data
let students = [
    "Aarav", "Diya", "Kiran", "Meena", "Ravi",
    "Sneha", "Arjun", "Priya", "Rahul", "Anjali"
];

// Virtual DOM (copy of initial state)
let virtualDOM = [...students];

const list = document.getElementById("studentList");

// 🔹 Render full list (Direct DOM)
function renderList(data) {
    list.innerHTML = "";

    data.forEach((student, index) => {
        const li = document.createElement("li");
        li.textContent = student;
        li.setAttribute("data-index", index);
        list.appendChild(li);
    });
}

// Initial display
renderList(students);

// 🔴 Direct DOM → FULL re-render
function updateDirectDOM() {
    // Change some students
    students[1] = "Diya Updated";
    students[2] = "Kiran Updated";
    students[5] = "Sneha Updated";
    students[8] = "Rahul Updated";

    console.log("Direct DOM: Entire list re-rendered");

    // Re-render entire list
    renderList(students);
}

// 🟢 Virtual DOM → ONLY changed items update
function updateVirtualDOM() {
    // Create new state
    let newStudents = [...students];

    // Change some values
    newStudents[1] = "Diya Virtual";
    newStudents[2] = "Kiran Virtual";
    newStudents[5] = "Sneha Virtual";
    newStudents[8] = "Rahul Virtual";

    console.log("Virtual DOM: Only changed elements updated");

    // Compare old virtual DOM with new data
    newStudents.forEach((student, index) => {
        if (student !== virtualDOM[index]) {

            const li = list.querySelector(`li[data-index='${index}']`);

            if (li) {
                li.textContent = student;

                // Highlight updated item
                li.classList.add("updated");
                setTimeout(() => {
                    li.classList.remove("updated");
                }, 500);
            }
        }
    });

    // Update virtual DOM & actual data
    virtualDOM = [...newStudents];
    students = [...newStudents];
}