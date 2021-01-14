// ConAssim - reboot Nov 2020!
/* For this study, participants will complete a short questionnaire, followed by a few separate questions specifically at the beginning of the experiment.
After they have finished answering the questions, they will be given instructions about the main experiment.
The main experiment presents a series of Marathi stops and participants will be asked to judge their perception on a 1-6 Likert scale.
There will be 4 blocks of 72 trials, with 3 breaks in total.*/

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img>"; //to be prepended to preludes

	//create a variable called "timeline"; this is what we'll add our trials to
	var timeline = [];

	//initiate data object, so we can get a subject number from JATOS and show it in debrief
	var resultData = {};
    
   
	var USA = {
    type: 'survey-yes-no',
    preamble: header + "<h2>Additional Background Information</h2>",
    questions: [
        {prompt: "Were you born in the United States of America?"}
    ],
    json_label: 'USA',
    on_load: function () {
        validate_USA();
        form = document.getElementById("jspsych-content");
        toggle_listeners(form, true, validate_USA);
    },
    on_finish: function () {
        toggle_listeners(form, false, validate_USA);
    },
    data: {test_part: 'qre', stimulus:'USA'}
};

	var state = {
	    type: 'survey-text-custom',
	    preamble: header + "<h2>Additional Background Information</h2>",
	    json_label: 'state',
	    questions: [
	        {prompt: "What state or territory were you born in?"},

	    ],
	    on_load: function () {
	        validate_state();
	        form = document.getElementById("jspsych-content");
	        toggle_listeners(form, true, validate_state);
	    },
	    on_finish: function () {
	        toggle_listeners(form, false, validate_state);
	    },
	     data: {test_part: 'qre', stimulus:'state'}
	};

var if_node = {
    timeline: [state],
    conditional_function: function(){
        // get the data from the previous trial
        var data = jsPsych.data.get().filter({test_part:'qre'}).last(1).values()[0];
        if(data.q1 == true){
            return true;
        } else {
            return false;
        }
    }
};

// three different ways of preloading audio: 
// 1. preload in 3 chunks (e.g. by token) at the very beginning, prior to the practice phase and prior to the test phase
var audio1 = [
	{ audio: 'shared_assets/audio/t/2_tasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']}
];

var audio2 = [
	{ audio: 'shared_assets/audio/t/2_tasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']}
];

var audio3 = [	
	{ audio: 'shared_assets/audio/t/2_tasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']}
];


var preloadaudio1 = {
	timeline_variables: audio1,
	data: {test_part: 'preload'},
	timeline: [
		{
						type: "call-function",
						async: true,
						func: function (done) {
							jsPsych.getDisplayElement().innerHTML = '<p>Loading experiment files... Please wait.</p>'
								jsPsych.pluginAPI.preloadAudioFiles([jsPsych.timelineVariable('audio', true)], function () {
										done({ preload: "success" });
									})
							}
					}
				]
			};

var preloadaudio2 = {
	timeline_variables: audio2,
	data: {test_part: 'preload'},
	timeline: [
		{
						type: "call-function",
						async: true,
						func: function (done) {
							jsPsych.getDisplayElement().innerHTML = '<p>Loading experiment files... Please wait.</p>'
								jsPsych.pluginAPI.preloadAudioFiles([jsPsych.timelineVariable('audio', true)], function () {
										done({ preload: "success" });
									})
							}
					}
				]
			};


var preloadaudio3 = {
	timeline_variables: audio3,
	data: {test_part: 'preload'},
	timeline: [
		{
						type: "call-function",
						async: true,
						func: function (done) {
							jsPsych.getDisplayElement().innerHTML = '<p>Loading experiment files... Please wait.</p>'
								jsPsych.pluginAPI.preloadAudioFiles([jsPsych.timelineVariable('audio', true)], function () {
										done({ preload: "success" });
									})
							}
					}
				]
			};

// now let's welcome people to the study!
var welcome = {
	type: 'instructions',
		pages: [
			'<h2>Welcome!</h2><p>This study involves listening to audio clips. ' +
		'Please <b>put on your headphones</b>.</p><p> To make sure your headphones are set to a ' +
		'comfortable volume, play the following audio clip and adjust accordingly.</p><audio preload="auto" controls><source src="shared_assets/audio/sample.mp3" type="audio/mpeg"></audio>' +
		'<p>This study takes about 25 minutes. You will be given 3 breaks throughout the study.</p>' +
		'<p>Click <i>next</i> to continue.</p>',
	],
	data: {test_part: 'instructions'},
		show_clickable_nav: true,
		button_label_next: 'Next',
		allow_keys: false
};
	
	timeline.push(preloadaudio1, USA, if_node, welcome)



	//this upcoming trial will show instructions to the subject.
	var instructions = {
		type: 'html-slider-response',
		data: {test_part: 'instructions'},
		stimulus: 
		"<h2>Instructions</h2><p>In this experiment, you will listen to several nonsense words and then tell us what you heard.</p>" +
		" <p>Each nonsense word begins with 'd' or 't'. After hearing the word, you will use a sliding scale from 'd' to 't' to indicate whether you heard a 'd' or a 't'. " +
		" If you heard a normal English 'd' slide the scale all the way towards the 'd' side. Slide it all the way to the 't' side for a typical English 't'." +
		" Otherwise, use the scale to indicate whether the sound you heard was closer to a typical English 'd' or 't'.</p>" +
		"<p> An example slider is provided below. </p>",
		prompt: "<p>Please respond as accurately as possible while still responding quickly.</p>" +
		"<p>There will be a few practice trials. </p><p>Click <i>continue</i> to begin the practice trials.</p>",
		data: {test_part: 'instructions'},
		labels: ['d', 't'],
		min: 1,
		max: 6,
		start: 1,
		step: 1,
		slider_width: 500,
	};
	timeline.push(instructions)

