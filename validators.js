var known_langs;
var musical_exp;
var lang_exp;
// var known_member;
// var known_members;
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
    if (enable && next !== null) {
        next.innerText = "Continue";
        next.disabled = false;
        next.style.backgroundColor = color_enabled;
    }
    if (!enable && next !== null) {
        next.innerText = prompt;
        next.disabled = true;
        next.style.backgroundColor = color_disabled;
    }
};

function get_answer(questions, question) {
    return questions[question].children[1].value;
};


// LangDev General Questionnaire //

function validate_confirmation() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
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

function get_known_langs() {
    return known_langs;
}


function update_musical_exp(){
    var yes = document.getElementById("survey-yes-no-response-0-0").checked;
    var no = document.getElementById("survey-yes-no-response-0-1").checked;
    if(yes){
        musical_exp = true;
    }else{
        musical_exp = false;
    }
    //console.log(musical_exp);
}
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

function validate_future() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
}
function validate_personal() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var age = get_answer(questions, 1);
    var problems = get_answer(questions, 2);

    if (isNaN(age) || age <= 0 || age > 120) {
        allow_next(next, false, "Enter your age (0-120)");
    } else if (problems.length > 1000) {
        allow_next(next, false, "Describe any hearing problems, learning disorders, and language disorders in under 1000 characters");
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
        allow_next(next, false, "Enter Parent/Guardian 1's native language");
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


function validate_musical_summary() {
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please answer the question above");

    var is_valid = true;

    var yes = document.getElementById("survey-yes-no-response-0-0");
    var no = document.getElementById("survey-yes-no-response-0-1");

    if(!yes.checked && !no.checked){
        allow_next(next, false, "Please answer the questions above");
        is_valid = false;
    }
    if (is_valid) {
        update_musical_exp();
        allow_next(next, true);
    }
};

function validate_musical_detail(){
    var next = document.getElementById("music-info-next");
    allow_next(next, true);

    if(musical_exp){
        for(var row_index = 0; row_index<5; row_index++){
            curr_row_els = document.getElementById('music-info-row-' + row_index).childNodes;

            var desc = curr_row_els[0].childNodes[0].value;
            var age = curr_row_els[1].childNodes[0].value;
            var years = curr_row_els[2].childNodes[0].value;
            var inst = curr_row_els[3].childNodes[0].value;

            //first row of table must be filled in
            if(row_index == 0 && (desc == '' || age == '' || years == '' || inst == '')){
                allow_next(next, false, "Please describe at least one musical experience.");
            }
            //if user has filled in age/years/inst without a description
            if(desc == '' && (age != '' || years != '' || inst != '')){
                allow_next(next, false, "Please complete row " + (row_index + 1));

            }
            //if user has inputted a description for the row, validate
            if( desc != '' && (
                    (desc.length > 100) ||
                    (age.length == 0 || isNaN(age) || age < 0 || age > 120) ||
                    (years.length == 0 || isNaN(years) || years < 0 || years > 120) ||
                    (inst.length == 0 || inst.length > 100)
                )){

                allow_next(next, false, "Please complete row " + (row_index + 1));
            }
        }
    }
}

// MODIFIED FOR MCDI: subject, sentences //

function validate_subject() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var subject = get_answer(questions, 1);

    if (subject.length == 0 || subject.length > 1000) {
        allow_next(next, false, "Please enter your subject ID.");
    } else {
        allow_next(next, true);
    }
};

function validate_sentences() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var sen1 = get_answer(questions, 1);
    var sen2 = get_answer(questions, 2);
    var sen3 = get_answer(questions, 3);

    if (sen1.length == 0 || sen1.length > 1000) {
        allow_next(next, false, "Please enter the longest sentence you've heard your child say.");
    } else if (sen2.length == 0 || sen2.length > 1000) {
        allow_next(next, false, "Please enter the 2nd longest sentence you've heard your child say.");
    } else if (sen3.length == 0 || sen3.length > 1000) {
        allow_next(next, false, "Please enter the 3rd longest sentence you've heard your child say.");
    } else {
        allow_next(next, true);
    }
};

