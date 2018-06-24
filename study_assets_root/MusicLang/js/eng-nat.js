//var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"/study_assets/MusicLang/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab MusicLang Experiment</h1>"; //to be prepended to preludes

var inst_rhythm = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2> Please wear headphones for the duration of this experiment. To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
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
        header + '<h2>Instructions</h2> Please wear headphones for the duration of this experiment. To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
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
    test_length: 10, //617:length+15:grace
    default_correct: true,
    word_tag_char1: '#',
    word_tag_char2: '@',
    text: '<p>Mary is having a busy #@week#. She is worried about her son, Andrew, who is #@sick#, so it was hard for her to keep #@track# of her schedule. She almost forgot about the #@special# dinner tonight, even though she had #@written# it down in red #@pen# so she would remember. She doesn’t want to go to the dinner with Andrew at home, but she knows it is #@important# because it is her friend’s birthday. The #@babysitter# should arrive at their house #@soon#. </p><p>Mary feels Andrew’s cheek. He must have a fever, because it felt very warm. </p><p>“Come on, Andrew. The doctor said you have to take this #@pill# once a day,” she says to her son. </p><p>Before Andrew could #@argue#, Mary had put the medicine in his #@mouth#. Mary put a cool #@towel# on Andrew’s hot #@forehead# and runs her fingers through his #@silky# brown hair just as the #@doorbell# rings. </p><p>“Hi, Sophie, how are you?” says Mary as she #@opens# the door to the babysitter. </p><p>“I’m #@fine#, thanks, Mary. It’s been #@raining# so I got some #@mud# on my shoes though. How’s Andrew?” asks Sophie. </p><p>“He’s not #@feeling# well so I’m worried about him. He’s #@sleeping# right now,” says Mary. </p><p>“Don’t worry, Mary. Andrew is #@safe# with me,” says Sophie. Mary #@waves# goodbye to Sophie as she leaves the house. She #@throws# her #@leather# purse onto the front #@seat# of her #@car# and drives away. </p><p> Mary loves #@pizza# and when she arrives at the restaurant, she is #@excited# to see a large sign on the #@roof# that says “Daniella’s Pizzeria.” The restaurant is beautiful, and the #@first# thing Mary sees is a big #@painting# on the walls. Mary enjoys a wonderful #@meal# with her friends. The pizza was #@delicious#, but the best part was the #@spiced# apple pie. Mary could still #@taste# the #@cinnamon# and #@cloves# on her tongue as she #@drove# home to her son.</p>',
    text_language: 'english'
}

jatos.onLoad(
    jsPsych.init({
        //Questionaire:
        //production timeline:
        //timeline: [info, contact, personal, gender, background, dominant_languages, language_details, musical_summary, musical_detail],
        //timeline for testing: 
        //timeline: [contact, personal, musical_summary, musical_detail],
        timeline: [rpcv],
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