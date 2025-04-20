import config from './config.js';

const { url, maleProfilePic, femaleProfilePic } = config;

const requestCount = document.getElementById('requests-count');
const requests = document.getElementById('requests');
let count = 0;

const reportTypeHashTable = {
    'PCProblem': 'pc',
    'InternetProblem': 'internet',
    'FurnitureProblem': 'furniture',
    'CircuitProblem': 'circuit',
};

const reportTypeRename = {
    'PCProblem': 'PC Problem',
    'InternetProblem': 'Internet Problem',
    'FurnitureProblem': 'Furniture Problem',
    'CircuitProblem': 'Circuit Problem',
};

const statusColor = {
    'In Progress': 'badge-opacity-warning',
    'Completed': 'badge-opacity-success',
    'Not Started': 'badge-opacity-danger',
};

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('ul.nav > .nav-item').forEach(item => {
        // if item doesn't have an attribute of id="tech-only" then display it
        // if (item.id !== 'tech-only')
            item.style.display = 'block'
    });
    const pcResponse = await fetch(`${url}/api/report/all-pc-reports-IS`);
    const pcData = await pcResponse.json();
    const internetResponse = await fetch(`${url}/api/report/all-internet-reports-IS`);
    const internetData = await internetResponse.json();
    const furnitureResponse = await fetch(`${url}/api/report/all-furniture-reports-IS`);
    const furnitureData = await furnitureResponse.json();
    const circuitResponse = await fetch(`${url}/api/report/all-circuit-reports-IS`);
    const circuitData = await circuitResponse.json();

    const allReports = pcData.concat(internetData, furnitureData, circuitData);

    allReports.sort((a, b) => {
        return new Date(b.issueDate) - new Date(a.issueDate);
    });

    for (const report of allReports) {
        const response = await fetch(`${url}/api/user/get/${report.username}`);
        const userData = await response.json();
        if (!userData) {
            continue;
        }

        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-report-id', report._id);
        tableRow.setAttribute('data-report-type', report.reportType);
        tableRow.innerHTML = `
            <td>
                <div class="form-check form-check-flat mt-0">
                    <label class="form-check-label">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                aria-checked="false"><i
                                class="input-helper"></i></label>
                </div>
            </td>
            <td>
                <div class="d-flex ">
                    <img src="${userData.gender === 'Male' ? maleProfilePic : femaleProfilePic}" alt>
                    <div>
                        <h6>@${userData.username}
                        </h6>
                        <p>${userData.userType}
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <h6>${reportTypeRename[report.reportType]}
                </h6>
                <p>${report.problemDetail}
                </p>
            </td>
            <td>
                <button class="btn btn-info btn-rounded btn-sm">View</button>
            </td>
            <td>
                <div class="badge ${statusColor['Completed']}" style="cursor: pointer;">Completed</div>
            </td>
            <td>
                <button class="btn btn-light btn-rounded btn-sm" id="storage-btn">Remove from Storage</button>
            </td>`;
        requests.appendChild(tableRow);
        const viewButton = tableRow.querySelector('.btn-info');
        viewButton.addEventListener('click', openViewModal);
        const storageButton = tableRow.querySelector('#storage-btn');
        storageButton.addEventListener('click', removeFromStorage);
        count++;
    }

    requestCount.innerText = `You have ${count} requests`;
    
});

const openViewModal = async (event) => {
    const tableRow = event.target.closest('tr');
    if (!tableRow) return;

    // Get the report id and type from the row's attributes
    const reportId = tableRow.getAttribute('data-report-id');
    const reportType = tableRow.getAttribute('data-report-type');

    try {
        // Fetch full report details from your API
        const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/${reportId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reportData = await response.json();

        // Format the report details as HTML for the modal
        const detailsHtml = `
            <p><strong>Lab Name:</strong> ${reportData.labName}</p>
            <p><strong>Report Type:</strong> ${reportTypeRename[reportType]}</p>
            <p><strong>Issue Type:</strong> ${reportData.issueType}</p>
            <p><strong>Problem Detail:</strong> ${reportData.problemDetail}</p>
            <p><strong>Status:</strong> Completed</p>
            <p><strong>Reported By:</strong> ${reportData.username}</p>
            <p><strong>Issue Date:</strong> ${new Date(reportData.issueDate).toLocaleString()}</p>
            ${reportData.resolvedDate ? `<p><strong>Resolved Date:</strong> ${new Date(reportData.resolvedDate).toLocaleString()}</p>` : ''}
        `;

        // Use SweetAlert2 to display the report details
        Swal.fire({
            title: 'Report Details',
            html: detailsHtml,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Close',
        });
    } catch (error) {
        console.error('Error fetching report details:', error);
        Swal.fire('Error', 'Failed to fetch report details', 'error');
    }
};

const removeFromStorage = async (event) => {
    const tableRow = event.target.closest('tr');
    if (!tableRow) return;

    const reportId = tableRow.getAttribute('data-report-id');
    const reportType = tableRow.getAttribute('data-report-type');

    const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/update-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId, status: 'Completed' }),
    });
    if (response.status === 200) {
        tableRow.remove();
        count--;
        requestCount.innerText = `You have ${count} requests`;
        Swal.fire('Success', 'Report removed from storage', 'success');
    }
};