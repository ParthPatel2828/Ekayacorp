// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


function submitForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  console.log('Form Data:', { name, email, message });

  const apiUrl = 'https://mail-sender-hefq.onrender.com/mail';

  const postData = {
      email: "nirav.ekaya@gmail.com",
      subject: "Contact Form Submission",
      message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  console.log('Sending POST request to:', apiUrl);

  axios.post(apiUrl, postData)
      .then((response) => {
          console.log('Email sent:', response.data);

          // Show success message
          alert('Message sent successfully!');

          // Reset form fields
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
      })
      .catch((error) => {
          console.error('Error sending email:', error);
          // Handle errors, e.g., show an error message to the user
      });
}