var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Survey</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start

var surveyq = {
    type: 'survey-text-custom',
    preamble: header + "<h2>What did you think of our study? Let us know your thoughts!</h2>",
    json_label: 'surveyq',
    questions: [
        {prompt: "Were you able to maintain your breathing throughout the entire experiment or did you find it too difficult?"}
    ],
    on_load: function () {
        validate_surveyq();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_surveyq);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_surveyq);
    }
};

var end = {
    type: 'instructions',
    pages: [
        header + 'Thank you for your participation! Click <i>next</i> to receive your completion code.'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    button_label_previous: 'Back',
    allow_keys: false
};

jatos.onLoad(
    jsPsych.init({
        timeline: [surveyq, end],
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
