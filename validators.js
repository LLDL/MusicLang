//regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate_personal_info(){
    var next_button = document.getElementById("jspsych-survey-text-next");
    var form = document.getElementById("jspsych-content");
    next_button.disabled = true;
    var questions = form.children;
    var is_valid = true;

    lname = form.children[1].children[1].value
    fname = form.children[2].children[1].value
    age   = form.children[3].children[1].value
    phone = form.children[4].children[1].value
    email = form.children[5].children[1].value

    if(is_valid && (lname.length == 0 || lname.length > 100)){
        next_button.innerText = "Invalid surname";
        is_valid = false;
    } 
    if(is_valid && fname.length == 0 || lname.length > 100){
        next_button.innerText = "Invalid first name";
        is_valid = false;
    } 
    if(is_valid && (isNaN(age) || age <= 0 || age > 120)){
        next_button.innerText = "Invalid age";
        is_valid = false;
    }
    if(is_valid && phone.length == 0 || phone.length > 100){
        next_button.innerText = "Invalid phone number";
        is_valid = false;
    } 
    if(is_valid && !email_regex.test(String(email).toLowerCase())){
        
        next_button.innerText = "Invalid email address";
        is_valid = false;
    }
    if(is_valid){
        next_button.disabled = false;
        next_button.innerText = "Continue";
    }
}

function validate_language_info(){
    var next_button = document.getElementById("jspsych-survey-text-next");
    var form = document.getElementById("jspsych-content");
    next_button.disabled = true;
    console.log("attempting validation");
    var questions = form.children;
    var is_valid = true;
    if(is_valid){
        next_button.disabled = false;
        next_button.innerText = "Continue";
    }
}