/*
	* binary-audio
    * A jspsych plugin which plays audio of a set of binary-answered question prompts.
    * An example section is available, as well as a question section
    * The fields are:
    * - json_label:                 Wraps output ie: $jsonLabel: {'q1': 'yes', 'q2': 'no'...},
	* - preamble:                   Header to put at top of page
    * - example_preamble:           Header to put at top of examples
	* - question_reamble:           ^          
	* - example_count:              Number of example questions in the audio
	* - question_count:             ^
    * - example_num_prefix:         Example question numbering will start with this
    * - question_num_prefix:        ^
    * - example_num_suffix:         Example question numbering will end with this
    * - question_num_suffix:        ^
	* - example_num_type:           How the example questions are numbered (Options: alphabetic, numeric)
	* - question_num_type:          ^
	* - answer1:                    Label for option 1 of the binary questions
	* - answer2:                    ^
	* - audio:                      location of audio file to be played
	* - allow_audio_control:        participant can play/pause themselves:  (Options: true, false)
	* - test_length:                length of audio clip + grace period before automatic skip to next section
	* - Ankit Dassor
*/
        //for (var i = 0; i < trial.questions.length; i++) {
		// 	html += '<div class="survey-yes-no-question" id="survey-yes-no-question-' + i + '">';
		// 	html += '<p>' + trial.questions[i].prompt + '</p>';
		// 	html += '<input type="radio" class="survey-yes-no-response" id="survey-yes-no-response-' + i + '-' + 0 + '" name="' + i + '" value="true">Yes';
		// 	html += '<input type="radio" class="survey-yes-no-response" id="survey-yes-no-response-' + i + '-' + 1 + '" name="' + i + '" value="false">No';
		// 	html += '</div>';
        // }
function to_letters(number){
    var mod = number % 26;
    var pow = (number / 26) | 0;
    if(mod){
        var out = String.fromCharCode(64+ mod);
    }else{
        var out = (--pow, 'Z');
    }
    if(pow){
        return to_letters(pow) + out;
    }
    return out;
}
function generateQuestions(section, count, prefix, suffix, iter_type, answer1, answer2){
    var colsJoined;
    var left = '<div class="leftCol">';
    var right = '<div class="rightCol">';
    for(var i=1; i<=count; i++){
        var tempHTML = '';
        var disp_i = i;
        if(iter_type == 'alphabetic'){
            disp_i = to_letters(i);  
        }
        tempHTML += '<div class="binary-audio-prompt binary-audio-prompt-' + section + '">';
        tempHTML += '<label>' + prefix + disp_i + suffix + '</label>';
        
        tempHTML += '<input type="radio" class="binary-audio-radio-'+ section + '" name="'+ prefix + disp_i + suffix + '"' + 'value="' + answer1 + '">' + answer1;

        tempHTML += '<input type="radio" class="binary-audio-radio-'+ section + '" name="'+ prefix + disp_i + suffix + '"' + 'value="' + answer2 + '">' + answer2;

        tempHTML += '</div>';

        console.log(i + ' | ' + Math.ceil(count/2));
        if (i <= Math.ceil(count/2)){
            left += tempHTML;
            console.log('adding to left');
        }else{
            right += tempHTML;
            console.log('adding to right');
        }
        if (i == Math.ceil(count/2)){
            left += '</div>';
            console.log('terminating left');
        }
        if(i == count){
            right += '</div>';
            console.log('terminating right');
        }

    }
    
    colsJoined = '<div class="colCont">' + left + right + '</div>';
    return colsJoined;
}

jsPsych.plugins['binary-audio'] = (function () {
	var plugin = {};

	plugin.info = {
		name: 'binary-audio',
        description: '',
        parameters: {
            json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'JSON Label',
				default: 'binary-audio'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the page above all the questions.'
            },
            example_preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Example Preamble',
                default: 'Examples',
                description: 'HTML formatted string to display above all the examples.'
            },
            question_preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Question Preamble',
                default: 'Questions',
                description: 'HTML formatted string to display above all the examples.'
            },
            example_count: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Number of Examples'
            },
            question_count: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Number of Questions'
            },
            example_num_prefix: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prefix for Example Numbering',
                default: ''
            },
            question_num_prefix: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prefix for Question Numbering',
                default: ''
            },
            example_num_suffix: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Suffix for Example Numbering',
                default: ''
            },
            question_num_suffix: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Suffix for Question Numbering',
                default: ''
            },
            example_num_type: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Example Numbering Type',
                default: 'alphabetic'
            },
            question_num_type: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Question Numbering Type',
                default: 'numeric'
            },
            answer1: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Answer 1',
                default: 'Yes'
            },
            answer2: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Answer 2',
                default: 'No'
            },
            audio: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Audio Location',
                default: ''
            },
            allow_audio_control: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Allow Audio Control',
                default: false
            },
            test_length: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Length of Test in Seconds',
                default: 0
            }
        }
    }
    
    plugin.trial = function (display_element, trial){ 
        var html = '';
        if (trial.preamble !== null) {
            html += '<div id="binary-audio-preamble" class="binary-audio-preamble">' + trial.preamble + '</div>';
        }
        //Audio
        html += '<audio preload="auto" autoplay'
        if(trial.allow_audio_control){
            html += ' controls';
        }
        html += '><source src="'+ trial.audio + '" type="audio/mpeg"></audio>';
        
        //Example Section
        html += '<div id="binary-audio-example">'
        if (trial.example_preamble !== null) {
            html += '<h4>' + trial.example_preamble + '</h4>';
        }   
        html += generateQuestions("example", trial.example_count, trial.example_num_prefix, trial.question_num_suffix, trial.example_num_type, trial.answer1, trial.answer2);
        html += '</div>';
    
        //Question Section
        html += '<div id="binary-audio-question">'
        if (trial.question_preamble !== null) {
            html += '<h4>' + trial.question_preamble + '</h4>';
        }   
        html += generateQuestions("question", trial.question_count, trial.question_num_prefix, trial.question_num_suffix, trial.question_num_type, trial.answer1, trial.answer2);
        html += '</div>';

        display_element.innerHTML = html;

        html += '<button id="binary-audio-next" class="binary-audio-next">' + "temporary next" + '</button>';

        display_element.querySelector('#binary-audio-next').addEventListener('click', function () {
            //measure response time
            endTime = (new Date()).getTime();
            var response_time = endTime - startTime;
            
            var trialdata = {
                "rt": response_time
            };
            display_element.innerHTML = '';
            // next trial
            jsPsych.finishTrial(trialdata);
        });
        var startTime = (new Date()).getTime();
    }
    return plugin;
})();