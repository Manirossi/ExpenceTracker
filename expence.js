// Function to update the total expense amount
function updateTotal() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    document.getElementById("total-expense").value = `Total: ₹${total}`;
}

// Modified function to display expenses
function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let now = new Date().getTime();
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = "<li>No expenses added yet.</li>";
        updateTotal(); // Update total to 0
        return;
    }

    expenses.forEach(expense => {
        let diffHours = (now - expense.timestamp) / (1000 * 60 * 60);
        let status = diffHours >= 12 ? "⏳ Data will refresh soon" : `Last Updated: ${new Date(expense.timestamp).toLocaleString()}`;

        let listItem = document.createElement("li");
        listItem.innerHTML = `${expense.name} - ₹${expense.amount} (${status})`;

        expenseList.appendChild(listItem);
    });

    updateTotal(); // Update total when expenses are displayed
}

// Modified Add Expense function (calls updateTotal)
function addExpense() {
    let name = document.getElementById("expense-name").value.trim();
    let amount = document.getElementById("expense-amount").value.trim();
    let timestamp = new Date().getTime();

    if (name !== "" && amount !== "") {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ name, amount, timestamp });
        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses(); // Update UI
    }

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
}

// Load expenses when page loads
document.addEventListener("DOMContentLoaded", displayExpenses);
