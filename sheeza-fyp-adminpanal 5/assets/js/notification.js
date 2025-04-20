import config from './config.js';

const { url, maleProfilePic, femaleProfilePic } = config;

const notificationCount = document.getElementById('notification-count');
const viewAllBtn = document.getElementById('view-all-notification-btn');
const notificationBox = document.getElementById('notification-div');
const notificationBell = document.getElementById('notification-bell');

const reportTypeHashTable = {
    'PCProblem': 'pc',
    'InternetProblem': 'internet',
    'FurnitureProblem': 'furniture',
    'CircuitProblem': 'circuit',
};

document.addEventListener('DOMContentLoaded', async () => {
    const pcResponse = await fetch(`${url}/api/report/unseen-pc-reports`);
    const pcData = await pcResponse.json();
    const internetResponse = await fetch(`${url}/api/report/unseen-internet-reports`);
    const internetData = await internetResponse.json();
    const furnitureResponse = await fetch(`${url}/api/report/unseen-furniture-reports`);
    const furnitureData = await furnitureResponse.json();
    const circuitResponse = await fetch(`${url}/api/report/unseen-circuit-reports`);
    const circuitData = await circuitResponse.json();

    const allReports = pcData.concat(internetData, furnitureData, circuitData);

    allReports.sort((a, b) => {
        return new Date(b.issueDate) - new Date(a.issueDate);
    });

    notificationCount.innerText = `You have ${allReports.length} unread notifications`;
    if (allReports.length > 0) {
        notificationBell.classList.add('count');
    }

    allReports.forEach(async (report) => {
        const response = await fetch(`${url}/api/user/get/${report.username}`);
        const userData = await response.json();
        const gender = userData.gender;
        const notification = document.createElement('a');
        notification.setAttribute('data-report-id', report._id);
        notification.setAttribute('data-report-type', report.reportType);
        notification.classList.add('dropdown-item', 'preview-item', 'py-3');
        notification.innerHTML = `
            <div class="preview-thumbnail">
                <img src="${gender === "Male" ? maleProfilePic : femaleProfilePic}" alt="image" class="img-sm profile-pic">
            </div>
            <div class="preview-item-content">
                <h6 class="preview-subject fw-normal text-dark mb-1">${report.reportType}</h6>
                <p class="fw-light small-text mb-1">@${userData.username}</p>
                <p class="fw-light small-text mb-0">${report.problemDetail}</p>
            </div>`;
        notificationBox.appendChild(notification);
    });
});

viewAllBtn.addEventListener('click', () => {
    notificationBox.childNodes.forEach(async (notification) => {
        const reportId = notification.getAttribute('data-report-id');
        const reportType = notification.getAttribute('data-report-type');
        const response = await fetch(`${url}/api/report/${reportTypeHashTable[reportType]}/mark-as-seen`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reportId }),
        });
        if (response.status === 200) {
            notification.remove();
        }
    });
    notificationCount.innerText = `You have 0 unread notifications`;
    notificationBell.classList.remove('count');
});