// MODIFIED FOR CROWDSOURCING QRE: idnumber, surveyq //

function validate_idnumber() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var idnumber = get_answer(questions, 1);

    if (idnumber.length > 1000) {
        allow_next(next, false, "Please enter your Prolific ID here.");
    } else {
        allow_next(next, true);
    }
};

function validate_surveyq() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var surveyq = get_answer(questions, 1);

    if (surveyq.length > 1000) {
        allow_next(next, false, "Please type in your answer.");
    } else {
        allow_next(next, true);
    }
};

// MODIFIED FOR CONASSIM BACKGROUND Q'S: USA, state //

function validate_USA() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
}

function validate_state() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);


    var state = get_answer(questions, 1);

    if (state.length > 1000) {
        allow_next(next, false, "Please enter the state or territory you were born in.");
    } else {
        allow_next(next, true);
    }
};

// MODIFIED FOR RPS //

function validate_rps() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    //start with next disabled
    allow_next(next, false);

    var lname = get_answer(questions, 1);
    var snum = get_answer(questions, 2);
    var course = get_answer(questions, 3);
    var semyear = get_answer(questions, 4);
    var instructor = get_answer(questions, 5);
    var notes = get_answer(questions, 6);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((lname.length == 0 || lname.length > 100)) {
        allow_next(next, false, "Enter your full name");
    } else if (snum.length < 9 || snum.length > 100) {
        allow_next(next, false, "Enter your student number");
    } else if (course.length == 0 || course.length > 100) {
        allow_next(next, false, "Enter the course name and number");
    } else if (semyear.length == 0 || semyear.length > 100) {
        allow_next(next, false, "Enter the semester and year");
    } else if (instructor.length == 0 || instructor.length > 100) {
          allow_next(next, false, "Enter the instructor name");
    } else {
        allow_next(next, true);
    }
};

function validate_cash_rps() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
};


//Functions for questionnaire to reflect on LangDev's L2-IDS parent registration questions
//include: parentinfo, childinfo, gestation_period, gender, language_exposure, problems

function validate_parentinfo() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    //start with next disabled
    allow_next(next, false);

    var parentnames = get_answer(questions, 1);
    var address = get_answer(questions, 2);
    var phone = get_answer(questions, 3);
    var email = get_answer(questions, 4);
    var addcontact = get_answer(questions, 5);
    var preference = get_answer(questions, 6);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((parentnames.length == 0 || parentnames.length > 100)) {
        allow_next(next, false, "Enter parent names");
    }
    else if (address.length == 0 || address.length > 100) {
        allow_next(next, false, "Enter your mailing address");
    }
    else if (phone.length < 5 || phone.length > 100) {
        allow_next(next, false, "Enter a valid phone number");
    }
    else if (!email_regex.test(String(email).toLowerCase())) {
        allow_next(next, false, "Enter a valid email address");
    }
    else if (addcontact.length == 0 || addcontact.length > 100) {
        allow_next(next, false, "Enter your additional contact information");
    }
    else if (preference.length == 0 || preference.length > 100) {
        allow_next(next, false, "Enter your preferred communication");
    }
    else {
        allow_next(next, true);
    }
};

function validate_childinfo() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var childname = get_answer(questions, 1);
    var childbirthdate = get_answer(questions, 2);
    var problems = get_answer(questions, 3);

    if ((childname.length == 0 || childname.length > 100)) {
        allow_next(next, false, "Enter your child's name");
    }
    else if (childbirthdate.length == 0 || childbirthdate.length > 100) {
        allow_next(next, false, "Enter your child's birthdate");
    }
    else if (problems.length == 0 || problems.length > 1000) {
        allow_next(next, false, "Describe any problems in under 1000 characters");
    }
    else {
        allow_next(next, true);
    }
};

