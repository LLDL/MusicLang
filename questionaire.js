var personalInfo = {
    type: 'survey-text',
    preamble: "<img id=\"logo\" src=\"assets/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab Questionaire</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac gravida justo, quis vehicula eros. Mauris maximus ac ex non rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla ut neque a augue eleifend ullamcorper ut sed eros. Nulla quam tellus, gravida egestas hendrerit.</p>",
    questions: [{prompt: "Surname"},
                {prompt: "First Name"},
                {prompt: "Age"},
                {prompt: "Phone Number"},
                {prompt: "Email"}],
    button_label: "Continue"
}
jsPsych.init({
    timeline: [personalInfo],
    on_finish: function(){
        jsPsych.data.displayData();
    }
})