function buildNavbar() {
    const user = getUser();
    
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Left side — always the same
    const leftSide = `
        <div class="navbar-left">
            <a href="index.html" class="navbar-brand">MagazinOnline</a>
            <nav class="navbar-links">
                <a href="index.html">Home</a>
                <a href="shop.html">Shop</a>
            </nav>
        </div>
    `;

    // Right side — changes based on login state
    let rightSide = '';

    if (!user) {
        // Not logged in → show Login and Sign Up buttons
        rightSide = `
            <div class="navbar-right">
                <a href="login.html" class="btn btn-outline">Log In</a>
                <a href="register.html" class="btn btn-primary">Sign Up</a>
            </div>
        `;
    } else if (user.role === 'BUYER') {
        // Logged in as buyer
        rightSide = `
            <div class="navbar-right">
                <div class="dropdown">
                    <button class="btn btn-outline dropdown-toggle">
                        My Account ▾
                    </button>
                    <div class="dropdown-menu">
                        <a href="account-buyer.html">Account Settings</a>
                        <a href="#" onclick="logOut()">Log Out</a>
                    </div>
                </div>
            </div>
        `;
    } else if (user.role === 'SELLER') {
        // Logged in as seller
        rightSide = `
            <div class="navbar-right">
                <div class="dropdown">
                    <button class="btn btn-outline dropdown-toggle">
                        My Account ▾
                    </button>
                    <div class="dropdown-menu">
                        <a href="account-seller.html">Account Settings</a>
                        <a href="seller-dashboard.html">My Business</a>
                        <a href="#" onclick="logOut()">Log Out</a>
                    </div>
                </div>
            </div>
        `;
    } else if (user.role === 'ADMIN') {
        // Logged in as admin
        rightSide = `
            <div class="navbar-right">
                <div class="dropdown">
                    <button class="btn btn-outline dropdown-toggle">
                        My Account ▾
                    </button>
                    <div class="dropdown-menu">
                        <a href="admin-dashboard.html">Administrator</a>
                        <a href="#" onclick="logOut()">Log Out</a>
                    </div>
                </div>
            </div>
        `;
    }

    navbar.innerHTML = leftSide + rightSide;

    // Dropdown toggle logic
    const toggle = navbar.querySelector('.dropdown-toggle');
    const menu = navbar.querySelector('.dropdown-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.toggle('open');
        });

        // Click anywhere else → close dropdown
        document.addEventListener('click', function () {
            menu.classList.remove('open');
        });
    }
}

// Run automatically when any page loads
document.addEventListener('DOMContentLoaded', buildNavbar);