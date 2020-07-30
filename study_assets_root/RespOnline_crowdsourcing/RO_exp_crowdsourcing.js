/* Following this tutorial: https://www.jspsych.org/tutorials/rt-task/
	Here are the comments I would have put in the preamble if I'd had the ability to...
		the value between the <title> tags is what shows up as the title of the webpage.
		the next 3 lines, both <script> tags, tell it to use certain modules of jspsych.
		after that, we add a reference to JATOS so that we'll be able to use that, too!
			<script src="/assets/javascripts/jatos.js"><\/script>
			\\delete the other \
		then the <link> tags part controls the aesthetic look of the study.
		I don't know what the <body> tags do, but I assume it's important :)
		then we get into the body of the experiment.

Description
In RespOnline, participants listen to sounds along three continua (d-b, d-n, m-n),
while breathing through either their nose or their mouth, and identify the sounds.
Participants first complete the online consent form and questionnaire. Afterwards, participants
receive instructions on-screen which allows them to adjust the volume to a comfortable level.
On this instructions page, participants are also told that the study requires them to breathe
through their nose and that if they are unable to do so, that they are not eligible for the study.
The text also advises that the participant considers completing the study another day if they
are currently experiencing a cold. After they have read the instructions and have adjusted
their volume, participants are randomly assigned to be instructed either to breathe through
their nose first then breathe through their mouth, or vice versa. Stimuli will be presented the
following order: 1) a small drawing of a nose or mouth is quickly shown on the screen, 2) audio is played on
a blank screen, 3) one of the following is displayed on the screen: "ADA or ABA?","ADA or ANA?", "AMA or ANA?". Participants will
identify which sound they heard by pressing the left or right arrow key (e.g. "ADA or ABA?", D = left,
B = right). Within each condition (nose, mouth), participants will be given 7 (3 within each block, 1 between)
breaks. After completing all trials, participants will be thanked for their participation and given a participant
ID (so we can identify people) which they will need to provide when they claim their RPS credits
from the lab.
	*/

	//blur count; counts how many times a subject changes out of the experiment tab --
	// too many will result in participant being flagged "-likely-invalid"
	var blur_count = 0; //number of times subject's focus leaves tab
	var likely_invalid = false; //gets set to true if blur_count>threshold

	//create a variable called "timeline"; this is what we'll add our trials to
	var timeline = [];

	//initiate data object, so we can get a subject number from JATOS and show it in debrief
	var resultData = {};

	//for the RespOnSite version, participants read this after completing the questionnaire...
	/* Remove /* if running RespOnSite...
		var after_q = {
		type: "instructions",
		pages: [
		"<h2>Thank you for completing the questionnaire!</h2><p>Please notify the experimenter that you are finished.</p><p>Click<i> Next</i> when instructed.",
		],
		show_clickable_nav: true,
   		button_label_next: 'Next',
   	 	allow_keys: false,
		timing_post_trial: 8000
	};

	timeline.push(after_q);*/

	//now let's welcome people to the study
	var welcome = {
		type: 'instructions',
   		pages: [
        '<h2>Instructions</h2><p>This study involves tasks that involve listening to audio clips. ' +
			'Please <b>put on your headphones</b>.</p><p> To make sure your headphones are set to a ' +
			'comfortable volume, play the following audio clip and adjust accordingly.</p><audio preload="auto" controls><source src="shared_assets/audio/sample.mp3" type="audio/mpeg"></audio>' +
			'<p>This study also requires you to breathe through your nose.</p><p> *NOTE: If you are congested ' +
			'or are unable to breathe through your nose due to other reasons, you are <b>not</b> eligible for the study. ' +
			'If you are congested, please consider doing this study another day.</p>' +
			'<p>This study takes about 25 minutes. You will be given 7 breaks throughout the study.</p>' +
			'<p>Click <i>Next</i> to continue.</p>',
    ],
    	show_clickable_nav: true,
    	button_label_next: 'Next',
    	allow_keys: false
};

	//and add this to the timeline
	timeline.push(welcome);

	//this upcoming trial will show instructions to the subject.
	var instructions = {
		type: "instructions",
		pages: [
		"<p>In this experiment, we ask you to <b>breathe</b> in a " +
			"certain way while <b>identifying sounds</b>.</p>" +
			"<p>In each trial, you will hear one of two sounds over the headphones, " +
			"and you will identify which one you heard by pressing the <b>left</b> "+
			"or <b>right</b> arrow, as indicated.</p>" +
			"<p>Please respond as quickly and accurately as possible.</p>" +
			"<p>During certain blocks of trials, you will be asked to breathe <b>" +
			"only through your mouth</b>, and in others you will be asked to breathe "+
			"<b>only through your nose</b>. Please pay attention to which "+
			"block you are in as you do the study.</p>" +
			"<p>Click <i>Next</i> to begin the study.</p>", // in the RespOnSite version, the experimenter re-explains the instructions verbally before the participant begins the study.
		],
		show_clickable_nav: true,
   		button_label_next: 'Next',
   	 	allow_keys: false,
		timing_post_trial: 8000
	};

	//and add this to the instructions as well!
	timeline.push(instructions);

