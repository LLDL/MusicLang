/*
	* passage-highlight
    * A jspsych plugin which plays audio of a passage. The passage appears as text. Words
    * that may be pronounced incorrectly are highlighted as a div, and on clicking are 
    * toggled correct/incorrect, starting with  the default prior to clicking.
    * 
    
    * The fields are:
    * - json_label:                 Wraps output ie: $jsonLabel: {'wordNum': {'word': 'correct'}}...},
	* - preamble:                   Header to put at top of page
	* - audio:                      location of audio file to be played
	* - allow_audio_control:        participant can play/pause themselves:  (Options: true, false)
    * - test_length:                length of audio clip + grace period before automatic skip to next section
    * - default_correct:            true/false: Start with all words marked correct or incorrect
    * - correct_color:              hex color to highlight correct words
    * - incorrect_color:            hex color to highlight incorrect words
    * - text_file:                  location of text file corresponding to the text to be displayed. 
    *                               Format follows below
    * - text_file_language:         english/mandarin: changes expected format:
    
    * - Ankit Dassor
*/

       
jsPsych.plugins['passage-highlight'] = (function () {
    var plugin = {};

    plugin.info = {
        name: 'passage-highlight',
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
                description: 'HTML formatted string to display at the top of the page above all content.'
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
            },
            default_correct: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Mark as correct by default',
                default: true
            },
            correct_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Color to highlight words marked correct',
                default: '#ff0000'
            },
            incorrect_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Color to highlight words marked incorrect',
                default: '#00ff00'
            },
            text_file: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Text Location',
                default: ''
            },
            text_file_language: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Language the text file is in (english or mandarin)',
                default: 'english'
            }
        }
    }
    
    plugin.trial = function (display_element, trial){
            
        var startTime = (new Date()).getTime();
        //Every second, maybeFinish() is triggered by the below
        var everySecond = setInterval(maybeFinish, 1000);

        var html = '';
        if (trial.preamble !== null) {
            html += '<div id="passage-highlight-preamble" class="passage-highlight-preamble">' + trial.preamble + '</div>';
        }
        //Audio
        html += '<audio preload="auto" autoplay'
        if(trial.allow_audio_control){
            html += ' controls';
        }
        html += '><source src="'+ trial.audio + '" type="audio/mpeg"></audio>';
        
        //Text Section
        


        function maybeFinish() {
            //measure response time
            endTime = (new Date()).getTime();
            // if test_length has been exceeded, end the test
            var response_time = endTime - startTime;
            if(response_time>trial.test_length*1000){
                var answers = {};
                // var questions = document.querySelectorAll('.binary-audio-prompt-question');
                // for(var i=0; i<trial.question_count; i++){
                //     var disp_i;
                //     if(trial.question_num_type == 'alphabetic'){
                //         disp_i = to_letters(i+1);  
                //     }else{
                //         disp_i = i+1;
                //     }

                //     var opts = questions[i].getElementsByTagName("input");
                //     if(opts[0].checked){
                //         answers[disp_i] = trial.answer1;
                //     }else if(opts[1].checked){
                //         answers[disp_i] = trial.answer2;
                //     }else{
                //         answers[disp_i] = 'none';
                //     }
                // }
                clearInterval(everySecond);
                var trialdata = {
                    "rt": response_time,
                    [trial.json_label]: answers
                };
                display_element.innerHTML = '';
                // next trial
                jsPsych.finishTrial(trialdata);
            }
        }
        
    }
    return plugin;
})();