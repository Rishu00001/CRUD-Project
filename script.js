document.addEventListener("DOMContentLoaded", function() {
    const userForm = document.getElementById("userForm");
    const userTable = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  
    // Load users from local storage
    function loadUsers() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      userTable.innerHTML = "";
      users.forEach((user, index) => {
        const row = userTable.insertRow();
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
          </td>`;
      });
    }
  
    // Add or update user
    userForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;
  
      if (userForm.dataset.index) {
        users[userForm.dataset.index] = { name, email, role };
        delete userForm.dataset.index;
      } else {
        users.push({ name, email, role });
      }
  
      localStorage.setItem("users", JSON.stringify(users));
      loadUsers();
      userForm.reset();
    });
  
    // Edit user
    window.editUser = function(index) {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users[index];
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("role").value = user.role;
      userForm.dataset.index = index;
    };
  
    // Delete user
    window.deleteUser = function(index) {
      const users = JSON.parse(localStorage.getItem("users"));
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      loadUsers();
    };

    loadUsers();
  });
  