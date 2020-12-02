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
    data: {test_part: 'qre', stimulus: 'USA'}
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
	     data: {test_part: 'qre', stimulus: 'state'}
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
	{ audio: 'shared_assets/audio/k/2_kasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']}
];

var audio2 = [
	{ audio: 'shared_assets/audio/k/2_kasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']}
];

var audio3 = [
	{ audio: 'shared_assets/audio/k/2_kasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']}
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

// now let's welcome people to the study
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

	//and add this to the timeline
	timeline.push(preloadaudio1, USA, if_node, welcome);

	//this upcoming trial will show instructions to the subject.
	var instructions = {
		type: 'html-slider-response',
		data: {test_part: 'instructions'},
		stimulus: 
		"<h2>Instructions</h2><p>In this experiment, you will listen to several nonsense words and then tell us what you heard.</p>" +
		" <p>Each nonsense word begins with 'g' or 'k'. After hearing the word, you will use a sliding scale from 'g' to 'k' to indicate whether you heard a 'g' or a 'k'. " +
		" If you heard a normal English 'g' slide the scale all the way towards the 'g' side. Slide it all the way to the 'k' side for a typical English 'k'." +
		" Otherwise, use the scale to indicate whether the sound you heard was closer to a typical English 'g' or 'k'.</p>" +
		"<p> An example slider is provided below. </p>",
		prompt: "<p>Please respond as accurately as possible while still responding quickly.</p>" +
		"<p>There will be a few practice trials. </p><p>Click <i>continue</i> to begin the practice trials.</p>",
		labels: ['g', 'k'],
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
// define audio bank for practice trials
var practiceaudio = [
	{ practiceaudio: 'shared_assets/audio/k/2_kusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/2_khusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/2_gusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/2_ghusu1.mp3', data: {speaker: "2", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/3_kusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/3_khusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/3_gusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/3_ghusu1.mp3', data: {speaker: "3", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/4_kusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/4_khusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/4_gusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/4_ghusu1.mp3', data: {speaker: "4", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/5_kusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/k/5_khusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/5_gusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ practiceaudio: 'shared_assets/audio/g/5_ghusu1.mp3', data: {speaker: "5", test_part: 'practice', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
];


// Define standard practice trial procedure: audio + response //

var practice_procedure = {
	timeline: [
			{
			type: 'audio-keyboard-response',
			data: jsPsych.timelineVariable('data'),
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

// audio bank for ALL test trials
var audio = [
	{ audio: 'shared_assets/audio/k/2_kasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu1.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu1.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu1.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu1.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '1', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu2.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu2.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu2.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu2.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '2', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_kusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_kusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_kusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_kusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'k'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_gusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_gusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_gusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_gusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'g'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/2_khasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/3_khasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/4_khasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/k/5_khasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'kh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghasa3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghasa3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghasa3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghasa3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'asa', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghisi3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghisi3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghisi3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghisi3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'isi', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/2_ghusu3.mp3', data: {speaker: "2", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/3_ghusu3.mp3', data: {speaker: "3", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/4_ghusu3.mp3', data: {speaker: "4", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']},
	{ audio: 'shared_assets/audio/g/5_ghusu3.mp3', data: {speaker: "5", test_part: 'test', vowel: 'usu', token: '3', stimtype: 'gh'}, segments: "<b>g</b> to <b>k</b>", choices: ['g','k']}
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
			data: jsPsych.timelineVariable('data'),
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

		timeline.push(test_instructions, preloadaudio3, test_procedure, rest, test_procedure);


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
				var all_data = jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}]);		
        	    var results = all_data.ignore('internal_node_id').ignore('time_elapsed').ignore('trial_name').ignore('question_count').ignore('key_press').ignore('trial_type').ignore('value').ignore('preload');
            	jatos.submitResultData(results.csv(), jatos.startNextComponent);
			}
		})
	}
	);
