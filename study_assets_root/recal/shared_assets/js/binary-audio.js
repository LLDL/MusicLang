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

//to_letters, when given a number, generates the alphabetic equivalent
//for example, 1=A, 26=Z, 27=AA, etc
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
//generateQuestions creates two columns of equal height or near-equal height containing $count of yes/no question divs
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
        
        tempHTML += '<input type="radio" class="binary-audio-radio-'+ section + '" name="'+ prefix + disp_i + suffix + '"id="' + prefix + disp_i + suffix + '1" value="' + answer1 + '"/>';
        tempHTML += '<label for="' + prefix + disp_i + suffix + '1">'  + answer1 + '</label>' ;
        tempHTML += '<input type="radio" class="binary-audio-radio-'+ section + '" name="'+ prefix + disp_i + suffix + '"id="' + prefix + disp_i + suffix + '2" value="' + answer2 + '"/>';
        tempHTML += '<label for="' + prefix + disp_i + suffix + '2">'  + answer2 + '</label>' ;
        tempHTML += '</div>';

        if (i <= Math.ceil(count/2)){
            left += tempHTML;
        }else{
            right += tempHTML;
        }
        if (i == Math.ceil(count/2)){
            left += '</div>';
        }
        if(i == count){
            right += '</div>';
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
                pretty_name: 'Number of Examples',
                default: 0
            },
            question_count: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Number of Questions',
                default: 0
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
         
        var startTime = (new Date()).getTime();
        //Every second, maybeFinish() is triggered by the below
        //Will finish within ~1 second of actual test_length in worst case
        var everySecond = setInterval(maybeFinish, 1000);

        var html = '';
        if (trial.preamble !== null) {
            html += '<div id="binary-audio-preamble" class="binary-audio-preamble">' + trial.preamble + '</div>';
        }
        //Audio that by default autoplays and does not allow user to control it
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


        function maybeFinish() {
            //measure response time
            endTime = (new Date()).getTime();
            // if test_length has been exceeded, end the test
            var response_time = endTime - startTime;
            if(response_time>trial.test_length*1000){
                var trialdata = {
                    "rt": response_time,
                    "trial_name": trial.json_label,
                    "question_count": trial.question_count
                };
                var questions = document.querySelectorAll('.binary-audio-prompt-question');
                for(var i=0; i < trial.question_count; i++){
                    var response = '';
                    var opts = questions[i].getElementsByTagName("input");
                    if(opts[0].checked){
                        response = trial.answer1;
                    }else if(opts[1].checked){
                        response = trial.answer2;
                    }else{
                        response = 'None';
                    }
                    trialdata['q' + (i + 1)] = response;
                }
                clearInterval(everySecond);
                display_element.innerHTML = '';
                jsPsych.finishTrial(trialdata);
            }
        }
        
    }
    return plugin;
})();
