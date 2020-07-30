
var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Thank You</h1>"; //to be prepended to preludes


jatos.onLoad(function(data) {
  var studyID = {subject: jatos.studyResultId};
  jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", studyID);

    jsPsych.init({
        //Questionaire:

    })
});
