var next_button;
var form;
var questions;
var is_valid;

function set_globals(){
    next_button = document.getElementById("jspsych-survey-text-next");
    form = document.getElementById("jspsych-content");
    questions = form.children;
    is_valid = true;
}

function allow_next(enable){
    next_button = document.getElementById("jspsych-survey-text-next");
    if(enable){
        next_button.disabled = false;
        next_button.style.backgroundColor = "#37904b";
        next_button.innerText = "Continue";
    }
    if(!enable){
        next_button.disabled = false;  
        next_button.style.backgroundColor = "#903738";
        next_button.innerText = "Please answer all the questions above";
    }
}

function validate_contact_info(){
    set_globals();
    allow_next(false);

    lname = form.children[1].children[1].value;
    fname = form.children[2].children[1].value;
    phone = form.children[3].children[1].value;
    email = form.children[4].children[1].value;

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(is_valid && (lname.length == 0 || lname.length > 100)){
        next_button.innerText = "Invalid surname";
        is_valid = false;
    } 
    if(is_valid && fname.length == 0 || lname.length > 100){
        next_button.innerText = "Invalid first name";
        is_valid = false;
    }
    if(is_valid && phone.length < 5 || phone.length > 100){
        next_button.innerText = "Invalid phone number";
        is_valid = false;
    } 
    if(is_valid && !email_regex.test(String(email).toLowerCase())){
        
        next_button.innerText = "Invalid email address";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }    
}

function validate_personal_info(){
    set_globals();
    allow_next(false);

    age = form.children[1].children[1].value;
    gender = form.children[2].children[1].value;
    birth_country = form.children[3].children[1].value;
    hearing_problems = form.children[4].children[1].value;
    language_disorders = form.children[5].children[1].value;
    learning_disorders = form.children[6].children[1].value;

    if(is_valid && (isNaN(age) || age <= 0 || age > 120)){
        next_button.innerText = "Invalid age";
        is_valid = false;
    }
    if(is_valid && (gender.length == 0 || gender.length > 20)){
        next_button.innerText = "Invalid gender";
        is_valid = false;
    }
    if(is_valid && (birth_country.length < 2 || birth_country.length > 50)){
        next_button.innerText = "Invalid birth country";
        is_valid = false;
    }    
    if(is_valid && (hearing_problems.length == 0 || hearing_problems.length > 1000)){
        next_button.innerText = "Please enter any hearing problems you have or n/a";
        is_valid = false;
    }
    if(is_valid && (language_disorders.length == 0 || language_disorders.length > 1000)){
        next_button.innerText = "Please enter any language disorders you have or n/a";
        is_valid = false;
    }
    if(is_valid && (learning_disorders.length == 0 || learning_disorders.length > 1000)){
        next_button.innerText = "Please enter any learning disorders you have or n/a";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}

function validate_background_info(){
    set_globals();
    allow_next(false);
    age_arrival = form.children[1].children[1].value;
    native_language = form.children[2].children[1].value;
    parent_1_lang = form.children[3].children[1].value;
    parent_2_lang = form.children[4].children[1].value;
    
    if(is_valid && (isNaN(age) || age < 0 || age > 120)){
        next_button.innerText = "Invalid age of arrival in Canada";
        is_valid = false;
    }
    if(is_valid && (native_language.length < 2 || native_language.length > 50)){
        next_button.innerText = "Invalid native language";
        is_valid = false;
    }
    if(is_valid && (parent_1_lang.length < 2 || parent_1_lang.length > 50)){
        next_button.innerText = "Invalid parent 1's native language";
        is_valid = false;
    }
    if(is_valid && (parent_2_lang.length < 2 || parent_2_lang.length > 50)){
        next_button.innerText = "Invalid parent 2's native language";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}
function validate_language_info(){
    set_globals();
    allow_next(false);
    
    dom_lang1 = form.children[1].children[1].value;

    if (dom_lang1.length < 2 || dom_lang1.length > 50){
        next_button.innerText = "Please enter at least your most dominant language";
        is_valid = false;
    }



    if(is_valid){
        allow_next(true);
    }
}

function validate_language_detailed_info(){
    set_globals();
    allow_next(false);
    if(is_valid){
        allow_next(true);
    }
}
function validate_musical_info(){
    set_globals();
    allow_next(false);

    musical_instruments = form.children[1].children[1].value;

    if(is_valid && (musical_instruments.length == 0 || musical_instruments.length > 1000)){
        next_button.innerText = "Please enter your musical experience or n/a";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}