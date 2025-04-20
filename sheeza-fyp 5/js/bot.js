// document.addEventListener("DOMContentLoaded", function() {

//     //Set chatbot interface
//     var count = 0,
//         interval;
//     setTimeout(function() { $(".chat_animate figure img").removeClass("up_down").addClass("rotate"); }, 5000);
//     setTimeout(function() { $(".chat_animate figure img").css("opacity", "0.1"); }, 1500);
//     setTimeout(function() { $(".chat_animate figure").remove(); }, 3000);
//     setTimeout(function() {
//         $(".chat_animate").html('<div class="chat_bot"><h2 class="title"><aside><iconify-icon icon="streamline:ai-edit-spark"></iconify-icon> AI Assistance</aside><iconify-icon icon="ci:arrow-reload-02"></iconify-icon></h2><ul class="mssg_content"></ul><fieldset><input type="text" class="cmt" oninput = "typing_animate()" placeholder="Send a message" name="comment" /><iconify-icon icon="radix-icons:paper-plane" onclick="trigger_mssg()"></iconify-icon></fieldset></div>');
//         $(".chat_bot").fadeTo(1000, 1);
//         interval = setInterval(function() {
//             count++;
//             message_content();
//         }, 1000);
//     }, 2200);

//     //Set message content
//     function message_content() {
//         var mssg, classname;
//         switch (count) {
//             case 1:
//                 $(".mssg_content").append('<li class="typing"><span></span><span></span><span></span></li>');
//                 setTimeout(function() { mssg = '<li class="mssg bot_mssg bubble_anim"><iconify-icon icon="logos:geekbot"></iconify-icon><h5>Hello! How can I help you?</h5> </li>'; }, 1000);
//                 break;
//             case 2:
//                 $(".mssg_content").append('<li class="typing typing_right"><span></span><span></span><span></span></li>');
//                 setTimeout(function() { mssg = '<li class="mssg usr_mssg bubble_anim"><iconify-icon icon="mingcute:user-4-fill"></iconify-icon><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></li>'; }, 1000);
//                 break;
//             case 3:
//                 $(".mssg_content").next("fieldset").css("pointer-events", "auto");
//                 $(".mssg_content").next("fieldset").children("iconify-icon").css("pointer-events", "auto");
//                 count = 0;
//                 clearInterval(interval);
//                 break;
//         }
//         setTimeout(function() { append_mssg(mssg); }, 1000);
//     }
// });

// //Typing animation 
// function typing_animate() {
//     if (!$(".typing").length > 0) {
//         $(".mssg_content").append('<li class="typing typing_right"><span></span><span></span><span></span></li>');
//         $('.mssg_content').scrollTop($('.mssg_content')[0].scrollHeight);
//     } else {
//         if ($(".cmt").val().length === 0) { $(".typing").remove(); }
//     }
// }

// //Trigger user input message to append
// function trigger_mssg() {
//     $(".mssg_content").next("fieldset").css("pointer-events", "none");
//     $(".mssg_content").next("fieldset").children("iconify-icon").css("pointer-events", "none");
//     if ($(".cmt").val() != "") {
//         append_mssg('<li class="mssg usr_mssg bubble_anim"><iconify-icon icon="mingcute:user-4-fill"></iconify-icon><p>' + $(".cmt").val() + '</p></li>');
//         setTimeout(function() {
//             $(".mssg_content").append('<li class="bot_alert"><h5>This is just a demo version</h5></li>');
//             $('.mssg_content').scrollTop($('.mssg_content')[0].scrollHeight);
//             $(".mssg_content").next("fieldset").css("pointer-events", "auto");
//             $(".mssg_content").next("fieldset").children("iconify-icon").css("pointer-events", "auto");
//         }, 1000);
//     }
// }

// //Append message
// function append_mssg(mssg) {
//     $(".typing").remove();
//     $(".mssg_content").append(mssg);
//     $('.mssg_content').scrollTop($('.mssg_content')[0].scrollHeight);
// }

document.addEventListener("DOMContentLoaded", function() {
    var count = 0, interval;
    
    setTimeout(function() { $(".chat_animate figure img").removeClass("up_down").addClass("rotate"); }, 5000);
    setTimeout(function() { $(".chat_animate figure img").css("opacity", "0.1"); }, 1500);
    setTimeout(function() { $(".chat_animate figure").remove(); }, 3000);
    setTimeout(function() {
        $(".chat_animate").html('<div class="chat_bot"><h2 class="title"><aside><iconify-icon icon="streamline:ai-edit-spark"></iconify-icon> AI Assistance</aside><iconify-icon icon="ci:arrow-reload-02"></iconify-icon></h2><ul class="mssg_content"></ul><fieldset><input type="text" class="cmt" oninput="typing_animate()" placeholder="Send a message" name="comment" /><iconify-icon icon="radix-icons:paper-plane" onclick="trigger_mssg()"></iconify-icon></fieldset></div>');
        $(".chat_bot").fadeTo(1000, 1);
        interval = setInterval(function() {
            count++;
            message_content();
        }, 1000);
    }, 2200);

    function message_content() {
        var mssg;
        switch (count) {
            case 1:
                $(".mssg_content").append('<li class="typing"><span></span><span></span><span></span></li>');
                setTimeout(function() { 
                    mssg = '<li class="mssg bot_mssg bubble_anim"><iconify-icon icon="logos:geekbot"></iconify-icon><h5>Hello! How can I help you?</h5></li>'; 
                    append_mssg(mssg);
                }, 1000);
                break;
            case 3:
                $(".mssg_content").next("fieldset").css("pointer-events", "auto");
                $(".mssg_content").next("fieldset").children("iconify-icon").css("pointer-events", "auto");
                count = 0;
                clearInterval(interval);
                break;
        }
    }
});

