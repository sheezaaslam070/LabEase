import config from '../config.js';

const {url} = config;
const id = new URLSearchParams(window.location.search).get('id');
let student = null;

// Function to get student by id
document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    try {
        const response = await fetch(`${url}/api/user/get-student/${id}`);
        student = await response.json();
        if (student === null) {
            Swal.fire('Error!', 'Student not found.', 'error');
            return;
        }
        document.getElementById('name').value = student.username;
        document.getElementById('password').value = student.password;
        document.getElementById('email').value = student.email;
        const gender = document.getElementById('gender');
        console.log(student.gender);
        gender.value = student.gender;
        gender.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error fetching student:', error);
        Swal.fire('Error!', 'Failed to fetch student. Try again.', 'error');
    }
});

document.querySelector('.submit-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${url}/api/user/update-student`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, email, password, gender }),
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
        'Student updated successfully.',
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