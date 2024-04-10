document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(function(navLink) {
      navLink.addEventListener("click", function() {
        var navbarToggler = document.querySelector(".navbar-toggler");
        if (navbarToggler.classList.contains("collapsed")) {
          return; // Navbar is already collapsed, no need to close it
        }
        var navbarCollapse = document.querySelector(".navbar-collapse");
        navbarCollapse.classList.remove("show");
        navbarToggler.classList.add("collapsed");
      });
    });
  });
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
      var navbar = document.querySelector('.navbar');
      if (window.scrollY > navbar.offsetTop) {
          navbar.classList.add('sticky-nav');
      } else {
          navbar.classList.remove('sticky-nav');
      }
  });
});
document.addEventListener("DOMContentLoaded", function() {
    var backToTopButton = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", function() {
      backToTopButton.style.display = window.scrollY > 260 ? "flex" : "none";
    });
    
    backToTopButton.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    });
document.addEventListener("DOMContentLoaded", function() {
    var highlightedElements = []; // To store highlighted elements

    document.querySelector(".d-flex").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        var searchText = document.getElementById("searchInput").value.trim().toLowerCase();
        var found = false;

        // Clear previous highlights
        highlightedElements.forEach(function(element) {
            resetTextHighlight(element);
        });
        highlightedElements = []; // Reset highlighted elements array

        // Check for the searched item in product names
        var productNames = document.querySelectorAll(".product-card h2");
        productNames.forEach(function(name) {
            if (name.textContent.toLowerCase().includes(searchText)) {
                name.closest('.product-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightText(name, searchText); // Highlight similar words
                found = true;
                highlightedElements.push(name); // Store highlighted element
            } else {
                resetTextHighlight(name); // Reset font color if not found
            }
        });

        // Check for the searched item in table cells (both Name and FEMA #)
        var tableRows = document.querySelectorAll("#products table tbody tr");
        tableRows.forEach(function(row) {
            var cells = row.querySelectorAll("td");
            cells.forEach(function(cell) {
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
            // Alert message with WhatsApp and email icons as buttons
            var alertMessage = "This item is not available. Please contact us on Phone or Email for further assistance.";
            alert(alertMessage);
        }
        

        // Clear the search input
        document.getElementById("searchInput").value = "";
    });
});

// Function to highlight similar words
function highlightText(element, searchText) {
    var innerHTML = element.innerHTML.toLowerCase();
    var index = innerHTML.indexOf(searchText);
    if (index >= 0) {
        var matchedText = element.textContent.substr(index, searchText.length);
        var highlightedText = "<span style='background-color: yellow;'>" + matchedText + "</span>";
        innerHTML = element.innerHTML.substr(0, index) + highlightedText + element.innerHTML.substr(index + searchText.length);
        element.innerHTML = innerHTML;
    }
}

// Function to reset text highlight
function resetTextHighlight(element) {
    element.innerHTML = element.textContent;
}

$(document).ready(function() {
    // Change border color on focus
    $('.form-control').focus(function() {
        $(this).css('border-color', 'lightblue');
    });
    // Reset border color on blur
    $('.form-control').blur(function() {
        $(this).css('border-color', '');
    });
});




