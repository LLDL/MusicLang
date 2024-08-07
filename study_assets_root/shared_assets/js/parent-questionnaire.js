var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionnaire</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start
var info = {
    type: 'instructions',
    pages: [
        header + '<h2>Participant Consent</h2><p>Please download and read <a href="shared_assets/consent_l2-ids.pdf" target="_blank">this consent form</a>. By continuing, you are consenting to our study.</p> '
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

var copy = {
    type: 'survey-yes-no',
    questions: [
        {prompt: "Would you like a copy of your child's language counts?"}
    ],
    preamble: header + "<h2>Parent Questionnaire</h2>",
    json_label: 'Language Count',
    on_load: function(){
        validate_confirmation();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_confirmation);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_confirmation);
    }
};

var talkbank = {
    type: 'survey-yes-no',
    questions: [
        {prompt: "Do you wish for you data to be included into the TalkBank archive? If you select no, we will then only use your data for our current analysis without uploading to the online repository."}
    ],
    preamble: header + "<h2>Data Collection</h2>",
    json_label: 'TalkBank Permission',
    on_load: function(){
        validate_confirmation();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_confirmation);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_confirmation);
    }
};

var futurecontact = {
    type: 'survey-yes-no',
    questions: [
        {prompt: "Would you like to opt in for us to contact you in the future?"}
    ],
    preamble: header + "<h2></h2>",
    json_label: 'Future Contact',
    on_load: function(){
        validate_future();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_future);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_future);
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
        {prompt: "Child birth date (YYYY/MM/DD)"},
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
        {prompt: "Was your child born before their due date? <br>If the answer is yes, how long was their gestation period? (i.e. how many weeks spent in utero before birth?) <br>If you answered no, enter N/A."}
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

var gender = {
    type: 'gender-info',
    preamble: header + "<h2>Child's Gender</h2>",
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

jatos.onLoad(function() {

jsPsych.init({
    timeline: [info, copy, talkbank, futurecontact, parentinfo, childinfo, gestation_period, gender, language_exposure, end],
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
}
)
}
);
