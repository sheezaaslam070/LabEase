import config from '../config.js';

const {url} = config;

const labCount = document.getElementById('lab-count');

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    try {
        const response = await fetch(`${url}/api/lab/all`);
        const labs = await response.json();
        labCount.innerText = `You have ${labs.length} Labs`;
        const labTable = document.getElementById('labTable');
        labs.forEach((lab) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <h6>${lab.labName
                        .split(' ') 
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</h6>
                </td>
                <td>
                    <h6>${lab.deptName
                        .split(' ') 
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</h6>
                </td>
                <td>
                    <a href="./editlab.html?id=${lab._id}" class="btn btn-secondary">Edit</a>
                    <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
                </td>
            `;

            // Adding event listener to delete button
            tr.querySelector('#deleteButton').addEventListener('click', async () => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!\nAll the PCs in this lab will also be deleted.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const response = await fetch(`${url}/api/lab/delete/${lab._id}`, {
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
                            console.error('Error:', error);
                        }
                    }
                });

            });

            labTable.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});