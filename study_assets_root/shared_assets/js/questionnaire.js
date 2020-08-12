var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionnaire</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start
var info = {
    type: 'instructions',
    pages: [
        header + '<h2>Participant Consent</h2><p>Please download and read <a href="shared_assets/consent.pdf" target="_blank">this consent form</a>. By continuing, you are consenting to our study.</p> '
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
var parentinfo = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Parent Information</h2>",
    json_label: 'parentinfo',
    questions: [
        {prompt: "Parent name(s) <br>(Please include first and last names, separated by semicolons)"},
        {prompt: "Mailing address"},
        {prompt: "Primary telephone number"},
        {prompt: "Primary email address"},
        {prompt: "Additional contact information (Please share any additional phone numbers or email addresses you might use)"},
        {prompt: "Preferred mode of communication (telephone, email, or no preference)"}
    ],
    on_load: function () {
        validate_parentinfo();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_parentinfo);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_parentinfo);
    }
};
var childinfo = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Child Information</h2>",
    json_label: 'childinfo',
    questions: [
        {prompt: "Child name"},
        {prompt: "Child birh date (YYYY/MM/DD)"},
        {prompt: "If your child has any vision/hearing problems, learning disorders or language disorders, please specify.<br>For example: aphasia, dyslexia, hearing impairment, ADHD, etc."}
    ],
    on_load: function () {
        validate_childinfo();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_childinfo);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_childinfo);
    }
};
var born_before_due = {
    type: 'survey-yes-no',
    preamble: header + "<h2>Child Information</h2>",
    json_label: 'born_before_due',
    questions: [
        {prompt: "Was your child born before their due date?"}
    ],
    on_load: function () {
        validate_born_before_due();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_born_before_due);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_born_before_due);
    }
};
var gestation_period = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Child's Information</h2>",
    json_label: 'gestation_period',
    questions: [
        {prompt: "If you answered yes, how long was their gestation period? <br>If you answered no, enter N/A."}
    ],
    on_load: function () {
        validate_gestation_period();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_gestation_period);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_gestation_period);
    }
};
var language_exposure = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Language Exposure</h2>",
    json_label: 'language_exposure',
    questions: [
        {prompt: "Please share all of the languages that your child is exposed to with estimates of how much of their time is spent around each one (in percentages).<br>Example: If Chidi and Dylan are enrolled in an Armenian daycare 6 hours/day (which Evelyn is too small to attend) and have French-speaking parents, their entries might look like that: <br>Chidi & Dylan: 25% Armenian, 75% French; Evelyn: 100% French"}
    ],
    on_load: function () {
        validate_language_exposure();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_language_exposure);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_language_exposure);
    }
};
var problems = {
    type: 'survey-text-custom',
    preamble: header + "<h2>Disorders/Impairments/Disabilities</h2>",
    json_label: 'disabilities',
    questions: [
        {prompt: "If your child has any vision/hearing problems, learning disorders or language disorders, please specify.<br>For example: aphasia, dyslexia, hearing impairment, ADHD, etc."}
    ],
    on_load: function () {
        validate_problems();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_problems);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_problems);
    }
};
var end = {
  type: 'instructions',
  pages: [
      header + 'Thank you! Click <i>next</i> to complete the questionnaire.'
  ],
  show_clickable_nav: true,
  button_label_next: 'Next',
  button_label_previous: 'Back',
  allow_keys: false
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
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed');
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
        }
    })
);
