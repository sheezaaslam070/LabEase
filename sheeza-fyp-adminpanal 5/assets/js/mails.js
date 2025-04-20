import config from "./config.js";

const {url, maleProfilePic, femaleProfilePic} = config;

const emailCount = document.getElementById("email-count");
const viewAllBtn = document.getElementById("view-all-btn");
const mails = document.getElementById("mails");
const mailBell = document.getElementById("mail-bell");

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(`${url}/api/message/get-unseen`);
    const data = await response.json();
    emailCount.innerText = `You have ${data.length} unread mails`;
    if (data.length > 0) {
        mailBell.classList.add("count");
    }
    data.forEach(async (message) => {
        const response = await fetch(
            `${url}/api/user/get/${message.senderUsername}`);
        const userData = await response.json();
        const gender = userData.gender;
        const mail = document.createElement("a");
        mail.setAttribute("data-message-id", message._id);
        mail.classList.add("dropdown-item", "preview-item");
        mail.innerHTML = `
                    <div class="preview-thumbnail">
                        <img src="${gender === "Male" ? maleProfilePic : femaleProfilePic}" alt="image" class="img-sm profile-pic">
                    </div>
                    <div class="preview-item-content flex-grow py-2">
                        <p class="preview-subject ellipsis fw-medium text-dark">${message.senderName} </p>
                        <p class="fw-light small-text mb-0">${message.message}...</p>
                    </div>`;
        mails.appendChild(mail);
    });
});

viewAllBtn.addEventListener("click", () => {
    mails.childNodes.forEach(async (mail) => {
        const messageId = mail.getAttribute("data-message-id");
        const response = await fetch(`${url}/api/message/mark-as-seen`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messageId }),
        });
        if (response.status === 200) {
            mail.remove();
        }
    });
    emailCount.innerText = `You have 0 unread mails`;
    mailBell.classList.remove("count");
});