// Typing animation 
function typing_animate() {
    if (!$(".typing").length > 0) {
        $(".mssg_content").append('<li class="typing typing_right"><span></span><span></span><span></span></li>');
        $('.mssg_content').scrollTop($('.mssg_content')[0].scrollHeight);
    } else {
        if ($(".cmt").val().length === 0) { $(".typing").remove(); }
    }
}

// Trigger user input message to append
function trigger_mssg() {
    var userMessage = $(".cmt").val().trim();
    if (userMessage !== "") {
        append_mssg('<li class="mssg usr_mssg bubble_anim"><iconify-icon icon="mingcute:user-4-fill"></iconify-icon><p>' + userMessage + '</p></li>');
        $(".cmt").val("");
        
        // Fetch AI Response
        getAIResponse(userMessage);
    }
}

// Append message
function append_mssg(mssg) {
    $(".typing").remove();
    $(".mssg_content").append(mssg);
    $('.mssg_content').scrollTop($('.mssg_content')[0].scrollHeight);
}

const dataString = `
You are an AI assistant for LabEase, a system that helps users report and resolve issues related to lab equipment.

LabEase Overview:
- LabEase allows students and lab staff to log in and report issues related to PCs, furniture, circuits, or internet problems in labs.
- Lab engineers receive and resolve these reports.
- The system logs timestamps for issue reporting and resolution.
- A monthly report summarizes all problems, resolution times, and assigned engineers.

User FAQs:
Q: How do I report an issue?
A: Log in to LabEase, select a problem category (PC, Internet, Furniture, Circuit), and provide a detailed description. The technician will be notified.

Q: Who resolves reported issues?
A: Lab engineers are responsible for resolving issues reported on the platform.

Q: How long does it take to resolve an issue?
A: The resolution time depends on the issue type and past trends. Simple issues may be resolved within a few hours, while complex ones may take longer.

Q: How do I reset my password?
A: Students cannot reset their passwords themselves. They must contact the admin, who will manually change it.

Q: What happens after I report a problem?
A: The technician receives a notification with your issue details and updates the report status as 'In Progress,' 'Pending,' or 'Completed.'

Q: How do I provide feedback about the website or an unresolved issue?
A: You can submit feedback through the homepage. This feedback is sent directly to the admin (Shakeel Ahmed).

Admin & Technician Features:
- The admin can manage students, labs, PCs, and technicians using CRUD operations.
- The Reports Status section shows active issues, their keywords, and assigned technicians.
- Once an issue is resolved, it can be moved to 'Storage' for record-keeping.

Dashboard Insights:
- A line chart shows the 8 labs with the highest number of reported issues last month.
- A bar chart shows which issue type (PC, Internet, Circuit, Furniture) had the most reports last month.

Lab & PC Management:
- Admins can add, delete, and edit records for labs, PCs, and technicians.
- Clicking on a report lets admins view details like lab name, PC number, and issue description.

Additional Notes:
- Only the admin (Shakeel Ahmed) has full access to the admin panel.
- Students and technicians can only access specific sections relevant to their roles.
`;

async function getAIResponse(userMessage) {
    $(".mssg_content").append('<li class="typing"><span></span><span></span><span></span></li>');

    const apiKey = "AIzaSyBnBF2OfffUKfVKPxAS9CrA6ZgI4yB8Gow"; // Replace with your Google Gemini API Key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = JSON.stringify({
        contents: [{
            parts: [{ text: `${dataString} \n\nUser: ${userMessage}\nAI:` }]
        }]
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody
        });

        const data = await response.json();

        // Extract AI-generated message
        const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, but I couldn't generate a response.";

        $(".typing").remove();
        append_mssg('<li class="mssg bot_mssg bubble_anim"><iconify-icon icon="logos:geekbot"></iconify-icon><h5>' + aiMessage + '</h5></li>');
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        $(".typing").remove();
        append_mssg('<li class="mssg bot_mssg bubble_anim"><iconify-icon icon="logos:geekbot"></iconify-icon><h5>Sorry, I couldn\'t process your request.</h5></li>');
    }
}

//