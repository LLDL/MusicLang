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
    preamble: header + "<h3>Participant Contact Information</h3>",
    questions: [
        {prompt: "Surname", required: true},
        {prompt: "First Name", required: true},
        {prompt: "Phone Number", required: true},
        {prompt: "Email", required: true}
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
    },
    on_finish: function(data){
        data.blur_count = blur_count;
    }
}
var language_info = {
    type: 'survey-text',
    preamble: header + "<p>Any explanatory text required to define these terms.</p>",
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
    },
    on_finish: function(data){
        data.blur_count = blur_count;
    }
}
jsPsych.init({
    timeline: [contact_info, language_info],
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