import config from '../config.js';

const {url} = config;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
});

document.querySelector('.submit-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('add-student-form');

    if (!form.checkValidity()) { 
        form.reportValidity(); // Show validation errors
        return;
    }

    let formData = {
        username: document.getElementById('name').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('gender').value,
    };

    try {
        const response = await fetch(`${url}/api/user/add-student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send FormData directly
        });

        if (response.status === 201) {
            foo();
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorData.message,
            });
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire('Error!', 'Failed to submit the form. Try again.', error);
    }
});

function foo() {
    Swal.fire(
        'Submitted!',
        'Add Student Successfully',
        'success'
    ).then((result) => {
        if (result.isConfirmed) {
            redirectToPage(); // Call the redirect function directly
        }
    });
}

function redirectToPage() {
    // Redirect to the specific address
    window.location.href = './students.html';
}

// Function for cancel button click
document.querySelector('.cancel-btn').addEventListener('click', function(event) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to cancel?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to the specified address upon confirmation
            window.location.href = './students.html';
        }
    });
});