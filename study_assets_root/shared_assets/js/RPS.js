var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab</h1>"; //to be prepended to preludes

// Instruction pages that appear at the start
var online = {
    type: 'instructions',
    pages: [
        header + '<h2>Online RPS Form</h2>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    button_label_previous: 'Back',
    allow_keys: false
}
var confirmation = {
    type: 'survey-yes-no',
    questions: [
        {prompt: "Have you taken this study in the past for RPS credits?" +
      "<p>If you have already taken this study in the past for course credits, you may not use this study for RPS again.</p>"}
    ],
    preamble: header + "<h2>Confirmation</h2>",
    json_label: 'complete_RPS_past',
    on_load: function(){
        validate_confirmation();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_confirmation);
    },
    on_finish: function(){
        toggle_listeners(form, false, validate_confirmation);
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
var rps = {
    type: 'survey-text-custom',
    preamble: header + "<h2>RPS Information</h2>",
    json_label: 'RPS Information',
    questions: [
        {prompt: "Full Name"},
        {prompt: "Student Number"},
        {prompt: "Course for RPS credit <br>e.g. LING 200</br>"},
        {prompt: "Semester and Year <br> Summer 2020</br>"},
        {prompt: "Course Instructor"},
        {prompt: "Notes (e.g. if you wish to divide RPS credits among different courses, please confirm and list the courses here)"}
    ],
    on_load: function () {
        validate_rps();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_rps);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_rps);
    }

  };

  jatos.onLoad(function() {
      var finish_conf = {
          type: 'instructions',
          pages: [
              header + '<h2>Study Complete</h2><p>Thank you for your participation. Your confirmation ID is <b>' + jatos.studyResultId + '</b>.' +
              '<p>Your participation is counted in the RPS system.</p>' +
              '<p> If you have any questions about your participation, please save this ID and email <a href="mailto:langdev@sfu.ca">langdev@sfu.ca</a>.</p>'
            ],
          show_clickable_nav: true,
          button_label_next: 'Close',
          allow_keys: false
      };
      jsPsych.init({
        timeline: [online, confirmation, rps, finish_conf],
        exclusions: {
            min_width: 800,
            min_height: 600
        },
        on_finish: function (data) {
            var studyID = jatos.studyResultId;
            jsPsych.data.addProperties({subject : studyID});
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed');
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
          }
      })
  });
