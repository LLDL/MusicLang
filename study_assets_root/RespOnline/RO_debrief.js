
var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Thank You</h1>"; //to be prepended to preludes

jatos.onLoad(function() {
    var finish_conf = {
        type: 'instructions',
        pages: [
            header + '<h2>Study Complete</h2><p>Thank you for your participation. Your confirmation ID is <b>RO' + jatos.studyResultId + '</b>. To arrange payment, please email <a href="mailto:langdev@sfu.ca?Subject=Participant%20RO' + jatos.studyResultId + '">langdev@sfu.ca</a> with the subject <b>Participant RO' + jatos.studyResultId + '</b></p>'
        ],
        show_clickable_nav: true,
        button_label_next: 'Close',
        allow_keys: false
    };

    jsPsych.init({
        //Questionaire:
        timeline: [finish_conf],
        
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
