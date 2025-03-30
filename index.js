document.addEventListener('DOMContentLoaded', () => {
    // Load previously saved users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

    // Populate table with loaded users
    users.forEach(user => addUserToTable(user));

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = new Date(document.getElementById('dob').value);
        const termsAccepted = document.getElementById('terms').checked;

        // Validate age (18 to 55 years)
        const age = new Date().getFullYear() - dob.getFullYear();

        if (age < 18 || age > 55) {
            alert("You must be between 18 to 55 years old.");
            return;
        }

        // Create new user object
        const newUser = { name, email, password, dob: dob.toISOString().split('T')[0], terms: termsAccepted };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Add new user to the table
        addUserToTable(newUser);

        // Reset form
        document.getElementById('registrationForm').reset();
    });
});

// Function to add user to the HTML table
function addUserToTable(user) {
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const newRow = usersTable.insertRow();
    newRow.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms}</td>
    `;
}
