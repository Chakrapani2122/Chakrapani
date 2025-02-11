document.getElementById('contact_form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Email configuration
    const senderEmail = "chakrapani.g99@gmail.com";  // Use a predefined email address
    const receiverEmail = "chakrapani.g99@gmail.com";
    const password = "your-email-password";  // Replace with your email password

    const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Create the email content
    const msg = {
        to: receiverEmail,
        from: senderEmail,
        subject: "New Contact Form Submission",
        text: emailContent
    };

    // Simulate email sending (replace with actual email sending logic)
    console.log(`Email sent to ${receiverEmail} with content:\n${emailContent}`);

    // Use an email sending service like SendGrid, Mailgun, or similar
    fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
            personalizations: [{ to: [{ email: receiverEmail }] }],
            from: { email: senderEmail },
            subject: msg.subject,
            content: [{ type: 'text/plain', value: msg.text }]
        })
    })
    .then(response => {
        if (response.ok) {
            alert("Thank you for your message! We will get back to you soon.");
        } else {
            alert("There was an error sending your message. Please try again later.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error sending your message. Please try again later.");
    });
});
