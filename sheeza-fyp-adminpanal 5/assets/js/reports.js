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

const unseenReports = [];

document.addEventListener('DOMContentLoaded', async () => {
    const pcResponse = await fetch(`${url}/api/report/all-pc-reports`);
    const pcData = await pcResponse.json();
    const internetResponse = await fetch(`${url}/api/report/all-internet-reports`);
    const internetData = await internetResponse.json();
    const furnitureResponse = await fetch(`${url}/api/report/all-furniture-reports`);
    const furnitureData = await furnitureResponse.json();
    const circuitResponse = await fetch(`${url}/api/report/all-circuit-reports`);
    const circuitData = await circuitResponse.json();

    const allReports = pcData.concat(internetData, furnitureData, circuitData);

    allReports.sort((a, b) => {
        return new Date(b.issueDate) - new Date(a.issueDate);
    });

    // removing all reports with status: "In Storage"
    for (let i = 0; i < allReports.length; i++) {
        if (allReports[i].status === 'In Storage') {
            allReports.splice(i, 1);
            i--;
        }
    }

    for (const report of allReports) {
        const response = await fetch(`${url}/api/user/get/${report.username}`);
        const userData = await response.json();
        if (!userData) {
            continue;
        }
        if (report.isSeen === false) {
            unseenReports.push(report);
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
                <div class="badge ${statusColor[report.status]}" style="cursor: pointer;">${report.status}</div>
            </td>
            <td>
                <button class="btn btn-light btn-rounded btn-sm" id="storage-btn">Move to Storage</button>
            </td>`;
        requests.appendChild(tableRow);
        const statusDiv = tableRow.querySelector('.badge');
        statusDiv.addEventListener('click', statusUpdate);
        const checkBox = tableRow.querySelector('.form-check');
        checkBox.addEventListener('click', markAsCompleted);
        const viewButton = tableRow.querySelector('.btn-info');
        viewButton.addEventListener('click', openViewModal);
        const storageButton = tableRow.querySelector('#storage-btn');
        storageButton.addEventListener('click', moveToStorage);
        if (report.status != 'Completed') {
            storageButton.style.display = 'none';
        }
        count++;
    }
    
    unseenReports.forEach(async (report) => {
        const response = await fetch(`${url}/api/report/${reportTypeHashTable[report.reportType]}/mark-as-seen`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reportId: report._id }),
        });
    });

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
            <p><strong>Status:</strong> ${reportData.status}</p>
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

const moveToStorage = async (event) => {
    const tableRow = event.target.closest('tr');
    if (!tableRow) return;

    const reportId = tableRow.getAttribute('data-report-id');
    const reportType = tableRow.getAttribute('data-report-type');

    const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/move-to-storage`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId }),
    });
    if (response.status === 200) {
        tableRow.remove();
        count--;
        requestCount.innerText = `You have ${count} requests`;
        Swal.fire('Success', 'Report moved to storage', 'success');
    }
};

const statusUpdate = async (event) => {
    const reportId = event.target.parentElement.parentElement.getAttribute('data-report-id');
    const reportType = event.target.parentElement.parentElement.getAttribute('data-report-type');
    const storageButton = event.target.parentElement.parentElement.querySelector('#storage-btn');
    const newStatus = event.target.innerText === 'Not Started' ? 'In Progress' : 'Not Started';
    const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/update-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId, status: newStatus }),
    });
    if (response.status === 200) {
        event.target.classList.remove(statusColor[event.target.innerText]);
        event.target.innerText = event.target.innerText === 'Not Started' ? 'In Progress' : 'Not Started';
        event.target.classList.add(statusColor[event.target.innerText]);
        storageButton.style.display = 'none';
    }
}

const markAsCompleted = async (event) => {
    const tableRow = event.target.closest('tr');
    if (!tableRow) return;

    const reportId = tableRow.getAttribute('data-report-id');
    const reportType = tableRow.getAttribute('data-report-type');

    const status = tableRow.querySelector('.badge');
    const storageButton = tableRow.querySelector('#storage-btn');

    if (status.innerText === 'Not Started')
        return;

    const newStatus = status.innerText === 'Completed' ? 'In Progress' : 'Completed';
    const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/update-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId, status: newStatus }),
    });
    if (response.status === 200) {
        status.classList.remove(statusColor[status.innerText]);
        status.innerText = status.innerText === 'Completed' ? 'In Progress' : 'Completed';
        status.classList.add(statusColor[status.innerText]);
        if (status.innerText === 'Completed') {
            storageButton.style.display = 'block';
        } else {
            storageButton.style.display = 'none';
        }
    }
}