function validate_born_before_due() {
  var answers = document.getElementsByClassName("survey-yes-no-response");
  var next = document.getElementById("survey-yes-no-next");
  allow_next(next, false, "Please select yes or no");

  if(answers[0].checked || answers[1].checked){
      allow_next(next, true);
  }
};

function validate_gestation_period() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var ifyes = get_answer(questions, 1);

    if ((ifyes.length == 0 || ifyes.length > 100)) {
        allow_next(next, false, "Specify the gestation period if you answered yes");
    }
    else {
        allow_next(next, true);
    }
};

function validate_language_exposure() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var langexposure = get_answer(questions, 1);

    if (langexposure.length == 0 || langexposure.length > 100) {
        allow_next(next, false, "Enter the languages that your child is exposed to");
    } else {
        allow_next(next, true);
    }
};

function validate_problems() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var problems = get_answer(questions, 1);

    if (problems.length == 0 || problems.length > 100) {
        allow_next(next, false, "Specify any problems your child has");
    } else {
        allow_next(next, true);
    }
};

// Modified for Community Parent Questionnaire: 3 sections in total //
// PARENT QUESTIONNAIRE: SECTION 1: imageuse, contactfut, contactinfo, childreninfo, languageexposure //
function validate_imageuse() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
};

function validate_contactfut() {
    var answers = document.getElementsByClassName("survey-yes-no-response");
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Please select yes or no");

    if(answers[0].checked || answers[1].checked){
        allow_next(next, true);
    }
};

function validate_contactinfo() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    //start with next disabled
    allow_next(next, false);

    var parentcaregiver = get_answer(questions, 1);
    var telephone = get_answer(questions, 2);
    var email = get_answer(questions, 3);
    var notes = get_answer(questions, 4);
    var contact = get_answer(questions, 5);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((parentcaregiver.length == 0 || parentcaregiver.length > 100)) {
        allow_next(next, false, "Enter names of parent/caregivers");
    } else if (telephone.length < 9 || telephone.length > 100) {
        allow_next(next, false, "Enter a valid phone number");
    } else if (!email_regex.test(String(email).toLowerCase())) {
        allow_next(next, false, "Enter a valid email address");
    } else if (notes.length == 0 || notes.length > 100) {
        allow_next(next, false, "Enter any additional contact information");
    } else if (contact.length == 0 || contact.length > 100) {
          allow_next(next, false, "Enter how you would like to be contacted");
    } else {
        allow_next(next, true);
    }
};

function validate_childreninfo() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var childname = get_answer(questions, 1);
    var childbirthdate = get_answer(questions, 2);
    var gestation = get_answer(questions, 3);

    if ((childname.length == 0 || childname.length > 100)) {
        allow_next(next, false, "Enter names of child/ren(s) separated by semicolons");
    }
    else if (childbirthdate.length == 0 || childbirthdate.length > 100) {
        allow_next(next, false, "Enter your child/ren(s) birthdates");
    }
    else if (gestation.length == 0 || gestation.length > 1000) {
        allow_next(next, false, "Enter name(s) and gestation period(s) if applicable");
    }
    else {
        allow_next(next, true);
    }
};

function validate_languageexposure() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var exposure = get_answer(questions, 1);
    var notes = get_answer(questions, 2);
    
    if ((exposure.length == 0 || exposure.length > 100)) {
        allow_next(next, false, "Enter names of child/ren(s), separated by semicolons");
    }
    else if (notes.length == 0 || notes.length > 100) {
        allow_next(next, false, "Enter any additional notes");
	}
    else {
        allow_next(next, true);
    }
};

// PARENT QUESTIONNAIRE: SECTION 2: lang_exp, sec2, childnamecountry, languagedomacq, disabilities, daycare, extracurricular, familyinfo, otherinfo, addlanguage //
function update_lang_exp(){
    var yes = document.getElementById("survey-yes-no-response-0-0").checked;
    var no = document.getElementById("survey-yes-no-response-0-1").checked;
    if(yes || no){
        lang_exp = true;
    }else{
        lang_exp = false;
    }
    //console.log(family_exp);
}
function get_lang_exp(){
    return lang_exp;
};


