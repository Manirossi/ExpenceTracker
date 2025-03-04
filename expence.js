// Login function
function login() {
    // Redirect to expense tracker page after login
    window.location.href = "expense.html";
}

// Logout function
function logout() {
    window.location.href = "index.html"; // Redirect back to login page
}

// Add Expense Function
function addExpense() {
    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    let timestamp = new Date().getTime(); // Store as timestamp (milliseconds)

    if (name.trim() !== "" && amount.trim() !== "") {
        let expenseData = { name, amount, timestamp };
        localStorage.setItem("expense", JSON.stringify(expenseData));

        alert("Expense added! Report will refresh in 24 hours.");
        displayExpenses(); // Update UI immediately
    }

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
}

// Load Expenses (Only refresh after 24 hours)
function displayExpenses() {
    let savedExpense = JSON.parse(localStorage.getItem("expense"));

    if (savedExpense) {
        let lastUpdated = savedExpense.timestamp;
        let now = new Date().getTime();
        let diffHours = (now - lastUpdated) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (diffHours >= 24) {
            // Keep the data but mark it as stale
            document.getElementById("expense-list").innerHTML = 
                `<li>${savedExpense.name} - ₹${savedExpense.amount} (⏳ Data will refresh soon)</li>`;
        } else {
            document.getElementById("expense-list").innerHTML = 
                `<li>${savedExpense.name} - ₹${savedExpense.amount} (Last Updated: ${new Date(lastUpdated).toLocaleString()})</li>`;
        }
    } else {
        document.getElementById("expense-list").innerHTML = "<li>No recent expenses.</li>";
    }
}

// Call function on page load to display saved expenses
document.addEventListener("DOMContentLoaded", displayExpenses);
