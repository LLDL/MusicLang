var subject_id = jsPsych.randomization.randomID(15)
var blur_count = 0;
var next_button_curr;
var form_curr;
var header = "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1>"

var contact_info = {
    type: 'survey-text',
    preamble: header + "<h2>Contact Information</h2>",
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
        allow_next(false);
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_contact_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_contact_info);
    }
}
var personal_info = {
    type: 'survey-text',
    preamble: header + "<h2>Personal Information</h2>",
    questions: [
        {prompt: "Age"},
        {prompt: "Gender"},
        {prompt: "If you have any hearing problems, please specify"},
        {prompt: "If you have any language disorders, please specify"},
        {prompt: "If you have any learning disorders, please specify"}
    ],
    data: {
        subject_id
    },
    on_load: function(contact_info){
        allow_next(false);
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_personal_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_personal_info);
    }
}
var background_info = {
    type: 'survey-text',
    preamble: header + "<h2>Background Information</h2>",
    questions: [
        {prompt: "Birth Country"},
        {prompt: "Age of Arrival in Canada (Enter 0 if you were born in Canada)"},
        {prompt: "Native Language"},
        {prompt: "Parent 1's Native Language"},
        {prompt: "Parent 2's Native Language"}
    ],
    data: {
        subject_id
    },
    on_load: function(contact_info){
        allow_next(false);
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_background_info);
    },
    on_finish: function(contact_info){
        form_curr.removeEventListener("change", validate_background_info);
    }
}
var language_info = {
    type: 'survey-text',
    preamble: header + "<h2>Language Information</h2><p>Please list all the lanuages you speak, from most to least dominant.</p>",
    questions: [
        {prompt: "Most Dominant"},
        {prompt: "Second Most Dominant"},
        {prompt: "Third Most Dominant"},
        {prompt: "Fourth Most Dominant"}
    ],
    data: {
        subject_id
    },
    on_load: function(language_info){
        allow_next(false);
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_language_info);
    },
    on_finish: function(language_info){
        form_curr.removeEventListener("change", validate_language_info);
    }
}
var language_detailed_info = {
    type: 'survey-text',
    preamble: header + "<h2>Language Information, Continued</h2>",
    questions: [
        {prompt: "When did you start learning " + "?"},
        {prompt: "How many years did you learn " + " for?"},
        {prompt: "When did you start learning " + "?"},
        {prompt: "How many years did you learn " + " for?"},
        {prompt: "When did you start learning " + "?"},
        {prompt: "How many years did you learn " + " for?"},
        {prompt: "When did you start learning " + "?"},
        {prompt: "How many years did you learn " + " for?"}
    ],
    data: {
        subject_id
    },
    on_load: function(language_info){
        allow_next(false);
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_language_detailed_info);
    },
    on_finish: function(language_info){
        form_curr.removeEventListener("change", validate_language_detailed_info);
    }
}
var musical_info = {
    type: 'survey-text',
    preamble: header + "<h2>Musical Background</h2>",
    questions: [
        {prompt: "Have you played any musical instruments, sung in a group, or studied music? If so, please describe your musical experience:"}
    ],
    data: {
        subject_id
    },
    on_load: function(musical_info){
        allow_next(false);
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
    //production timeline:
    //timeline: [contact_info, personal_info, background_info, language_info, language_detailed_info, musical_info],
    //timeline for testing: 
    timeline: [background_info, language_info, language_detailed_info],
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
