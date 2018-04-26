var subject_id = jsPsych.randomization.randomID(15)
var blur_count = 0;
var next_button_curr;
var form_curr;

function validatePersonal(){
    console.log("attempting validation");
    var questions = form_curr.children;
    is_valid = true;

    lname = form_curr.children[1].children[1]
    fname = form_curr.children[2].children[1]
    age   = form_curr.children[3].children[1]
    phone = form_curr.children[4].children[1]
    email = form_curr.children[5].children[1]

    if(is_valid && lname.value == ""){
        next_button_curr.innerText = "Enter your surname"
        is_valid = false;
    } 
    if(is_valid && fname.value == ""){
        next_button_curr.innerText = "Enter your first name"
        is_valid = false;
    } 
    if(is_valid && age.value == ""){
        next_button_curr.innerText = "Enter your age"
        is_valid = false
    }
    if(is_valid && phone.value == ""){
        next_button_curr.innerText = "Enter your phone number"
        is_valid = false;
    } 
    if(is_valid && email.value == ""){
        next_button_curr.innerText = "Enter your email address"
        is_valid = false
    }
    if(is_valid){
        next_button_curr.disabled = false;
        next_button_curr.innerText = "Continue";
    }
}
var personal_info = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Add a brief description detailing what this data is used for and whether this may be skipped.</p>",
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Age"},
        {prompt: "Phone Number"},
        {prompt: "Email"}
    ],
    on_load: function(personal_info){
        next_button_curr = document.getElementById("jspsych-survey-text-next");
        form_curr = document.getElementById("jspsych-content");
        next_button_curr.disabled = true;
        next_button_curr.innerText = "Please answer the above questions before continuing";
        form_curr.addEventListener("change", validatePersonal);
    },
    data: {
        subject_id
    },
    button_label: "Continue"
}
var language_info = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Any explanatory text required to define these terms.</p>",
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
    on_finish: function(data){
        data.blur_count = blur_count;
    },
    button_label: "Continue"
}
jsPsych.init({
    timeline: [personal_info, language_info],
    //Checks how many times user left
    on_interaction_data_update: function(data){
        if(data.event == "blur"){
            console.log(data);
            blur_count++;
        };
    },
    on_finish: function(){
        jsPsych.data.displayData();
    },
    on_trial_finish: function(){
        console.log("trial finished");
        form_curr.removeEventListener("change", validatePersonal);
        
    }
})