// Define practice and test trial instructions
var practice_instructions = {
type: "instructions",
pages: [
	'<h2><b> Practice Trials </b></h2> <p> There will be a few practice trials.<p> <p>You will hear a sound over your headphones.' +
	' Please respond with what you perceived by sliding the bar to the preferred position.</p>' +
	'<p>Click <i> next </i> to start the practice trials.</p>',
],
data: {test_part: 'instructions'},
show_clickable_nav: true,
	button_label_next: 'Next',
	allow_keys: false,
timing_post_trial: 8000
};


var test_instructions = {
type: "instructions",
pages: [
	'<h2><b> Test Trials </b></h2> <p>The practice trials are over.</p>' +
	'<p>The test trials will now begin. Click <i> next </i> to continue.</p>',
],
data: {test_part: 'instructions'},
show_clickable_nav: true,
	button_label_next: 'Next',
	allow_keys: false,
timing_post_trial: 8000
};

	// Participants get breaks every 72 trials; they need to click Next to continue. They get 3 breaks in total.
	var rest = {
		type: 'instructions',
			pages: [
				'<h2>Break time!</h2><p> Feel free to do as you like, but please stay on this screen.</p><p> Click <i>next</i> to continue when you are ready.</p>',
		],
		data: {test_part: 'instructions'},
			show_clickable_nav: true,
			button_label_next: 'Next',
			allow_keys: false
	};


