import config from '../config.js';

const {url} = config;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
});

// Function for submit button click
document.querySelector('.submit-btn').addEventListener('click', async(event) => {
    event.preventDefault(); // Prevent default form submission
    
    const pcName = document.querySelector('#pcName').value;
    const labName = document.querySelector('#labName').value;

    // check if lab exists in database, route: /api/lab/check/:labName:
    try {
        const response = await fetch(`${url}/api/lab/check/${labName}`);
        const data = await response.json();
        if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
            return;
        }
    } catch (error) {
        console.error('Error:', error);
    }

    try {
        const response = await fetch(`${url}/api/pc/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pcName, labName }),
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
        console.error('Error:', error);
    }
});

function foo() {
    Swal.fire(
        'Submitted!',
        'Add PC Successfully',
        'success'
    ).then((result) => {
        if (result.isConfirmed) {
            redirectToPage(); // Call the redirect function directly
        }
    });
}

function redirectToPage() {
    // Redirect to the specific address
    window.location.href = './pc.html';
    return false; // This return value is not needed as you are handling the redirection directly
}

// Function for cancel button click
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
            window.location.href = './pc.html';
        }
    });
});