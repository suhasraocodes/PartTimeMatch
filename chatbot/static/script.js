// script.js

function sendMessage() {
    var userMessage = document.getElementById("user-input").value;
    document.getElementById("chat-box").innerHTML += `<div>User: ${userMessage}</div>`;
    
    // Make an AJAX request to the server (calling the Python script)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var responseObj = JSON.parse(xhr.responseText);
            var botResponse = responseObj.botResponse;
            document.getElementById("chat-box").innerHTML += `<div>Assistant: ${botResponse}</div>`;
            document.getElementById("user-input").value = "";
        }
    };
    xhr.open("POST", "http://localhost:5000/chat", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`userInput=${userMessage}`);
}
