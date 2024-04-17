document.addEventListener("DOMContentLoaded", function() {
    // Navbar links functionality
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", () => {
            const navbarToggler = document.querySelector(".navbar-toggler");
            if (!navbarToggler.classList.contains("collapsed")) {
                const navbarCollapse = document.querySelector(".navbar-collapse");
                navbarCollapse.classList.remove("show");
                navbarToggler.classList.add("collapsed");
            }
        });
    });

    // Sticky navigation functionality
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > navbar.offsetTop) {
            navbar.classList.add('sticky-nav');
        } else {
            navbar.classList.remove('sticky-nav');
        }
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", function() {
        backToTopButton.style.display = window.scrollY > 260 ? "flex" : "none";
    });
    backToTopButton.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Search functionality
    const highlightedElements = []; // To store highlighted elements
    document.querySelector(".d-flex").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const searchText = document.getElementById("searchInput").value.trim().toLowerCase();
        let found = false;

        // Clear previous highlights
        highlightedElements.forEach(element => resetTextHighlight(element));
        highlightedElements.length = 0; // Reset highlighted elements array

        // Check for the searched item in product names
        const productNames = document.querySelectorAll(".product-card h2");
        productNames.forEach(name => {
            if (name.textContent.toLowerCase().includes(searchText)) {
                name.closest('.product-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightText(name, searchText); // Highlight similar words
                found = true;
                highlightedElements.push(name); // Store highlighted element
            } else {
                resetTextHighlight(name); // Reset font color if not found
            }
        });

        // Check for the searched item in list items
        const listItems = document.querySelectorAll(".product-card li");
        listItems.forEach(item => {
            if (item.textContent.toLowerCase().includes(searchText)) {
                item.closest('.product-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightText(item, searchText); // Highlight similar words
                found = true;
                highlightedElements.push(item); // Store highlighted element
            } else {
                resetTextHighlight(item); // Reset font color if not found
            }
        });

        // Check for the searched item in table cells (both Name and FEMA #)
        const tableRows = document.querySelectorAll("#products table tbody tr");
        tableRows.forEach(row => {
            const cells = row.querySelectorAll("td");
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchText)) {
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    highlightText(cell, searchText); // Highlight similar words
                    found = true;
                    highlightedElements.push(cell); // Store highlighted element
                } else {
                    resetTextHighlight(cell); // Reset font color if not found
                }
            });
        });

        // Display result
        if (!found) {
            // Redirect to the contact page using its ID
            window.location.href = "#contact";
            const alertMessage = "Please contact us on Phone or Email for further assistance.";
            alert(alertMessage);
        }

        // Clear the search input
        document.getElementById("searchInput").value = "";
    });

});

// Function to highlight similar words
function highlightText(element, searchText) {
    const innerHTML = element.innerHTML.toLowerCase();
    const index = innerHTML.indexOf(searchText);
    if (index >= 0) {
        const matchedText = element.textContent.substr(index, searchText.length);
        const highlightedText = "<span style='background-color: yellow;'>" + matchedText + "</span>";
        element.innerHTML = innerHTML.substr(0, index) + highlightedText + innerHTML.substr(index + searchText.length);
    }
}

// Function to reset text highlight
function resetTextHighlight(element) {
    element.innerHTML = element.textContent;
}

const url = 'https://rapidmail.p.rapidapi.com/';
const apiKey = '31257d2cf5msh4aa2f902e119ecbp112e62jsn5b81efd50058';

async function sendMail(data) {
    try {
        const body = {
            sendto: 'nirav.ekaya@gmail.com', // Updated receiver email
            name: data.get('name'),
            replyTo: data.get('email'), // Use the submitted email as replyTo
            ishtml: false,
            title: 'New Message from Ekaya Contact Form 😊',
            body: `
                Name: ${data.get('name')}
                Company Name: ${data.get('company')}
                Country: ${data.get('country')}
                Contact No: ${data.get('contact')}
                Email: ${data.get('email')}
                Message: ${data.get('message')}
            `
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '31257d2cf5msh4aa2f902e119ecbp112e62jsn5b81efd50058',
                'X-RapidAPI-Host': 'rapidmail.p.rapidapi.com'
            },
            body: JSON.stringify(body)
        };

        const response = await fetch(url, options);
        if (response.ok) {
            // Success: show alert and clear form
            alert('Your message was sent successfully!');
            document.getElementById('contactForm').reset();
        } else {
            // Error: log error message
            const errorText = await response.text();
            console.error('Failed to send message:', errorText);
        }
    } catch (error) {
        console.error('An error occurred while sending the message:', error);
    }
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    sendMail(formData);
});
