var next_button;
var questions;
var is_valid;
var langs;

function find_next_button(){
    next_button = document.getElementById("jspsych-survey-text-next");
    if(next_button == null){
        next_button = document.getElementById("jspsych-language-info-next");
    }
}
function set_globals(){
    find_next_button();
    questions = document.getElementById("jspsych-content").children;
    is_valid = true;
}

function allow_next(enable, text_on_false = "Please answer the questions above"){
    find_next_button();
    if(enable){
        next_button.disabled = false;
        next_button.style.backgroundColor = "#37904b";
        next_button.innerText = "Continue";
    }
    if(!enable){
        next_button.disabled = true;  
        next_button.style.backgroundColor = "#903738";
        next_button.innerText = text_on_false;
        is_valid = false;
    }
}

function get_answer(question){
    return questions[question].children[1].value;
}

function update_known_langs(){
    var known = [];
    for(var i = 0; i<4; i++){
        if(get_answer(i+1) != ''){
            known[i] = get_answer(i+1);
        }else{
            break;
        }
    }
    langs = known;
}
function get_known_langs(){
    return langs;
}
function validate_contact(){
    set_globals();
    allow_next(false);
    is_valid = true;

    var lname = get_answer(1);
    var fname = get_answer(2);
    var phone = get_answer(3);
    var email = get_answer(4);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(is_valid && (lname.length == 0 || lname.length > 100)){
        allow_next(false, "Enter your surname");
    } 
    if(is_valid && fname.length == 0 || lname.length > 100){
        allow_next(false, "Enter your first name");
    }
    if(is_valid && phone.length < 5 || phone.length > 100){
        allow_next(false, "Enter a valid phone number");
    } 
    if(is_valid && !email_regex.test(String(email).toLowerCase())){
        allow_next(false, "Enter a valid email address");
    }
    if(is_valid){
        allow_next(true);
    }    
}

function validate_personal_info(){
    set_globals();
    allow_next(false);
    is_valid = true;

    var age = get_answer(1);
    var gender = get_answer(2);
    var hearing_problems = get_answer(3);
    var language_disorders = get_answer(4);
    var learning_disorders = get_answer(5);

    if(is_valid && (isNaN(age) || age <= 0 || age > 120)){
        allow_next(false, "Enter your age (0-120)");
    }
    if(is_valid && (gender.length == 0 || gender.length > 100)){
        allow_next(false, "Enter your gender");
    }
    if(is_valid && (hearing_problems.length > 1000)){
        allow_next(false, "Describe any hearing problems in under 1000 characters");
    }
    if(is_valid && (language_disorders.length > 1000)){
        allow_next(false, "Describe any language disorders in under 1000 characters");
    }
    if(is_valid && (learning_disorders.length > 1000)){
        allow_next(false, "Describe any learning disorders in under 1000 characters");
    }
    if(is_valid){
        allow_next(true);
    }
}

function validate_background_info(){
    set_globals();
    allow_next(false);
    is_valid = true;

    var birth_country = get_answer(1);
    var age_arrival = get_answer(2);
    var native_language = get_answer(3);
    var parent_1_lang = get_answer(4);
    var parent_2_lang = get_answer(5);
    
    
    if(is_valid && (birth_country.length == 0 || birth_country.length > 100)){
        allow_next(false, "Enter your country of birth");
    }    
    if(is_valid && (isNaN(parseInt(age_arrival)) || ( age_arrival < 0 || age_arrival > 120))){
        allow_next(false, "Enter your age of arrival in Canada (0-120)");
    }
    if(is_valid && (native_language.length < 2 || native_language.length > 50)){
        allow_next(false, "Enter your native language");
    }
    if(is_valid && (parent_1_lang.length < 2 || parent_1_lang.length > 50)){
        allow_next(false, "Enter Parent 1's native language");
    }
    if(is_valid && (parent_2_lang.length < 2 || parent_2_lang.length > 50)){
        allow_next(false, "Enter Parent 2's native language");
    }
    if(is_valid){
        allow_next(true);
    }
}
function validate_dominant_languages(){
    set_globals();
    allow_next(false);
    is_valid = true;
    
    var dom_lang1 = get_answer(1);

    if (dom_lang1.length == 0 || dom_lang1.length > 50){
        allow_next(false, "Enter at least your most dominant language");
    }

    if(is_valid){
        update_known_langs();
        allow_next(true);
    }
}

function validate_language_details(){
    set_globals();
    allow_next(false);
    is_valid = true;

    if(is_valid){
        allow_next(true);
    }
}
function validate_musical_info(){
    set_globals();
    allow_next(false);
    is_valid = true;

    var musical_instruments = get_answer(1);

    if(is_valid && (musical_instruments.length > 1000)){
        allow_next(false, "Describe any musical experience in under 1000 characters");
    }
    if(is_valid){
        allow_next(true);
    }
}