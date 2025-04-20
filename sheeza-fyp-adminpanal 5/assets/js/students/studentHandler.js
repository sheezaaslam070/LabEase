import config from '../config.js';

const {url, maleProfilePic, femaleProfilePic} = config;

// function to display all the technicians
document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    try {
        console.log(url);
        const response = await fetch(`${url}/api/user/get-all-students`);
        const result = await response.json();

        if (response.status === 200) {
            const studentList = document.getElementById('studentTable');

            result.forEach(student => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-student-id', student._id);
                tr.innerHTML = `
                    <td>
                        <div class="d-flex">
                            <img src="${student.gender === "Male" ? maleProfilePic : femaleProfilePic}" alt>
                            <div>
                                <h6>${student.username}</h6>
                                <p>${student.userType}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h6>${student.email}</h6>
                    </td>
                    <td>
                        <h6>${student.password}</h6>
                    </td>
                    <td>
                        <a href="./editStudent.html?id=${student._id}" class="btn btn-secondary">Edit</a>
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
                                const response = await fetch(`${url}/api/user/delete-student/${student._id}`, {
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
                                console.error('Error deleting student:', error);
                            }
                        }
                    });
                });

                studentList.appendChild(tr);
            });
        } else {
            console.log('Error!', result.message || 'Failed to fetch students.', 'error');
        }
    } catch (error) {
        console.error('Error fetching students:', error);
    }
});