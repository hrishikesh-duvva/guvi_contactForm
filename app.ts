const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const responseMessage = document.getElementById('responseMessage') as HTMLDivElement;

//validate email
function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// validate contactnumber
function validateContactNumber(contactNumber) {
    var re = /^\d{10,15}$/;
    return re.test(contactNumber);
}

//handle form submission
function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

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
    const formData = {
        name,
        email,
        contactNumber,
        subject,
        message
    };

    //POST request
    fetch('https://6717d25cb910c6a6e02a246e.mockapi.io/contactForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            responseMessage.textContent = 'Form Submitted Successfully!';
            responseMessage.style.color = 'green';
        } else {
            throw new Error('Submission Failed');
        }
    })
    .catch(error => {
        responseMessage.textContent = error.message;
        responseMessage.style.color = 'red';
    });
}

contactForm.addEventListener('submit', handleFormSubmit);
