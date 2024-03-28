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