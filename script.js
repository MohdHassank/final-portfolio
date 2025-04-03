// // Ensure Typed.js is loaded before using it
// document.addEventListener("DOMContentLoaded", function() {
//     var typed = new Typed(".typing", {
//       strings: [
//         "Problem Solving",
//         "Web Development",
//         "Lifelong Learnings",
//         "Designing"
//       ],
//       typeSpeed: 100,
//       backSpeed: 60,
//       loop: true
//     });
//   });
  

// Ensure Typed.js is loaded before using it
document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed(".typing", {
      strings: [
          "Problem Solving",
          "Web Development",
          "Lifelong Learnings",
          "Designing"
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
  });

  // Handle Contact Form Submission
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevents default form submission

      // Get form data
      const name = document.querySelector('input[placeholder="Your name"]').value;
      const email = document.querySelector('input[placeholder="Email address"]').value;
      const phone = document.querySelector('input[placeholder="Phone number"]').value;
      const subject = document.querySelector('input[placeholder="Subject"]').value;
      const message = document.querySelector('textarea[placeholder="Message"]').value;

      // Validate form fields
      if (!name || !email || !message) {
          alert("Please fill in all required fields.");
          return;
      }

      // Create request payload
      const formData = { name, email, phone, subject, message };

      try {
          const response = await fetch("http://localhost:5000/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
          });

          const result = await response.json();

          if (result.success) {
              alert("Message sent successfully!");
              form.reset(); // Clear form fields after success
          } else {
              alert("Failed to send message. Please try again.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
      }
  });
});

