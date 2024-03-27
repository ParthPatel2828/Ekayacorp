window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  var scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
      navbar.style.backgroundColor = '#333'; // Change to your desired color
  } else {
      navbar.style.backgroundColor = 'transparent';
  }
});




