var subject_id = jsPsych.randomization.randomID(15)
var blur_count = 0
var personal_info = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac gravida justo, quis vehicula eros. Mauris maximus ac ex non rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla ut neque a augue eleifend ullamcorper ut sed eros. Nulla quam tellus, gravida egestas hendrerit.</p>",
    questions: [
        {prompt: "Surname"},
        {prompt: "First Name"},
        {prompt: "Age"},
        {prompt: "Phone Number"},
        {prompt: "Email"},
        {prompt: "Phone"},
    ],
    data: {
        subject_id
    },
    on_finish: function(data){
        data.blur_count = blur_count
    },
    button_label: "Continue"
}

jsPsych.init({
    timeline: [personal_info],
    //Checks how many times user left
    on_interaction_data_update: function(data){
        if(data.event == "blur"){
            console.log(data.event)
            blur_count++
        }
    },
    on_finish: function(){
        jsPsych.data.displayData();
    }
})