/*These are the instructions from the BreathSpeech ethics approval:
In this study we will ask you to breathe in a certain way for short periods while identifying auditory sounds.

Please put on headphones for this task, and adjust sound levels to a comfortable volume.
In a single experimental trial, you will hear one of two sounds over the headphones,
and please identify these sounds as being [Sound A response, like “ada” or “flute”] or
[Sound B response, like “ana” or “bassoon”] by pressing the indicated keys on the keyboard.
 Your responses should be made as quickly but also as accurately as possible.
 Your responses and reaction times will be recorded.

You will complete several blocks of trials, each of which will last a few minutes.
In total, this study will last 5-10 minutes. In some blocks of trials,
you will be asked to breathe through your mouth (and not through your nose)
while doing this auditory perception task. In other blocks of trials,
you will be asked to breathe through your nose (and not through your mouth)
while doing the task. Please follow the text prompts given to you before each block.

There is a brief practice phase before the actual study begins. Press any key to continue.
*/

	// Here are the instructions for the FIRST of the two blocks, nose or mouth depending on the random integer they get.
	var nose_instr = {
		type: 'image-keyboard-response',
		data: {test_part: 'instructions', blocktype: 'nose'},
		stimulus: 'shared_assets/img/nose.jpeg',
		prompt: '<p>For this upcoming block, <b>breathe only through your nose.</b></p>',
		choices: jsPsych.NO_KEYS,
		trial_duration: 2000
	};

	var mouth_instr = {
		type: 'image-keyboard-response',
		data: {test_part: 'instructions', blocktype: 'mouth'},
		stimulus: 'shared_assets/img/mouth.png',
		prompt: '<p>For this upcoming block, <b>breathe only through your mouth.</b></p>',
		choices: jsPsych.NO_KEYS,
		trial_duration: 2000
	};

	//get an integer between 0-479
	randomint = Math.floor(Math.random()*480);

	//random choice between mouth block and nose block, dleft and dright
	//dleft
	if(randomint > 359){
		timeline.push(nose_instr);
		dvalue = "leftarrow";
		nvalue = "rightarrow";
	} else if(randomint > 239){
		timeline.push(mouth_instr);
		dvalue = "leftarrow";
		nvalue = "rightarrow";
	//dright
	} else if(randomint > 119){
		timeline.push(nose_instr);
		dvalue = "rightarrow";
		nvalue = "leftarrow";
	} else if(randomint < 120){
		timeline.push(mouth_instr);
		dvalue = "rightarrow";
		nvalue = "leftarrow";
	}

	// These define the parts of the main procedure.
	var fixation_nose = {
		type: 'image-keyboard-response',
		data: {test_part: 'fixation', blocktype: 'nose'},
		stimulus: 'shared_assets/img/nose-small.jpeg',
		prompt: '',
		choices: jsPsych.NO_KEYS,
		trial_duration: 500
	};

	var fixation_mouth = {
		type: 'image-keyboard-response',
		data: {test_part: 'fixation', blocktype: 'mouth'},
		stimulus: 'shared_assets/img/mouth-small.png',
		prompt: '',
		choices: jsPsych.NO_KEYS,
		trial_duration: 500
	};

	var audiopresentation = {
		type: 'audio-keyboard-response',
		data: {test_part: 'test'},
		stimulus: jsPsych.timelineVariable('stimulus'),
		prompt: "",
		choices: jsPsych.NO_KEYS,
		trial_duration: 1100
	};

	var responselog = {
		type: 'html-keyboard-response',
		stimulus: "",
		data: jsPsych.timelineVariable('data'),
		prompt: function(){return "Do you hear <p>"+jsPsych.timelineVariable('segments',true);},
		choices: jsPsych.timelineVariable('choices'),
		on_finish: function(data){
			if(data.key_press){
				data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
			}/*
			else{
   				return
   			}*/
		},
		trial_duration: 15000
	};

	// Participants get breaks every 60 trials; they need to click Next to continue.
	var nose_rest = {
		type: 'image-keyboard-response',
		data: {test_part: 'fixation', blocktype: 'nose'},
  		stimulus: 'shared_assets/img/nose.jpeg',
  		prompt: '<h2>Break time!</h2><p> Feel free to breathe as you like, but please stay on this screen.</p><p>Remember to return to <b>nose-breathing</b> at the end of the break!</p><p> Press the <i>spacebar</i> to continue when you are ready.</p>',
  		choices: [32],
	};

	var mouth_rest = {
		type: 'image-keyboard-response',
		data: {test_part: 'fixation', blocktype: 'mouth'},
  		stimulus: 'shared_assets/img/mouth.png',
  		prompt: '<h2>Break time!</h2><p> Feel free to breathe as you like, but please stay on this screen.</p><p>Remember to return to <b>mouth-breathing</b> at the end of the break!</p><p> Press the <i>spacebar</i> to continue when you are ready.</p>',
  		choices: [32],
  	};

	// Here are instructions between nose and mouth block or vice versa; they will also need to click Next to continue.
	var instr_btwn = {
		type: "instructions",
		pages: [
		"<h2>You're halfway through!</h2><p> Click <i>Next</i> to continue when you are ready.</p>"
		],
  	 	show_clickable_nav: true,
    	button_label_next: 'Next',
    	allow_keys: false
	};
