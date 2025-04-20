import config from '../config.js';

const {url} = config;
const id = new URLSearchParams(window.location.search).get('id');
let technician = null;

// Function to get technician by id
document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    try {
        const response = await fetch(`${url}/api/technician/get/${id}`);
        technician = await response.json();
        if (technician === null) {
            Swal.fire('Error!', 'Technician not found.', 'error');
            return;
        }
        document.getElementById('name').value = technician.name;
        document.getElementById('phone').value = technician.phone;
        document.getElementById('email').value = technician.email;
        const techType = document.getElementById('techType');
        techType.value = technician.techType;
        techType.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error fetching technician:', error);
        Swal.fire('Error!', 'Failed to fetch technician. Try again.', 'error');
    }
});

document.querySelector('.submit-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const techType = document.getElementById('techType').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${url}/api/technician/update`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, phone, email, techType }),
        });

        if (response.status === 200) {
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
        Swal.fire('Error!', 'Failed to submit the form. Try again.', 'error');
    }
});

function foo() {
    Swal.fire(
        'Submitted!',
        'Technician updated successfully.',
        'success'
    ).then((result) => {
        if (result.isConfirmed) {
            redirectToPage(); // Call the redirect function directly
        }
    });
}

function redirectToPage() {
    // Redirect to the specific address
    window.location.href = './technision.html';
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
            window.location.href = './technision.html';
        }
    });
});