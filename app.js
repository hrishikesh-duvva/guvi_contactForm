var contactForm = document.getElementById('contactForm');
var responseMessage = document.getElementById('responseMessage');
//validate email
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// validate contactnumber
function validateContactNumber(contactNumber) {
    var re = /^\d{10,15}$/;
    return re.test(contactNumber);
}
//handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contactNumber = document.getElementById('contactNumber').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    // Validate form inputs
    if (!name || !email || !contactNumber || !subject || !message) {
        responseMessage.textContent = 'Please fill all required fields.';
        responseMessage.style.color = 'red';
        return;
    }
    if (!validateEmail(email)) {
        responseMessage.textContent = 'Please enter a valid email address.';
        responseMessage.style.color = 'red';
        return;
    }
    if (!validateContactNumber(contactNumber)) {
        responseMessage.textContent = 'Please enter a valid contact number (digits only, 10-15 digits).';
        responseMessage.style.color = 'red';
        return;
    }
    //form data for API submission
    var formData = {
        name: name,
        email: email,
        contactNumber: contactNumber,
        subject: subject,
        message: message
    };
    //POST request
    fetch('https://6717d25cb910c6a6e02a246e.mockapi.io/contactForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
        if (response.ok) {
            responseMessage.textContent = 'Form Submitted Successfully!';
            responseMessage.style.color = 'green';
        }
        else {
            throw new Error('Submission Failed');
        }
    })
        .catch(function (error) {
        responseMessage.textContent = error.message;
        responseMessage.style.color = 'red';
    });
}
contactForm.addEventListener('submit', handleFormSubmit);