// Practice Trial Instructions; 16 total tokens from /usu/ - one from each speaker (4) - one of each laryngeal type (4)
// define audio stimuli for practice trials
var practiceaudio = [
	{ practiceaudio: 'shared_assets/audio/t/2_tusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/2_thusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/2_dusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/2_dhusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/3_tusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/3_thusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/3_dusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/3_dhusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/4_tusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/4_thusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/4_dusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/4_dhusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/5_tusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/t/5_thusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/5_dusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ practiceaudio: 'shared_assets/audio/d/5_dhusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
];

// Define standard practice trial procedure: audio + response //

var practice_procedure = {
	timeline: [
			{
			type: 'audio-keyboard-response',
			data: {test_part: 'audio'},
			stimulus: jsPsych.timelineVariable('practiceaudio'),
			prompt: "",
			choices: jsPsych.NO_KEYS,
			trial_duration: 1750

		},
			{
					type: 'html-slider-response',
					data: jsPsych.timelineVariable('data'),
					stimulus: function(){return "What sound did you perceive from <p>"+jsPsych.timelineVariable('segments',true)+"</p>";},
					labels: jsPsych.timelineVariable('choices'),
					min: 1,
					max: 6,
					start: 1,
					step: 1,
					slider_width: 500,
					response_ends_trial: 'true'
			},
    ],
		timeline_variables: practiceaudio,
         randomize_order: true,
			 };
			 
	timeline.push(practice_instructions, preloadaudio2, practice_procedure);



// audio stimuli for ALL test trials
var audio = [
	{ audio: 'shared_assets/audio/t/2_tasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_tusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_tusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_tusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_tusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 't'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_disi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_disi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_disi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_disi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'd'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/2_thusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/3_thusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/4_thusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/t/5_thusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'th'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/2_dhusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/3_dhusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/4_dhusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']},
	{ audio: 'shared_assets/audio/d/5_dhusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'dh'}, segments: "<b>d</b> to <b>t</b>", choices: ['d','t']}
];

// Define standard test trial procedure: audio + response //
/* if we want the audio to play completely before they can answer, replace the timeline variables with the following...
	timeline: [
			{
					type: 'html-keyboard-response',
					stimulus: '+',
					choices: jsPsych.NO_KEYS,
					trial_duration: 250
			},
			{
			type: 'audio-keyboard-response',
			stimulus: jsPsych.timelineVariable('audio'),
			prompt: "",
			choices: jsPsych.NO_KEYS,
			trial_duration: 1500

		},
			{
					type: 'html-slider-response',
					data: jsPsych.timelineVariable('data'),
					stimulus: function(){return "What sound did you perceive from <p>"+jsPsych.timelineVariable('segments',true)+"</p>";},
					labels: jsPsych.timelineVariable('choices'),
					min: 1,
					max: 6,
					start: 1,
					step: 1,
					slider_width: 500,
					response_ends_trial: 'true'
			}

*/

/* if you want the audio to play with the audio-slider-response, replace the timeline variables with the following...
	timeline: [
{
		type: 'html-keyboard-response',
		data: {test_part: 'fixation'},
		stimulus: '+',
		choices: jsPsych.NO_KEYS,
		trial_duration: 200
},
{
		type: 'audio-slider-response',
		stimulus: jsPsych.timelineVariable('audio'),
		data: jsPsych.timelineVariable('data'),
		prompt: function(){return "What sound did you perceive from <p>"+jsPsych.timelineVariable('segments',true)+"?</p>";},
		labels: jsPsych.timelineVariable('choices'),
		min: 1,
		max: 6,
		start: 1,
		step: 1,
		slider_width: 500,
		response_ends_trial: 'true'
}
*/

/* IF YOU WANT TO PRELOAD BEFORE EVERY TRIAL, add following at the beginning of the timeline
	timeline: [
{
	type: "call-function",
 async: true,
 func: function (done) {
		 jsPsych.pluginAPI.preloadAudioFiles([jsPsych.timelineVariable('audio', true)], function () {
				 done({ preload: "success" });
})
}
},

*/

var test_procedure = {
	timeline: [
			{
			type: 'audio-keyboard-response',
			data: {test_part: 'audio'},
			stimulus: jsPsych.timelineVariable('audio'),
			prompt: "",
			choices: jsPsych.NO_KEYS,
			trial_duration: 1750

		},
			{
					type: 'html-slider-response',
					data: jsPsych.timelineVariable('data'),
					stimulus: function(){return "What sound did you perceive from <p>"+jsPsych.timelineVariable('segments',true)+"</p>";},
					labels: jsPsych.timelineVariable('choices'),
					min: 1,
					max: 6,
					start: 1,
					step: 1,
					slider_width: 500,
					response_ends_trial: 'true'
			},
			{
		timeline: [rest],
		conditional_function: function(){
			return jsPsych.data.get().filter({test_part: 'test'}).count() == 72;
		}
	}
    ],
    timeline_variables: audio,
		randomize_order: true
};

var test_procedure2 = {
	timeline: [
			{
			type: 'audio-keyboard-response',
			data: {test_part: 'audio'},
			stimulus: jsPsych.timelineVariable('audio'),
			prompt: "",
			choices: jsPsych.NO_KEYS,
			trial_duration: 1750

		},
			{
					type: 'html-slider-response',
					data: jsPsych.timelineVariable('data'),
					stimulus: function(){return "What sound did you perceive from <p>"+jsPsych.timelineVariable('segments',true)+"</p>";},
					labels: jsPsych.timelineVariable('choices'),
					min: 1,
					max: 6,
					start: 1,
					step: 1,
					slider_width: 500,
					response_ends_trial: 'true'
			},
			{
		timeline: [rest],
		conditional_function: function(){
			return jsPsych.data.get().filter({test_part: 'test'}).count() == 144;
		}
	}
    ],
    timeline_variables: audio,
		randomize_order: true
};
timeline.push(test_instructions, preloadaudio3, test_procedure, rest, test_procedure2);


var end = {
		type: 'instructions',
		data: {test_part: 'instructions'},
		pages: [ '<h2>Study Complete</h2>' +
			'<p>Thank you for participating!</p>' +
			"<p>This study is investigating how people perceive sounds from languages other than their native language.</p>" +
			"<p>In particular, we are investigating how English speakers perceive sounds from Marathi, a language originating from Maharashtra, India.</p>" +
			"<p>We hope this will help us understand how different acoustic properties affect English native speakers' perception of speech sounds.</p>" +
		"<p><b>Click <i>next</i> to receive your completion code.</b></p>"],
		show_clickable_nav: true,
		button_label_next: "Next",
		allow_keys: false
};

 timeline.push(end);

	/* now that we have complete timeline, we have to wrap it all up in a JATOS wrapper in order to run on JATOS.
	Add columns for subject (regular + prolific), then we tell jsPsych to run it.*/

	jatos.onLoad(function() {
var prolificID = jatos.urlQueryParameters.PROLIFIC_PID;   // accesses prolific ID from the URL
var studyID = jatos.studyResultId;  // creates a study ID for debrief & RPS purposes
jsPsych.data.addProperties({subject : studyID});     // adds study ID to results data //
jsPsych.data.addProperties({prolificID : prolificID});   // adds prolific ID to results data

jsPsych.init({
	timeline: timeline,

	use_webaudio: false,
// remove preloading parameters if you are preloading before each block/trial else keep if preloading all files @ beginning of experiment!
	/*preload_audio: preloadallaudio,
		max_load_time: 180000, // can increase to make it longer (3 mins rn)
		max_preload_attempts: 10,
		*/

			on_finish: function(data) {
				// jsPsych.data.displayData("CSV");
				//to submit the results to JATOS...
				var all_data = jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}, {test_part: 'qre'}, {test_part: 'audio'}]);		
        	    var results = all_data.ignore('internal_node_id').ignore('time_elapsed').ignore('trial_name').ignore('question_count').ignore('key_press').ignore('trial_type').ignore('value').ignore('preload');
            	jatos.submitResultData(results.csv(), jatos.startNextComponent);
			}
		})
	}
	);