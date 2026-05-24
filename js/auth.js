// Saves user info after login
function saveUser(email, role, name) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
}

// Gets the currently logged in user
function getUser() {
    const email = localStorage.getItem('userEmail');
    if (!email) return null;
    return {
        email: email,
        role: localStorage.getItem('userRole'),
        name: localStorage.getItem('userName')
    };
}

// Logs the user out
function logOut() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Checks if anyone is logged in
function isLoggedIn() {
    return localStorage.getItem('userEmail') !== null;
}

// Checks if logged in user is a specific role
function isRole(role) {
    return localStorage.getItem('userRole') === role;
}