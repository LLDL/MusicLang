var subject_id = jsPsych.randomization.randomID(15)
var blur_count = 0;
var next_button_curr;
var form_curr;
var header = "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1>"

function disable_next(){
    next_button_curr = document.getElementById("jspsych-survey-text-next");
    next_button_curr.disabled = true;
    next_button_curr.innerText = "Please answer all questions before continuing";
}

var contact_info = {
    type: 'survey-text',
    preamble: header + "<h3>Contact Information</h3>",
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Phone Number"},
        {prompt: "Email"}
    ],
    data: {
        subject_id
    },
    on_load: function(contact_info){
        disable_next();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_contact_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_contact_info);
    }
}
var personal_info = {
    type: 'survey-text',
    preamble: header + "<h3>Personal Information</h3>",
    questions: [
        {prompt: "Age"},
        {prompt: "Gender"},
        {prompt: "Birth Country"},
        {prompt: "If you have any hearing problems, please specify"},
        {prompt: "If you have any language disorders, please specify"},
        {prompt: "If you have any learning disorders, please specify"}
    ],
    data: {
        subject_id
    },
    on_load: function(contact_info){
        disable_next();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_personal_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_personal_info);
    }
}
var background_info = {
    type: 'survey-text',
    preamble: header + "<h3>Background Information</h3>",
    questions: [
        {prompt: "Age of Arrival in Canada"},
        {prompt: "Native Language"},
        {prompt: "Parent 1's Native Language"},
        {prompt: "Parent 2's Native Language"}
    ],
    data: {
        subject_id
    },
    on_load: function(contact_info){
        disable_next();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_background_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_background_info);
    }
}
var language_info = {
    type: 'survey-text',
    preamble: header + "<h3>Language Information</h3>",
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
    on_load: function(language_info){
        disable_next();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_language_info);
    },
    on_finish: function(language_info){
        form_curr.removeEventListener("change", validate_language_info);
    }
}
var musical_info = {
    type: 'survey-text',
    preamble: header + "<h3>Musical Background</h3>",
    questions: [
        {prompt: "Have you played any musical instruments? If so, please specify which one(s) you have played, the age you began and the number of years you have practiced."}
    ],
    data: {
        subject_id
    },
    on_load: function(musical_info){
        disable_next();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_musical_info);
    },
    on_finish: function(language_info){
        form_curr.removeEventListener("change", validate_musical_info);
    },
    on_finish: function(data){
        data.blur_count = blur_count;
    }
}
jsPsych.init({
    timeline: [contact_info, personal_info, background_info, language_info, musical_info],
    show_progress_bar: true,
    //Checks how many times user left
    on_interaction_data_update: function(data){
        if(data.event == "blur"){
            console.log(data);
            blur_count++;
        };
    },
    on_finish: function(){
        jsPsych.data.displayData();
    }
})