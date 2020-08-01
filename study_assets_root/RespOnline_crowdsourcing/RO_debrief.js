
var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Thank You</h1>"; //to be prepended to preludes


jatos.onLoad(function(data) {
  var result = {subject: jatos.studyResultId};
jatos.submitResultData(result)
  .then(jatos.endStudyAjax)
  .then(() => {
    window.location.href = 'https://app.prolific.co/submissions/complete?cc=87517F62'
});
  
  
    jsPsych.init({
        //Questionaire:

    })
});