/* 
function update_known_member(questions) {
    var known = [];
    for (var i = 0; i < 8; i++) {
        if (get_answer(questions, i + 1) != '') {
            known[i] = get_answer(questions, i + 1);
        } else {
            break;
        }
    }
    known_member = known;
};

function get_known_member() {
    return known_member;
}

function update_known_members(questions) {
    var known = [];
    for (var i = 0; i < 8; i++) {
        if (get_answer(questions, i + 1) != '') {
            known[i] = get_answer(questions, i + 1);
        } else {
            break;
        }
    }
    known_members = known;
};

function get_known_members() {
    return known_members;
}
*/


function validate_sec2() {
    var next = document.getElementById("survey-yes-no-next");
    allow_next(next, false, "Click yes to continue");

    var is_valid = true;

    var yes = document.getElementById("survey-yes-no-response-0-0");
    var no = document.getElementById("survey-yes-no-response-0-1");

    if(!yes.checked && !no.checked){
        allow_next(next, false, "Click yes to continue");
        is_valid = false;
    }
    if (is_valid) {
        update_lang_exp();
        allow_next(next, true);
    }
};

function validate_childnamecountry() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var childname = get_answer(questions, 1);
    var childcountry = get_answer(questions, 2);
    
    if ((childname.length == 0 || childname.length > 100)) {
        allow_next(next, false, "Enter the name of the child participating in the study");
    }
    else if (childcountry.length == 0 || childcountry.length > 100) {
        allow_next(next, false, "Enter the child's country of birth");
	}
    else {
        allow_next(next, true);
    }
};

function validate_languagedomacq() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var langdom = get_answer(questions, 1);
    var orderacq = get_answer(questions, 2);
    
    if ((langdom.length == 0 || langdom.length > 100)) {
        allow_next(next, false, "Enter languages in order of dominance, separated by semicolons");
    }
    else if (orderacq.length == 0 || orderacq.length > 100) {
        allow_next(next, false, "Enter languages in order of acquisition, separated by semicolons");
	}
    else {
        allow_next(next, true);
    }
};

function validate_disabilities() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var problems = get_answer(questions, 1);

    if (problems.length == 0 || problems.length > 1000) {
        allow_next(next, false, "Describe any hearing problems, learning disorders, and language disorders in under 1000 characters");
    } else {
        allow_next(next, true);
    }
};

function validate_daycare() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var daycare = get_answer(questions, 1);

    if (daycare.length == 0 || daycare.length > 1000) {
        allow_next(next, false, "Enter if your child attends daycare/school/nursery, the hours per week and languages spoken");
    } else {
        allow_next(next, true);
    }
};

function validate_extracurricular() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var extracurricular = get_answer(questions, 1);

    if (extracurricular.length == 0 || extracurricular.length > 1000) {
        allow_next(next, false, "Enter if your child attends extra-curricular/language programs, the hours per week and languages spoken");
    } else {
        allow_next(next, true);
    }
};

