var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to enable event listeners
var likely_invalid = false; //gets set to true if blur_count>threshold
var header = "<img id=\"logo\" src=\"/study_assets/questionaire/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1>"; //to be prepended to preludes


var contact = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Contact Information</h2>",
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
    questions: [
        {prompt: "Age"},
        {prompt: "If you have any hearing problems, learning disorders or language disorders, please specify.<br>For example: aphaisia, dyslexia, hearing impairment, ADHD, etc."}
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
    questions: [
        {prompt: "Birth Country"},
        {prompt: "Age of Arrival in Canada (Enter 0 if you were born in Canada)"},
        {prompt: "Native Language"},
        {prompt: "Parent 1's Native Language"},
        {prompt: "Parent 2's Native Language"}
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
    languages: [],
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
    experiences: [],
    on_start: function(trial){
        trial.experience = get_musical_exp();
    },
    on_load: function(){
        validate_musical_detail();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_musical_detail);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_musical_detail);
    }
};
jatos.onLoad(
    jsPsych.init({
        //production timeline:
        timeline: [contact, personal, gender, background, dominant_languages, language_details, musical_summary, musical_detail],
        //timeline for testing: 
        // timeline: [musical_summary, musical_detail],
        show_progress_bar: true,
        //Checks how many times user left
        on_interaction_data_update: function (data) {
            if (data.event == "blur") {
                console.log(data);
                blur_count++;
                if (blur_count > 10) {
                    likely_invalid = true;
                }
            };
        },
        on_finish: function () {
            var resultJson = jsPsych.data.get().json();
            jatos.submitResultData(resultJson, jatos.startNextComponent);
        }
    })
);