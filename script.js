window.addEventListener('resize', () => {
    if (window.innerWidth > 540 && navbarCollapse.classList.contains('active')) {
        navbarCollapse.classList.remove('active');
        navbarToggler.classList.remove('clicked');
    }
})

function loadTemplate(templatePath, containerID) {
    return fetch(templatePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerID).innerHTML = data;
            console.log(`Loaded template: ${templatePath}`); // Log to verify loading
        })
        .catch(error => console.error(`Error loading ${templatePath}:`, error));
}
Promise.all([
    loadTemplate('navbar.html', 'navbar-sidebar'),
    loadTemplate('header.html', 'header'),
    loadTemplate('footer.html', 'footer'),
]).then(() => {
    const navbar = document.getElementById('navbar');
    const navbarCollapse = document.getElementById('navbar-collapse');
    const navbarToggler = document.getElementById('navbar-toggler');

    function toggleNavbar() {
        navbarCollapse.classList.toggle('active');
        navbarToggler.classList.toggle('clicked');
    }

    setActiveLink();

    navbarToggler.addEventListener('click', toggleNavbar);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navbarCollapse.classList.contains('active')) {
            navbarCollapse.classList.remove('active');
            navbarToggler.classList.remove('clicked');
        }
    });

    const copyright = document.getElementById('copyright');
    if (copyright) {
        const date = new Date();
        const year = date.getFullYear();
        copyright.innerHTML = `Copyright &copy; ${year} | FTHS Tech Department<br>Lead Technology Teacher - Mrs. Herbert<br>Website Developer - Justin Storm`;
    }
});

function setActiveLink() {
    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
        console.log(currentPath);
    }
    if (window.location.hostname.includes('github.com') || window.location.hostname.includes('github.io')) {
        currentPath = currentPath.split('/').pop();
        console.log(currentPath);

        if (currentPath === '') {
            currentPath = 'index.html';
        }
    }

    const navbarLinks = document.querySelectorAll('nav .pages li a');
    navbarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}