function validate_familyinfo(){
    var next = document.getElementById("family-info-next");
    allow_next(next, true);

    if(lang_exp){
        for(var row_index = 0; row_index<8; row_index++){
            curr_row_els = document.getElementById('family-info-row-' + row_index).childNodes;

            var family = curr_row_els[0].childNodes[0].value;
            var language = curr_row_els[1].childNodes[0].value;
            var proportion = curr_row_els[2].childNodes[0].value;
            var hours = curr_row_els[3].childNodes[0].value;

            //first row of table must be filled in
            if(row_index == 0 && (family == '' || language == '' || proportion == '' || hours == '')){
                allow_next(next, false, "Please enter the family members who talks to your child at least once a week");
            }
            //if user has filled in language/proportion/hours without a description
            if(family == '' && (language != '' || proportion != '' || hours != '')){
                allow_next(next, false, "Please enter the family member");

            }
            
            if(hours == '' && (family != '' || proportion != '' || language != '')){
                allow_next(next, false, "Please list the hours they spend with the child on an average weekday (Monday - Friday) and an average weekend day (Saturday/Sunday)");

            }
             //if user has filled in language/proportion/hours without a description
            if(proportion == '' && (family != '' || language != '' || hours != '')){
                allow_next(next, false, "On a scale from 1-7, please indicate how much they speak this language(s) to your child (1 being all English and 7 being all the other language)");

            }
            
             //if user has filled in language/proportion/hours without a description
            if(language == '' && (proportion != '' || hours != '' || family != '')){
                allow_next(next, false, "Please enter the language(s) spoken by this family member");

            }
  
            //if user has inputted a description for the row, validate
            if( family != '' && (
                    (family.length > 100) ||
                    (language.length > 100) ||
                    (proportion.length > 100) ||
                    (hours.length > 100)
                )){

                allow_next(next, false, "Please enter the language spoken, proportion of language spoken and hours spent for each family member listed");
            }
        }
    }
}

function validate_otherinfo(){
    var next = document.getElementById("other-info-next");
    allow_next(next, true);

    if(lang_exp){
       for(var row_index = 0; row_index<8; row_index++){
            curr_row_els = document.getElementById('other-info-row-' + row_index).childNodes;

            var other = curr_row_els[0].childNodes[0].value;
            var language = curr_row_els[1].childNodes[0].value;
            var proportion = curr_row_els[2].childNodes[0].value;
            var hours = curr_row_els[3].childNodes[0].value;

           //first row of table must be filled in
            if(row_index == 0 && (other == '' || language == '' || proportion == '' || hours == '')){
                allow_next(next, false, "Please enter the individuals who talks to your child at least once a week");
            }
            //if user has filled in language/proportion/hours without a description
            if(other == '' && (language != '' || proportion != '' || hours != '')){
                allow_next(next, false, "Please enter the individual");

            }
            
            if(hours == '' && (other != '' || proportion != '' || language != '')){
                allow_next(next, false, "Please list the hours they spend with the child on an average weekday (Monday - Friday) and an average weekend day (Saturday/Sunday)");

            }
            
             //if user has filled in language/proportion/hours without a description
            if(proportion == '' && (other != '' || language != '' || hours != '')){
                allow_next(next, false, "On a scale from 1-7, please indicate how much they speak this language(s) to your child (1 being all English and 7 being all the other language)");

            }
            
             //if user has filled in language/proportion/hours without a description
            if(language == '' && (proportion != '' || hours != '' || other != '')){
                allow_next(next, false, "Please enter the language(s) spoken by this individual");

            }
            //if user has inputted a description for the row, validate
            if( other != '' && (
                    (other.length > 100) ||
                    (language.length > 100) ||
                    (proportion.length > 100) ||
                    (hours.length > 100)
                )){

                allow_next(next, false, "Please enter the language spoken, proportion of language spoken and hours spent for each individual listed");
            }
        }
    }
}

