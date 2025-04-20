import config from '../config.js';

const {url} = config;
const userType = localStorage.getItem('userType');

// function to display all the technicians
document.addEventListener('DOMContentLoaded', async () => {
    if (userType === 'admin') {
        document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
            // if item doesn't have an attribute of id="tech-only" then display it
            // if (item.id !== 'tech-only')
                item.style.display = 'block'
        });
    }
    try {
        const response = await fetch(`${url}/api/technician/all`);
        const result = await response.json();

        if (response.status === 200) {
            const technicianList = document.getElementById('technisionTable');

            result.forEach(technician => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-technician-id', technician._id);
                tr.innerHTML = `
                    <td>
                        <div class="d-flex">
                            <img src="${url}${technician.image}" alt>
                            <div>
                                <h6>${technician.name}</h6>
                                <p>${technician.techType}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h6>${technician.phone}</h6>
                    </td>
                    <td>
                        <h6>${technician.email}</h6>
                    </td>
                    <td>
                        <a href="./editTechnision.html?id=${technician._id}" class="btn btn-secondary">Edit</a>
                        <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
                    </td>`;

                tr.querySelector('#deleteButton').addEventListener('click', async () => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                const response = await fetch(`${url}/api/technician/delete/${technician._id}`, {
                                    method: 'DELETE',
                                });
        
                                if (response.status === 200) {
                                    tr.remove();
                                } else {
                                    const errorData = await response.json();
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: errorData.message,
                                    });
                                }
                            } catch (error) {
                                console.error('Error deleting technician:', error);
                            }
                        }
                    });
                });

                technicianList.appendChild(tr);
            });
        } else {
            console.log('Error!', result.message || 'Failed to fetch technicians.', 'error');
        }
    } catch (error) {
        console.error('Error fetching technicians:', error);
    }
});