var known_langs;
var musical_exp;
var color_enabled = "#37904b";
var color_disabled = "#903738";

function toggle_listeners(form, on, validator){
    if(on){
        form.addEventListener("change", validator);
        // form.addEventListener("mousemove", validator);
        form.addEventListener("keyup", validator);
    }else{
        form.removeEventListener("change", validator);
        // form.removeEventListener("mousemove", validator);
        form.removeEventListener("keyup", validator);
    }

};

function allow_next(next, enable, prompt) {
    if (prompt == null) {
        prompt = "Please answer the questions above";
    }
    if (enable) {
        next.innerText = "Continue";
        next.disabled = false;
        next.style.backgroundColor = color_enabled;
    }
    if (!enable) {
        next.innerText = prompt;
        next.disabled = true;
        next.style.backgroundColor = color_disabled;
    }
};

function get_answer(questions, question) {
    return questions[question].children[1].value;
};

function update_known_langs(questions) {
    var known = [];
    for (var i = 0; i < 5; i++) {
        if (get_answer(questions, i + 1) != '') {
            known[i] = get_answer(questions, i + 1);
        } else {
            break;
        }
    }
    known_langs = known;
};

// function get_known_langs() {
//     return known_langs;
// }


// function update_musical_exp(){
//     var experiences = [];

//     musical_exp = experiences;
// }
function get_musical_exp(){
    return musical_exp;
};

function validate_contact() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    //start with next disabled
    allow_next(next, false);

    var lname = get_answer(questions, 1);
    var fname = get_answer(questions, 2);
    var phone = get_answer(questions, 3);
    var email = get_answer(questions, 4);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((lname.length == 0 || lname.length > 100)) {
        allow_next(next, false, "Enter your surname");
    } else if (fname.length == 0 || lname.length > 100) {
        allow_next(next, false, "Enter your first name");
    } else if (phone.length < 5 || phone.length > 100) {
        allow_next(next, false, "Enter a valid phone number");
    } else if (!email_regex.test(String(email).toLowerCase())) {
        allow_next(next, false, "Enter a valid email address");
    } else {
        allow_next(next, true);
    }
};

function validate_personal() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var age = get_answer(questions, 1);
    var hearing_problems = get_answer(questions, 2);
    var language_disorders = get_answer(questions, 3);
    var learning_disorders = get_answer(questions, 4);

    if (isNaN(age) || age <= 0 || age > 120) {
        allow_next(next, false, "Enter your age (0-120)");
    } else if (hearing_problems.length > 1000) {
        allow_next(next, false, "Describe any hearing problems in under 1000 characters");
    } else if (language_disorders.length > 1000) {
        allow_next(next, false, "Describe any language disorders in under 1000 characters");
    } else if (learning_disorders.length > 1000) {
        allow_next(next, false, "Describe any learning disorders in under 1000 characters");
    } else {
        allow_next(next, true);
    }
};

function validate_gender() {
    var next = document.getElementById("jspsych-gender-info-next");
    allow_next(next, false, "Select or enter your gender");

    var gender;
    if(document.getElementById("gender-female").checked){
        gender = "female";
        allow_next(next, true);
    }else if(document.getElementById("gender-male").checked){
        gender = "male";
        allow_next(next, true);
    }else if(document.getElementById("gender-other").checked && document.getElementById("gender-specified").value == ''){
        is_valid = false;
    }else if(document.getElementById("gender-other").checked){
        gender = document.getElementById("gender-specified").value;
        allow_next(next, true);
    }
};

function validate_background() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var birth_country = get_answer(questions, 1);
    var age_arrival = get_answer(questions, 2);
    var native_language = get_answer(questions, 3);
    var parent_1_lang = get_answer(questions, 4);
    var parent_2_lang = get_answer(questions, 5);


    if (birth_country.length == 0 || birth_country.length > 100) {
        allow_next(next, false, "Enter your country of birth");
    } else if (isNaN(parseInt(age_arrival)) || (age_arrival < 0 || age_arrival > 120)) {
        allow_next(next, false, "Enter your age of arrival in Canada (0-120)");
    } else if ((native_language.length < 2 || native_language.length > 50)) {
        allow_next(next, false, "Enter your native language");
    } else if ((parent_1_lang.length < 2 || parent_1_lang.length > 50)) {
        allow_next(next, false, "Enter Parent 1's native language");
    } else if (parent_2_lang.length < 2 || parent_2_lang.length > 50) {
        allow_next(next, false, "Enter Parent 2's native language");
    } else {
        allow_next(next, true);
    }
};

function validate_dominant_languages() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var dom_lang1 = get_answer(questions, 1);

    if (dom_lang1.length == 0 || dom_lang1.length > 50) {
        allow_next(next, false, "Enter at least your most dominant language");
    } else {
        update_known_langs(questions);
        allow_next(next, true);
    }
};

function validate_language_details() {
    var next = document.getElementById("jspsych-language-info-next");
    allow_next(next, false);
    var is_valid = true;
    for (var i = 0; i < 5; i++) {
        currRow = document.getElementById("lang-row-" + i);
        if (currRow == null || !is_valid) {
            break;
        }
        var age_began = currRow.children[1].children[0].value;
        var years_learned = currRow.children[2].children[0].value;
        if (isNaN(parseInt(age_began)) || (age_began < 0 || age_began > 120)) {
            allow_next(next, false, "Please enter age you began learning " + currRow.children[0].innerText);
            is_valid = false;
        } else if (isNaN(parseInt(years_learned)) || (years_learned < 0 || years_learned > 120)) {
            allow_next(next, false, "Please specify how many years you have learned " + currRow.children[0].innerText);
            is_valid = false;
        }
    }
    if (is_valid) {
        allow_next(next, true);
    }
};

function validate_musical() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var musical_instruments = get_answer(questions, 1);

    if (musical_instruments.length > 1000) {
        allow_next(next, false, "Describe any musical experience in under 1000 characters");
    } else {
        allow_next(next, true);
    }
};

function validate_musical_summary() {
    console.log("in validate");
    // var next = document.getElementById("jspsych-survey-multi-choice-next");
    // allow_next(next, false, "Please answer the questions above");

    // var is_valid = true;

    // for(var i = 0; i<3; i++){
    //     var curr_yes = document.getElementById("jspsych-survey-multi-choice-response-"+ i + "-0");
    //     var curr_no = document.getElementById("jspsych-survey-multi-choice-response-"+ i + "-1");
    //     if(!curr_yes.checked && !curr_no.checked){
    //         allow_next(next, false, "Please answer the questions above");
    //         is_valid = false;
    //     }
    // }
    // if (is_valid) {
    //     allow_next(next, true);
    // }
};