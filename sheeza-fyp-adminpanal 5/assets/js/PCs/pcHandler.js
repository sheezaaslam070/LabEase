import config from "../config.js";

const {url} = config;

const pcCount = document.getElementById('pc-count');

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    try {
        const response = await fetch(`${url}/api/pc/all`);
        const data = await response.json();
        pcCount.innerText = `You have ${data.length} PCs`;
        const pcTable = document.getElementById('pcTable');
        data.forEach((pc) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <h6>${pc.pcName
                        .split(' ') 
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</h6>
                </td>
                <td>
                    <h6>${pc.labName
                        .split(' ') 
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</h6>
                </td>
                <td>
                    <a href="./editPc.html?id=${pc._id}" class="btn btn-secondary">Edit</a>
                    <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
                </td>
            `;

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
                            const response = await fetch(`${url}/api/pc/delete/${pc._id}`, {
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

            pcTable.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});