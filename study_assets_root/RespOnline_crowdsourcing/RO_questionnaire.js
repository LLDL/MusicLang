var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionnaire</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start
var info = {
    type: 'instructions',
    pages: [
        header + '<h2>Participant Consent</h2><p>Please download and read <a href="shared_assets/consent_crowdsourcing.pdf" target="_blank">this consent form</a>. By continuing, you are consenting to our study.</p> '
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    button_label_previous: 'Back',
    allow_keys: false
}
/*
    General Form of a Trial's nontrivial sections:
    on_load: function(){...}
        1. Tries and fails to validate the form, disabling next
        2. Sets the value of 'form' and uses that as a jumping off point to toggle form change listeners
    on_finish: function(){...}
        1   releases listeners
*/

var idnumber = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Worker ID Information</h2>",
    json_label: 'idnumber',
    questions: [
        {prompt: "Please enter your Prolific ID below."}
    ],
    on_load: function () {
        validate_idnumber();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_idnumber);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_idnumber);
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
    preamble: header + "<h2>Languages You Know</h2><p>Please list the languages you speak (including your native tongue), by most to least dominant.</p>",
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
    languages: ['temp'],
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

var end = {
    type: 'instructions',
    pages: [
        header + 'Click <i>next</i> to begin the experiment.'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    button_label_previous: 'Back',
    allow_keys: false
};


    jatos.onLoad(function() {
var prolificID = jatos.urlQueryParameters.PROLIFIC_PID;   // accesses prolific ID from the URL
var studyID = jatos.studyResultId;  // creates a study ID for debrief & RPS purposes
jsPsych.data.addProperties({subject : studyID});     // adds study ID to results data //
jsPsych.data.addProperties({prolificID : prolificID});   // adds prolific ID to results data

    jsPsych.init({
        timeline: [info, idnumber, personal, gender, background, dominant_languages, language_details, end],
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
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed');
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
        }
    })
    }
);
