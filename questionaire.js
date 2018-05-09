var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to enable event listeners
var likely_invalid = false; //gets set to true if blur_count>threshold
var header = "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1>"; //to be prepended to preludes

var contact = {
    type: 'survey-text',
    preamble: header + "<h2>Contact Information</h2>",
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Phone Number"},
        {prompt: "Email"}
    ],
    data: subject_id,
    on_load: function(){
        validate_contact();
        form = document.getElementById("jspsych-content");
        form.addEventListener("change", validate_contact);
    },
    on_finish: function(){
        form.removeEventListener("change", validate_contact);
    }
};
var personal = {
    type: 'survey-text',
    preamble: header + "<h2>Personal Information</h2>",
    questions: [
        {prompt: "Age"},
        {prompt: "Gender"},
        {prompt: "If you have any hearing problems, please specify"},
        {prompt: "If you have any language disorders, please specify"},
        {prompt: "If you have any learning disorders, please specify"}
    ],
    on_load: function(){
        validate_personal();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_personal);
    },
    on_finish: function(){
        form_curr.removeEventListener("change", validate_personal);
    }
};
var background = {
    type: 'survey-text',
    preamble: header + "<h2>Background Information</h2>",
    questions: [
        {prompt: "Birth Country"},
        {prompt: "Age of Arrival in Canada (Enter 0 if you were born in Canada)"},
        {prompt: "Native Language"},
        {prompt: "Parent 1's Native Language"},
        {prompt: "Parent 2's Native Language"}
    ],
    on_load: function(){
        validate_background();
        form_curr = document.getElementById("jspsych-content");
        form_curr.addEventListener("change", validate_background);
    },
    on_finish: function(){
        form_curr.removeEventListener("change", validate_background);
    }
};
var dominant_languages = {
    type: 'survey-text',
    preamble: header + "<h2>Languages You Know</h2><p>Please list the lanuages you speak (including your native tongue), by most to least dominant.</p>",
    questions: [
        {prompt: "Most Dominant"},
        {prompt: "Second Most Dominant"},
        {prompt: "Third Most Dominant"},
        {prompt: "Fourth Most Dominant"}
    ],
    on_load: function(){
        validate_dominant_languages();
        form = document.getElementById("jspsych-content");
        form.addEventListener("change", validate_dominant_languages);
    },
    on_finish: function(){
        form.removeEventListener("change", validate_dominant_languages);
    }

};
var language_details = {
    type: 'language-info',
    preamble: header + "<h2>Test Language Details</h2>",
    languages: [],
    on_start: function(trial){
        trial.languages = get_known_langs();
    },
    on_load: function(){
        validate_language_details();
        form = document.getElementById("jspsych-content");
        form.addEventListener("change", validate_language_details);
    },
    on_finish: function(){
        form.removeEventListener("change", validate_language_details);
    }
};
var musical = {
    type: 'survey-text',
    preamble: header + "<h2>Musical Background</h2>",
    questions: [
        {prompt: "Have you played any musical instruments, sung in a group, or studied music? If so, please describe your musical experience:"}
    ],
    on_load: function(){
        validate_musical();
        form = document.getElementById("jspsych-content");
        form.addEventListener("change", validate_musical);
    },
    on_finish: function(data){
        data.likely_invalid = likely_invalid;
        form.removeEventListener("change", validate_musical);
    }
};
jsPsych.init({
    //production timeline:
    timeline: [contact, personal, background, dominant_languages, language_details, musical],
    //timeline for testing: 
    //timeline: [dominant_languages, language_details, musical],
    show_progress_bar: true,
    //Checks how many times user left
    on_interaction_data_update: function(data){
        if(data.event == "blur"){
            console.log(data);
            blur_count++;
            if(blur_count > 10){
                likely_invalid = true;
            }
        };
    },
    on_finish: function(){
        jsPsych.data.displayData();
    }
});
