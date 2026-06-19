/* =======================================
   API Layer
======================================= */
const EmployeeAPI = {
    fetchEmployees: async function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;

                if (success) {
                    resolve([
                        { id: 1, name: "Aarav", email: "aarav@gmail.com" },
                        { id: 2, name: "Diya", email: "diya@gmail.com" },
                        { id: 3, name: "Rohan", email: "rohan@gmail.com" },
                        { id: 4, name: "Sneha", email: "sneha@gmail.com" },
                        { id: 5, name: "Kiran", email: "kiran@gmail.com" }
                    ]);
                } else {
                    reject("Failed to fetch employees");
                }
            }, 2000);
        });
    }
};

/* =======================================
   UI Layer
======================================= */
const UI = {
    displayEmployees(employees) {
        const list = document.getElementById("employeeList");
        const status = document.getElementById("status");

        list.innerHTML = "";
        status.textContent = "";

        employees.forEach(emp => {
            const li = document.createElement("li");
            li.textContent = `Name: ${emp.name} | Email: ${emp.email}`;
            list.appendChild(li);
        });
    },

    showLoading() {
        document.getElementById("status").textContent = "Loading employees...";
    },

    showError(msg) {
        const status = document.getElementById("status");
        status.textContent = msg;
        status.className = "error";
    }
};

/* =======================================
   Controller Layer
======================================= */
async function loadEmployees() {
    try {
        UI.showLoading();

        const employees = await EmployeeAPI.fetchEmployees();

        UI.displayEmployees(employees);

    } catch (error) {
        UI.showError(error);
        console.error(error);
    }
}