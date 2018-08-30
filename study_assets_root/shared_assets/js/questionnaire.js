var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionnaire</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start
var info = {
    type: 'instructions',
    pages: [
        header + '<h2>Participant Consent</h2><p>Consent form will go here, can say something along lines of: Please download and read <a href="shared_assets/consent.pdf" target="_blank">this consent form</a>. By continuing, you are granting etc.</p> '
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    button_label_previous: 'Back',
    allow_keys: false
}
var future = {
    type: 'survey-yes-no',
    questions: [
        {prompt: "Can we contact you for future studies?"}
    ],
    preamble: header + "<h2>Participation in Future Experiments</h2>",
    json_label: 'interested_in_future_exps',
    on_load: function(){
        validate_future();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_future);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_future);
    }
}
/*
    General Form of a Trial's nontrivial sections:
    on_load: function(){...} 
        1. Tries and fails to validate the form, disabling next
        2. Sets the value of 'form' and uses that as a jumping off point to toggle form change listeners
    on_finish: function(){...}
        1   releases listeners
*/
var contact = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Contact Information</h2>",
    json_label: 'Contact',
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Phone Number"},
        {prompt: "Email"}
    ],
    on_load: function () {
        validate_contact();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_contact);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_contact);
    }
};
var personal = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Personal Information</h2>",
    json_label: 'Personal',
    questions: [
        {prompt: "Age"},
        {prompt: "If you have any hearing problems, learning disorders or language disorders, please specify.<br>For example: aphasia, dyslexia, hearing impairment, ADHD, etc."}
    ],
    on_load: function () {
        validate_personal();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_personal);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_personal);
    }
};
var gender = {
    type: 'gender-info',
    preamble: header + "<h2>Gender</h2>",
    json_label: 'Gender',
    on_load: function ()
    {
        validate_gender();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_gender);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_gender);
    }
};
var background = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Background Information</h2>",
    json_label: 'Background',
    questions: [
        {prompt: "Birth Country"},
        {prompt: "Age of Arrival in Current Country (Enter 0 if you were born in your current country)"},
        {prompt: "Native Language"},
        {prompt: "Parent/Guardian 1's Native Language"},
        {prompt: "Parent/Guardian 2's Native Language"}
    ],
    on_load: function () {
        validate_background();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_background);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_background);
    }
};
var dominant_languages = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Languages You Know</h2><p>Please list the lanuages you speak (including your native tongue), by most to least dominant.</p>",
    json_label: 'Language Dominance',
    questions: [
        {prompt: "Most Dominant"},
        {prompt: "Second Most Dominant"},
        {prompt: "Third Most Dominant"},
        {prompt: "Fourth Most Dominant"},
        {prompt: "Fifth Most Dominant"}
    ],
    on_load: function () {
        validate_dominant_languages();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_dominant_languages);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_dominant_languages);
    }

};
var language_details = {
    type: 'language-info',
    preamble: header + "<h2>Language Details</h2>",
    data: { 
        languages: ["loading"]
    },
    json_label: 'Language Details',
    on_start: function (trial) {
        trial.languages = get_known_langs();
    },
    on_load: function () {
        validate_language_details();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_language_details);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_language_details);
    }
};
var musical_summary = {
    type: 'survey-yes-no',
    preamble: header + "<h2>Musical Background</h2>",
    questions: [
        {prompt: "Have you played an instrument, sung in a group, or studied music?"}
    ],
    json_label: 'Musical Background',
    on_load: function () {
        validate_musical_summary();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_musical_summary);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_musical_summary);
    }
};
var musical_detail = {
    type: 'music-info',
    preamble: header + '<h2>Musical Experience</h2><p>In "Description", name the instrument or type of singing.<br>In "Instruction Type", describe the enviroment you learned in, ie: private lessons, school band, band, etc.</p>',
    json_label: 'Musical Detail',
    on_start: function(trial){
        trial.experience = get_musical_exp();
    },
    on_load: function(){
        validate_musical_detail();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_musical_detail);
    },
    on_finish: function(data){
        toggle_listeners(form, false, validate_musical_detail);
    }
};
jatos.onLoad(
    jsPsych.init({
        timeline: [info, future, contact, personal, gender, background, dominant_languages, language_details, musical_summary, musical_detail],
        exclusions: {
            min_width: 800,
            min_height: 600
        },
        //Checks how many times user left if it's more than 10, triggers invalid flag
        on_interaction_data_update: function (data) {
            if (data.event == "blur") {
                console.log(data);
                blur_count++;
                if (blur_count > 10) {
                    likely_invalid = true;
                }
            };
        },
        on_finish: function (data) {
            var studyID = jatos.studyResultId;
            if(likely_invalid){
                studyID += ' - invalid result'
            }
            jsPsych.data.addProperties({subject : studyID});
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed').ignore();
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
        }
    })
);