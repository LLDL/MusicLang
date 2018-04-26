var subject_id = jsPsych.randomization.randomID(15)
var blur_count = 0;
var next_button_curr;
var form_curr;
//regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate_personal_info(){
    next_button_curr.disabled = true;
    console.log("attempting validation");
    var questions = form_curr.children;
    var is_valid = true;

    lname = form_curr.children[1].children[1].value
    fname = form_curr.children[2].children[1].value
    age   = form_curr.children[3].children[1].value
    phone = form_curr.children[4].children[1].value
    email = form_curr.children[5].children[1].value

    if(is_valid && (lname.length == 0 || lname.length > 100)){
        next_button_curr.innerText = "Invalid surname";
        is_valid = false;
    } 
    if(is_valid && fname.length == 0 || lname.length > 100){
        next_button_curr.innerText = "Invalid first name";
        is_valid = false;
    } 
    if(is_valid && (isNaN(age) || age <= 0 || age > 120)){
        console.log("entered age")
        next_button_curr.innerText = "Invalid age";
        is_valid = false;
    }
    if(is_valid && phone.length == 0 || phone.length > 100){
        next_button_curr.innerText = "Invalid phone number";
        is_valid = false;
    } 
    if(is_valid && !email_regex.test(String(email).toLowerCase())){
        
        next_button_curr.innerText = "Invalid email address";
        is_valid = false;
    }
    if(is_valid){
        next_button_curr.disabled = false;
        next_button_curr.innerText = "Continue";
    }
}
var personal_info = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Add a brief description detailing what this data is used for and whether this may be skipped.</p>",
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Age"},
        {prompt: "Phone Number"},
        {prompt: "Email"}
    ],
    on_load: function(personal_info){
        next_button_curr = document.getElementById("jspsych-survey-text-next");
        form_curr = document.getElementById("jspsych-content");
        next_button_curr.disabled = true;
        next_button_curr.innerText = "Please answer the above questions before continuing";
        form_curr.addEventListener("change", validate_personal_info);
    },
    data: {
        subject_id
    },
    button_label: "Continue"
}
var language_info = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Any explanatory text required to define these terms.</p>",
    questions: [
        {prompt: "Birth Country"},
        {prompt: "Age of Arrival in Canada"},
        {prompt: "Native Language"},
        {prompt: "Parent 1's Native Language"},
        {prompt: "Parent 2's Native Language"},
    ],
    data: {
        subject_id
    },
    on_finish: function(data){
        data.blur_count = blur_count;
    },
    button_label: "Continue"
}
jsPsych.init({
    timeline: [personal_info, language_info],
    //Checks how many times user left
    on_interaction_data_update: function(data){
        if(data.event == "blur"){
            console.log(data);
            blur_count++;
        };
    },
    on_finish: function(){
        jsPsych.data.displayData();
    },
    on_trial_finish: function(){
        console.log("trial finished");
        form_curr.removeEventListener("change", validate_personal_info);
        
    }
})