/*
function validate_family_languageexposure() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var family_lang1 = get_answer(questions, 1);

    if (family_lang1.length == 0 || family_lang1.length > 50) {
        allow_next(next, false, "Enter the family members who your child speaks to at least once a week and the language spoken");
    } else {
        update_known_member(questions);
        allow_next(next, true);
    }
};

function validate_family_languagedetails() {
    var next = document.getElementById("jspsych-member-info-next");
    allow_next(next, false);
    var is_valid = true;
    for (var i = 0; i < 8; i++) {
        currRow = document.getElementById("member-row-" + i);
        if (currRow == null || !is_valid) {
            break;
        }
        var proportion_of_language_spoken = currRow.children[1].children[0].value;
        var hours_spent = currRow.children[2].children[0].value;
        if (isNaN(parseInt(proportion_of_language_spoken)) || (proportion_of_language_spoken < 0 || proportion_of_language_spoken > 100)) {
            allow_next(next, false, "On a scale from 1-7, please indicate how much they speak this language(s) to your child. (1 being all English and 7 being all the other language)" + currRow.children[0].innerText);
            is_valid = false;
        } else if (isNaN(parseInt(hours_spent)) || (hours_spent < 0 || hours_spent > 120)) {
            allow_next(next, false, "Please list the hours they spend with the child on an average weekday (Monday - Friday) and an average weekend day (Saturday/Sunday)" + currRow.children[0].innerText);
            is_valid = false;
        }
    }
    if (is_valid) {
        allow_next(next, true);
    }
};


function validate_other_languageexposure() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var other_lang1 = get_answer(questions, 1);

    if (other_lang1.length == 0 || other_lang1.length > 50) {
        allow_next(next, false, "Enter other individuals who your child speaks to at least once a week and the language spoken");
    } else {
        update_known_members(questions);
        allow_next(next, true);
    }
};

function validate_other_languagedetails() {
    var next = document.getElementById("jspsych-members-info-next");
    allow_next(next, false);
    var is_valid = true;
    for (var i = 0; i < 8; i++) {
        currRow = document.getElementById("members-row-" + i);
        if (currRow == null || !is_valid) {
            break;
        }
        var proportion_of_language_spoken = currRow.children[1].children[0].value;
        var hours_spent = currRow.children[2].children[0].value;
        if (isNaN(parseInt(proportion_of_language_spoken)) || (proportion_of_language_spoken < 0 || proportion_of_language_spoken > 100)) {
            allow_next(next, false, "On a scale from 1-7, please indicate how much they speak this language(s) to your child. (1 being all English and 7 being all the other language)" + currRow.children[0].innerText);
            is_valid = false;
        } else if (isNaN(parseInt(hours_spent)) || (hours_spent < 0 || hours_spent > 120)) {
            allow_next(next, false, "Please list the hours they spend with the child on an average weekday (Monday - Friday) and an average weekend day (Saturday/Sunday)" + currRow.children[0].innerText);
            is_valid = false;
        }
    }
    if (is_valid) {
        allow_next(next, true);
    }
};
*/
function validate_addlanguage() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var radio = get_answer(questions, 1);
    var music = get_answer(questions, 2);
    var TV = get_answer(questions, 3);
    var read = get_answer(questions, 4);
    
    if ((radio.length == 0 || radio.length > 100)) {
        allow_next(next, false, "Enter the language heard and hours spent when listening to the radio.");
    }
    else if (music.length == 0 || music.length > 100) {
        allow_next(next, false, "Enter the language heard and hours spent when listening to music");
	}
	else if (TV.length == 0 || TV.length > 100) {
        allow_next(next, false, "Enter the language heard and hours spent when watching TV/videos");
    }
    else if (read.length == 0 || read.length > 100) {
        allow_next(next, false, "Enter the language heard and hours spent when your child is being read to");
    }
    else {
        allow_next(next, true);
    }
};


// PARENT QUESTIONNAIRE: SECTION 3: parentcareinfo //
function validate_parentcareinfo() {
    var questions = document.getElementById("jspsych-content").children;
    var next = document.getElementById("jspsych-survey-text-next");
    allow_next(next, false);

    var country = get_answer(questions, 1);
    var langdom = get_answer(questions, 2);
    var edu = get_answer(questions, 3);
    
    if ((country.length == 0 || country.length > 100)) {
        allow_next(next, false, "Enter country of birth for each parent, separated by semicolons");
    }
    else if (langdom.length == 0 || langdom.length > 100) {
        allow_next(next, false, "Enter languages in order of most to least fluent for each parent, separated by semicolons");
	}
	else if (edu.length == 0 || edu.length > 100) {
        allow_next(next, false, "Enter highest level of education attained for each parent, separated by semicolons");
    }
    else {
        allow_next(next, true);
    }
};

