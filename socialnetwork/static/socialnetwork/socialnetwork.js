"use strict"

// Sends a new request to update the posts 
function getList() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return
        updatePage(xhr)
    }

    xhr.open("GET", "/socialnetwork/get-global", true)
    xhr.send()
}

function updatePage(xhr) {
    // figure out what the response is here and check if thats the response from views.py 
    if (xhr.status == 200) {
        let response = JSON.parse(xhr.responseText)
        updateList(response)
        return
    }

    if (xhr.status == 0) {
        displayError("Cannot connect to server")
        return
    }


    if (!xhr.getResponseHeader('content-type') == 'application/json') {
        displayError("Received status=" + xhr.status)
        return
    }

    let response = JSON.parse(xhr.responseText)
    if (response.hasOwnProperty('error')) {
        displayError(response.error)
        return
    }

    displayError(response)
}

function displayError(message) {
    let errorElement = document.getElementById("error")
    errorElement.innerHTML = message
}

// check on first line of inner code, "post-list" might need to be something else 
function updateList(items) {
    // think of how to get the post id and format the string 
    let list = document.getElementById("my-comments-go-here-for-post-post.id")

    // Removes the old post list items  
    while (list.hasChildNodes()) {
         list.removeChild(list.firstChild)
    }

    // Adds each new todo-list item to the list
    for (let i = 0; i < items.length; i++) {
        
        let item = items[i]
        let element = document.createElement("li")
        // think how to format this span class 
        element.innerHTML = 
                            sanitize(item.text) +
                            ' <span class="details">' +
                            "(id=" + item.id + ", user=" + item.user + ")" +
                            '</span>'

        // Adds the todo-list item to the HTML list
        list.appendChild(element)
    }
}

function sanitize(s) {
    // Be sure to replace ampersand first
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
}

// not sure about "item" in the first line of inner code -> comment? 
function addItem() {
    // send over from html the post id as a parameter 
    // figure out how to format a string in javascript so that itemTextElement is equal to id of input 
    let itemTextElement = document.getElementById("id_comment_' + post.id + '")
    console.log(itemTextElement);
    let itemTextValue   = itemTextElement.value

    // Clear input box and old error message (if any)
    itemTextElement.value = ''
    displayError('')

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return
        updatePage(xhr)
    }
    // check if addItemUrl is correct 
    // what do you want to send to views.py -> request header + data 
    console.log(addItemURL);
    xhr.open("POST", addItemURL, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("comment="+itemTextValue+"&csrfmiddlewaretoken="+getCSRFToken());
}

function getCSRFToken() {
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim()
        if (c.startsWith("csrftoken=")) {
            return c.substring("csrftoken=".length, c.length)
        }
    }
    return "unknown"
}