// CONTINUA UPDATED ON JULY. 3RD [bd: 20-69, dn: 32-81, mn: 25-64]
	// Below is the test stimuli bank with all the audio stimuli organized in 8 different playlists (4 each block type) with versions in each dleft and dright. Participants will get all 4 in random order, depending on their random integer.
		// DLEFT
		// nose blocktype
		// nose playlist 1
		var test_stimuli_dleft_nose1 = [
				{stimulus: 'shared_assets/audio/bd/stimulus020.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus024.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus028.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus062.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus066.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/032.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/036.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/040.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/074.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/078.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/025.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/029.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/033.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/067.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/071.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

		// nose playlist 2
		var test_stimuli_dleft_nose2 = [
				{stimulus: 'shared_assets/audio/bd/stimulus022.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus026.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus060.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus064.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus068.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/034.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/038.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/072.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/076.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/080.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/027.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/031.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/065.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/069.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/073.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

			// nose playlist 3
			var test_stimuli_dleft_nose3 = [
				{stimulus: 'shared_assets/audio/bd/stimulus021.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus025.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus029.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus063.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus067.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/033.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/037.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/041.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/075.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/079.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/026.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/030.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/034.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/068.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/072.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

			// nose playlist 4
			var test_stimuli_dleft_nose4 = [
				{stimulus: 'shared_assets/audio/bd/stimulus023.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus027.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus061.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus065.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus069.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/035.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/039.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/073.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/077.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/081.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/028.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/032.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/066.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/070.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/074.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}}
				];

		// mouth blocktype
		// mouth playlist 1
		var test_stimuli_dleft_mouth1 = [
				{stimulus: 'shared_assets/audio/bd/stimulus020.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus024.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus028.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus062.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus066.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/032.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/036.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/040.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/074.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/078.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/025.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/029.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/033.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/067.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/071.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

		// mouth playlist 2
		var test_stimuli_dleft_mouth2 = [
				{stimulus: 'shared_assets/audio/bd/stimulus022.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus026.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus060.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus064.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus068.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/034.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/038.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/072.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/076.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/080.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/027.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/031.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/065.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/069.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/073.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

			// mouth playlist 3
			var test_stimuli_dleft_mouth3 = [
				{stimulus: 'shared_assets/audio/bd/stimulus021.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus025.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus029.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus063.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus067.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/033.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/037.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/041.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/075.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/079.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/026.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/030.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/034.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/068.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/072.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				];

			// mouth playlist 4
			var test_stimuli_dleft_mouth4 = [
				{stimulus: 'shared_assets/audio/bd/stimulus023.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus027.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus061.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus065.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				{stimulus: 'shared_assets/audio/bd/stimulus069.wav', segments: "<b>ADA</b> (left) or <b>ABA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'db'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/035.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/039.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/073.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/077.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				{stimulus: 'shared_assets/audio/dn/081.wav', segments: "<b>ADA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'dn'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/028.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/032.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/066.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/070.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}},
				{stimulus: 'shared_assets/audio/mn/074.wav', segments: "<b>AMA</b> (left) or <b>ANA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'mn'}}
				];

		// DRIGHT
		//nose blocktype
		// nose playlist 1
		var test_stimuli_dright_nose1 = [
				{stimulus: 'shared_assets/audio/bd/stimulus020.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus024.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus028.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus062.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus066.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/032.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/036.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/040.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/074.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/078.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/025.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/029.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/033.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/067.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/071.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

		// nose playlist 2
		var test_stimuli_dright_nose2 = [
				{stimulus: 'shared_assets/audio/bd/stimulus022.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus026.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus060.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus064.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus068.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/034.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/038.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/072.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/076.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/080.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/027.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/031.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/065.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/069.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/073.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

			// nose playlist 3
			var test_stimuli_dright_nose3 = [
				{stimulus: 'shared_assets/audio/bd/stimulus021.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus025.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus029.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus063.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus067.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/033.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/037.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/041.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/075.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/079.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/026.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/030.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/034.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/068.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/072.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

			// nose playlist 4
			var test_stimuli_dright_nose4 = [
				{stimulus: 'shared_assets/audio/bd/stimulus023.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus027.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus061.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus065.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus069.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/035.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/039.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/073.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/077.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/081.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/028.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/032.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/066.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/070.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/074.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "nose", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}}
				];

		// mouth blocktype
		// mouth playlist 1
		var test_stimuli_dright_mouth1 = [
				{stimulus: 'shared_assets/audio/bd/stimulus020.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus024.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus028.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus062.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus066.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/032.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/036.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/040.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/074.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/078.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/025.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/029.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/033.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/067.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/071.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

		// mouth playlist 2
		var test_stimuli_dright_mouth2 = [
				{stimulus: 'shared_assets/audio/bd/stimulus022.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus026.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus030.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus034.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus038.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus042.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus046.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus050.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus054.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus058.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus032.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus036.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus040.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus044.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus048.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus052.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus056.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus060.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus064.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus068.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/034.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/038.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/042.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/046.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/050.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/054.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/058.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/062.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/066.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/070.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/044.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/048.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/052.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/056.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/060.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/064.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/068.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/072.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/076.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/080.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/027.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/031.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/035.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/039.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/043.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/047.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/051.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/055.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/059.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/063.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/037.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/041.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/045.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/049.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/053.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/057.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/061.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/065.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/069.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/073.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

			// mouth playlist 3
			var test_stimuli_dright_mouth3 = [
				{stimulus: 'shared_assets/audio/bd/stimulus021.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus025.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus029.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus063.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus067.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/033.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/037.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/041.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/075.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/079.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/026.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/030.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/034.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/068.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/072.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				];

			// mouth playlist 4
			var test_stimuli_dright_mouth4 = [
				{stimulus: 'shared_assets/audio/bd/stimulus023.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus027.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus031.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus035.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus039.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus043.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus047.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus051.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus055.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus059.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus033.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus037.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus041.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus045.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus049.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus053.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus057.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus061.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus065.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				{stimulus: 'shared_assets/audio/bd/stimulus069.wav', segments: "<b>ABA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'bd'}},
				//dn bracket now
				{stimulus: 'shared_assets/audio/dn/035.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/039.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/043.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/047.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/051.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/055.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/059.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/063.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/067.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/071.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/045.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/049.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/053.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/057.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/061.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/065.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/069.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/073.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/077.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				{stimulus: 'shared_assets/audio/dn/081.wav', segments: "<b>ANA</b> (left) or <b>ADA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nd'}},
				//mn block
				{stimulus: 'shared_assets/audio/mn/028.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/032.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/036.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/040.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/044.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/048.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/052.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/056.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/060.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/064.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/038.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/042.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/046.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/050.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/054.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/058.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/062.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/066.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/070.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}},
				{stimulus: 'shared_assets/audio/mn/074.wav', segments: "<b>ANA</b> (left) or <b>AMA</b> (right)", choices: ['leftarrow','rightarrow'], data: {blocktype: "mouth", dvalue: dvalue, nvalue: nvalue, test_part: 'test', stimtype: 'nm'}}
				];
		// test stimuli bank ends here.

	// size variable: x number of trials
	var blocksize;
		blocksize = 60;

	/* Here are the main procedures. There are 32 in total, 4 each (as per the playlist number) for dleft/dright, nose/mouth.
	Each number at the end of 'main_procedure_...1' corresponds to the playlist that will be used
	for each main procedure block. */
	//dleft_nose
	var main_procedure_dleft_nose1 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dleft_nose1,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_nose2 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dleft_nose2,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_nose3 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dleft_nose3,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_nose4 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dleft_nose4,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	//dleft_mouth
	var main_procedure_dleft_mouth1 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dleft_mouth1,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_mouth2 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dleft_mouth2,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_mouth3 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dleft_mouth3,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dleft_mouth4 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dleft_mouth4,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	//dright_nose
	var main_procedure_dright_nose1 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dright_nose1,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dright_nose2 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dright_nose2,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dright_nose3 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dright_nose3,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dright_nose4 = {
		timeline: [
			fixation_nose,
			audiopresentation,
			responselog
		],
		timeline_variables:  test_stimuli_dright_nose4,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	//dright_mouth
	var main_procedure_dright_mouth1 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dright_mouth1,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dright_mouth2 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dright_mouth2,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	var main_procedure_dright_mouth3 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dright_mouth3,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

		var main_procedure_dright_mouth4 = {
		timeline: [
			fixation_mouth,
			audiopresentation,
			responselog
		],
		timeline_variables: test_stimuli_dright_mouth4,
		randomize_order: true,
		sample : {
			type: 'without-replacement',
			size: blocksize
		}
	};

	/* There are 96 order possibilities; each considers nose/mouth and playlist order.
		The random integer will determine which one a participant gets.
		Playlist orders are: A = 1, 2, 3, 4; B = 1, 2, 4, 3; C = 1, 3, 2, 4; D = 1, 3, 4, 2; E = 1, 4, 2, 3; F = 1, 4, 3, 2;
		G = 2, 1, 3, 4; H = 2, 1, 4, 3; I = 2, 3, 1, 4; J = 2, 3, 4, 1; K= 2, 4, 3, 1; L= 2, 4, 1, 3;
		M = 3, 1, 2, 4; N = 3, 1, 4, 2; O = 3, 2, 1, 4; P = 3, 2, 4, 1; Q = 3, 4, 1, 2; R = 3, 4, 2, 1;
		S = 4, 1, 2, 3; T = 4, 1, 3, 2; U = 4, 2, 1, 3; V = 4, 2, 3, 1; W = 4, 3, 1, 2; X = 4, 3, 2, 1 */
	//DLEFT NOSE
	//dleft nose A
	if(randomint > 474){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose B
	} else if(randomint > 469){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose C
	} else if(randomint > 464){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose D
	} else if(randomint > 459){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose E
	} else if(randomint > 454){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose F
	} else if(randomint > 449){
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose G
	} else if(randomint > 444){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose H
	} else if(randomint > 439){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose I
	} else if(randomint > 434){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose J
	} else if(randomint > 429){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//dleft nose K
	} else if(randomint > 424){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//dleft nose L
	} else if(randomint > 419){
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose M
	} else if(randomint > 414){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose N
	} else if(randomint > 409){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose O
	} else if(randomint > 404){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
	//dleft nose P
	} else if(randomint > 399){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//dleft nose Q
	} else if(randomint > 393){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose R
	} else if(randomint > 389){
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//dleft nose S
	} else if(randomint > 384){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose T
	} else if(randomint > 379){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose U
	} else if(randomint > 374){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
	//dleft nose V
	} else if(randomint > 369){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//dleft nose W
	} else if(randomint > 364){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
	//dleft nose X
	} else if(randomint > 359){
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
	//DLEFT MOUTH
	//dleft mouth A
	} else if(randomint > 354){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth B
	} else if(randomint > 349){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth C
	} else if(randomint > 344){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth D
	} else if(randomint > 339){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth E
	} else if(randomint > 334){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth F
	} else if(randomint > 329){
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth G
	} else if(randomint > 324){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth H
	} else if(randomint > 319){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth I
	} else if(randomint > 314){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth J
	} else if(randomint > 309){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//dleft mouth K
	} else if(randomint > 304){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//dleft mouth L
	} else if(randomint > 299){
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth M
	} else if(randomint > 294){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth N
	} else if(randomint > 289){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth O
	} else if(randomint > 284){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
	//dleft mouth P
	} else if(randomint > 279){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//dleft mouth Q
	} else if(randomint > 274){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth R
	} else if(randomint > 269){
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//dleft mouth S
	} else if(randomint > 264){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth T
	} else if(randomint > 259){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth U
	} else if(randomint > 254){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
	//dleft mouth V
	} else if(randomint > 249){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//dleft mouth W
	} else if(randomint > 244){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
	//dleft mouth X
	} else if(randomint > 239){
		timeline.push(main_procedure_dleft_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dleft_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dleft_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dleft_nose1);
	//DRIGHT NOSE
	//dright nose A
	} else if(randomint > 234){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose B
	} else if(randomint > 229){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose C
	} else if(randomint > 224){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose D
	} else if(randomint > 219){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose E
	} else if(randomint > 214){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose F
	} else if(randomint > 209){
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose G
	} else if(randomint > 204){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose H
	} else if(randomint > 199){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose I
	} else if(randomint > 194){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose J
	} else if(randomint > 189){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//dright nose K
	} else if(randomint > 184){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//dright nose L
	} else if(randomint > 179){
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose M
	} else if(randomint > 174){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose N
	} else if(randomint > 169){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose O
	} else if(randomint > 164){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
	//dright nose P
	} else if(randomint > 159){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//dright nose Q
	} else if(randomint > 154){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose R
	} else if(randomint > 149){
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//dright nose S
	} else if(randomint > 144){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose T
	} else if(randomint > 139){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose U
	} else if(randomint > 134){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
	//dright nose V
	} else if(randomint > 129){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//dright nose W
	} else if(randomint > 124){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
	//dright nose X
	} else if(randomint > 119){
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(instr_btwn);
		timeline.push(mouth_instr);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
	//DRIGHT MOUTH
	//dright mouth A
	} else if(randomint > 114){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth B
	} else if(randomint > 109){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth C
	} else if(randomint > 104){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth D
	} else if(randomint > 99){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth E
	} else if(randomint > 94){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth F
	} else if(randomint > 89){
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth G
	} else if(randomint > 84){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth H
	} else if(randomint > 79){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth I
	} else if(randomint > 74){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth J
	} else if(randomint > 69){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	//dright mouth K
	} else if(randomint > 64){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	//dright mouth L
	} else if(randomint > 59){
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth M
	} else if(randomint > 54){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth N
	} else if(randomint > 49){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth O
	} else if(randomint > 44){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
	//dright mouth P
	} else if(randomint > 39){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	//dright mouth Q
	} else if(randomint > 34){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth R
	} else if(randomint > 29){
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	//dright mouth S
	} else if(randomint > 24){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth T
	} else if(randomint > 19){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth U
	} else if(randomint > 14){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
	//dright mouth V
	} else if(randomint > 9){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	//dright mouth W
	} else if(randomint > 4){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
	//dright mouth X
	} else if(randomint < 5){
		timeline.push(main_procedure_dright_mouth4);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth3);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth2);
		timeline.push(mouth_rest);
		timeline.push(main_procedure_dright_mouth1);
		timeline.push(instr_btwn);
		timeline.push(nose_instr);
		timeline.push(main_procedure_dright_nose4);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose3);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose2);
		timeline.push(nose_rest);
		timeline.push(main_procedure_dright_nose1);
	}

	var end = {
			type: 'instructions',
			pages: [ '<h2>Study Complete</h2>' +
				'<p>Thank you for participating!</p>' +
				'<p>This study is meant to further clarify the nature of articulator-level sensorimotor information in adult speech processing, examining how breathing is related to auditory perception.' +
				' In particular, this study investigates how breathing through the nose or mouth affects the perception of speech sounds and certain non-speech sounds.' +
				' Specifically, we are looking to see whether breathing in a certain way affects the perception of sounds that have certain acoustic characteristics that are related to the production of nasal vocalizations (like /n/ or /m/) or oral vocalizations (like /d/ or /b/), and even musical notes that have ‘nasal-sounding’ acoustic characteristics.' +
				' This research will then help us clarify the link between neural systems for motor control and neural systems for perception. </p>' +
			'<b>Click <i>next</i> to receive your completion code.</b>'],
			show_clickable_nav: true,
			button_label_next: "Next",
			allow_keys: false
	}
	timeline.push(end);


	//we can also debrief our participants after the study, to tell them how they did!
	/*	var debrief_block = {
		type: "html-keyboard-response",
		stimulus: function(){
			//first, filter out the fixation screens, and the 'd' responses:
			//var trials = jsPsych.data.get().filter({test_part: 'test'});
			//var correct_trials = trials.filter({correct: true});
			//then calculate their accuracy overall
			//var accuracy = Math.round(correct_trials.count()/trials.count() * 100);
			//and calculate the mean response time:
			//var rt = Math.round(correct_trials.select('rt').mean());
			//and share it to the screen!
			return "<p>Thank you for participating in our study.</p>"+
			"<p>Your partipant code is </p><p><b>RO-" + jatos.studyResultId +
			"</b></p><p>Press any key to complete the experiment. Thanks!</p>";
		}
	};
	timeline.push(debrief_block);*/

	var audio = ['shared_assets/audio/bd/stimulus020.wav', 'shared_assets/audio/bd/stimulus021.wav', 'shared_assets/audio/bd/stimulus022.wav', 'shared_assets/audio/bd/stimulus023.wav', 'shared_assets/audio/bd/stimulus024.wav', 'shared_assets/audio/bd/stimulus025.wav', 'shared_assets/audio/bd/stimulus026.wav', 'shared_assets/audio/bd/stimulus027.wav', 'shared_assets/audio/bd/stimulus028.wav', 'shared_assets/audio/bd/stimulus029.wav', 'shared_assets/audio/bd/stimulus030.wav', 'shared_assets/audio/bd/stimulus031.wav', 'shared_assets/audio/bd/stimulus032.wav', 'shared_assets/audio/bd/stimulus033.wav', 'shared_assets/audio/bd/stimulus034.wav', 'shared_assets/audio/bd/stimulus035.wav', 'shared_assets/audio/bd/stimulus036.wav', 'shared_assets/audio/bd/stimulus037.wav', 'shared_assets/audio/bd/stimulus038.wav', 'shared_assets/audio/bd/stimulus039.wav', 'shared_assets/audio/bd/stimulus040.wav', 'shared_assets/audio/bd/stimulus041.wav', 'shared_assets/audio/bd/stimulus042.wav', 'shared_assets/audio/bd/stimulus043.wav', 'shared_assets/audio/bd/stimulus044.wav', 'shared_assets/audio/bd/stimulus045.wav', 'shared_assets/audio/bd/stimulus046.wav', 'shared_assets/audio/bd/stimulus047.wav', 'shared_assets/audio/bd/stimulus048.wav', 'shared_assets/audio/bd/stimulus049.wav', 'shared_assets/audio/bd/stimulus050.wav', 'shared_assets/audio/bd/stimulus051.wav', 'shared_assets/audio/bd/stimulus052.wav', 'shared_assets/audio/bd/stimulus053.wav', 'shared_assets/audio/bd/stimulus054.wav', 'shared_assets/audio/bd/stimulus055.wav', 'shared_assets/audio/bd/stimulus056.wav', 'shared_assets/audio/bd/stimulus057.wav', 'shared_assets/audio/bd/stimulus058.wav', 'shared_assets/audio/bd/stimulus059.wav', 'shared_assets/audio/bd/stimulus060.wav', 'shared_assets/audio/bd/stimulus061.wav', 'shared_assets/audio/bd/stimulus062.wav', 'shared_assets/audio/bd/stimulus063.wav', 'shared_assets/audio/bd/stimulus064.wav', 'shared_assets/audio/bd/stimulus065.wav', 'shared_assets/audio/bd/stimulus066.wav', 'shared_assets/audio/bd/stimulus067.wav', 'shared_assets/audio/bd/stimulus068.wav', 'shared_assets/audio/bd/stimulus069.wav',
	'shared_assets/audio/dn/032.wav', 'shared_assets/audio/dn/033.wav', 'shared_assets/audio/dn/034.wav', 'shared_assets/audio/dn/035.wav', 'shared_assets/audio/dn/036.wav', 'shared_assets/audio/dn/037.wav', 'shared_assets/audio/dn/038.wav', 'shared_assets/audio/dn/039.wav', 'shared_assets/audio/dn/040.wav', 'shared_assets/audio/dn/041.wav', 'shared_assets/audio/dn/042.wav', 'shared_assets/audio/dn/043.wav', 'shared_assets/audio/dn/044.wav', 'shared_assets/audio/dn/045.wav', 'shared_assets/audio/dn/046.wav', 'shared_assets/audio/dn/047.wav', 'shared_assets/audio/dn/048.wav', 'shared_assets/audio/dn/049.wav', 'shared_assets/audio/dn/050.wav', 'shared_assets/audio/dn/051.wav', 'shared_assets/audio/dn/052.wav', 'shared_assets/audio/dn/053.wav', 'shared_assets/audio/dn/054.wav', 'shared_assets/audio/dn/055.wav', 'shared_assets/audio/dn/056.wav', 'shared_assets/audio/dn/057.wav', 'shared_assets/audio/dn/058.wav', 'shared_assets/audio/dn/059.wav', 'shared_assets/audio/dn/060.wav', 'shared_assets/audio/dn/061.wav', 'shared_assets/audio/dn/062.wav', 'shared_assets/audio/dn/063.wav', 'shared_assets/audio/dn/064.wav', 'shared_assets/audio/dn/065.wav', 'shared_assets/audio/dn/066.wav', 'shared_assets/audio/dn/067.wav', 'shared_assets/audio/dn/068.wav', 'shared_assets/audio/dn/069.wav', 'shared_assets/audio/dn/070.wav', 'shared_assets/audio/dn/071.wav', 'shared_assets/audio/dn/072.wav', 'shared_assets/audio/dn/073.wav', 'shared_assets/audio/dn/074.wav', 'shared_assets/audio/dn/075.wav', 'shared_assets/audio/dn/076.wav', 'shared_assets/audio/dn/077.wav', 'shared_assets/audio/dn/078.wav', 'shared_assets/audio/dn/079.wav', 'shared_assets/audio/dn/080.wav', 'shared_assets/audio/dn/081.wav',
	'shared_assets/audio/mn/025.wav', 'shared_assets/audio/mn/026.wav', 'shared_assets/audio/mn/027.wav', 'shared_assets/audio/mn/028.wav', 'shared_assets/audio/mn/029.wav', 'shared_assets/audio/mn/030.wav', 'shared_assets/audio/mn/031.wav', 'shared_assets/audio/mn/032.wav', 'shared_assets/audio/mn/033.wav', 'shared_assets/audio/mn/034.wav', 'shared_assets/audio/mn/035.wav', 'shared_assets/audio/mn/036.wav', 'shared_assets/audio/mn/037.wav', 'shared_assets/audio/mn/038.wav', 'shared_assets/audio/mn/039.wav', 'shared_assets/audio/mn/040.wav', 'shared_assets/audio/mn/041.wav', 'shared_assets/audio/mn/042.wav', 'shared_assets/audio/mn/043.wav', 'shared_assets/audio/mn/044.wav', 'shared_assets/audio/mn/045.wav', 'shared_assets/audio/mn/046.wav', 'shared_assets/audio/mn/047.wav', 'shared_assets/audio/mn/048.wav', 'shared_assets/audio/mn/049.wav', 'shared_assets/audio/mn/050.wav', 'shared_assets/audio/mn/051.wav', 'shared_assets/audio/mn/052.wav', 'shared_assets/audio/mn/053.wav', 'shared_assets/audio/mn/054.wav', 'shared_assets/audio/mn/055.wav', 'shared_assets/audio/mn/056.wav', 'shared_assets/audio/mn/057.wav', 'shared_assets/audio/mn/058.wav', 'shared_assets/audio/mn/059.wav', 'shared_assets/audio/mn/060.wav', 'shared_assets/audio/mn/061.wav', 'shared_assets/audio/mn/062.wav', 'shared_assets/audio/mn/063.wav', 'shared_assets/audio/mn/064.wav', 'shared_assets/audio/mn/065.wav', 'shared_assets/audio/mn/066.wav', 'shared_assets/audio/mn/067.wav', 'shared_assets/audio/mn/068.wav', 'shared_assets/audio/mn/069.wav', 'shared_assets/audio/mn/070.wav', 'shared_assets/audio/mn/071.wav', 'shared_assets/audio/mn/072.wav', 'shared_assets/audio/mn/073.wav', 'shared_assets/audio/mn/074.wav'
	];

	//now that we have complete timeline, we tell jsPsych to run it.
	//We will eventually need a JATOS wrapper

	jatos.onLoad(
		jatos.addJatosIds(resultData),

		jsPsych.init({
			timeline: timeline,

			exclusions: {
          	  min_width: 800,
          	  min_height: 600
        },
        on_interaction_data_update: function (data) {
            if (data.event == "blur") {
                console.log(data);
                blur_count++;
                if (blur_count > 10) {
                    likely_invalid = true;
                }
            };
        },

			use_webaudio: false,
			preload_audio: audio,
			max_load_time: 12000,
			max_preload_attempts: 10,



			//to display data and add subject number:
			on_finish: function() {
				var studyID = jatos.studyResultID;
				 if(likely_invalid){
                	studyID += ' - invalid result'
            }
				jsPsych.data.addProperties({subject : studyID});
				// jsPsych.data.displayData("CSV");
				//to submit the results to JATOS...
        	    var all_data = jsPsych.data.get();
        	    var results = all_data.ignore('internal_node_id').ignore('time_elapsed');
            	jatos.submitResultData(results.csv(), jatos.startNextComponent);
			}
		})
	);
