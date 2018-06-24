//var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"/study_assets/MusicLang/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab MusicLang Experiment</h1>"; //to be prepended to preludes

var inst_rhythm = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2><p>Please wear headphones for the duration of this experiment.<br>To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
}

var met_rhythm = {
    type: 'binary-audio',
    json_label: 'MET-Rhythm-EngNat',
    preamble: header + '<h2>Musical Ear Test</h2><h3>Comparison of Rhythmic Phrases</h3>',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Example ',
    example_num_type: 'alphabetic',
    audio: '/study_assets/MusicLang/audio/met-rhythm-engnat.mp3',
    test_length: 10 //611:length+15:grace
}

var inst_melody = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2><p>Please wear headphones for the duration of this experiment.<br>To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
}

var met_melody = {
    type: 'binary-audio',
    json_label: 'MET-Melody-EngNat',
    preamble: header + '<h2>Musical Ear Test</h2><h3>Comparison of Melodic Phrases</h3>',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Example ',
    example_num_type: 'alphabetic',
    audio: '/study_assets/MusicLang/audio/met-melody-engnat.mp3',
    test_length: 10 //617:length+15:grace 
}

var rpcv={
    type: 'passage-highlight',
    json_label: 'RPCV_MA',
    preamble: header + '<h2>RPCV</h2>',
    audio:  '',
    allow_audio_control: false,
    test_length: 500, //617:length+15:grace
    default_correct: true,
    correct_color: '#00ff00',
    incorrect_color: '#ff1900',
    word_tag_char: '/',
    text_file: '/study_assets/MusicLang/text/RPCV_MA.txt',
    text_file_language: 'mandarin'
}

jatos.onLoad(
    jsPsych.init({
        //Questionaire:
        //production timeline:
        //timeline: [info, contact, personal, gender, background, dominant_languages, language_details, musical_summary, musical_detail],
        //timeline for testing: 
        //timeline: [contact, personal, musical_summary, musical_detail],
        timeline: [inst_rhythm, met_rhythm, inst_melody, met_melody, rpcv],
        show_progress_bar: true,
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
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id');
            var resultsJSON = results.json();
            resultsJSON = '"' + jatos.studyResultId + '": ' + resultsJSON;
            jatos.submitResultData(resultsJSON, jatos.startNextComponent);
        }
    })
);