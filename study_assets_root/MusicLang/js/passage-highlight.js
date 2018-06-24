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
    * - word_tag_char:              separator that surrounds words of interest               
    * - default_correct:            true/false: Start with all words marked correct or incorrect
    * - text:                       text to be displayed. Format follows below
    * - text_language:              english/mandarin: changes expected format:
    
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
            word_tag_char1: {
                type: jsPsych.plugins.parameterType.STRING,
                default: '#',
                description: 'The outer marker that surrounds words of interest ie: #@testword#'
            },
            word_tag_char2: {
                type: jsPsych.plugins.parameterType.INT,
                default: '@',
                description: 'The inner marker that follows word_tag_char1 and precedes the word of interest ie: #@testword#'
            },
            default_correct: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Mark as correct by default',
                default: true
            },
            
            text: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Text to display, formatted with html and escaped',
                default: ''
            },
            text_language: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Language the text is in (english or mandarin)',
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
        // html += trial.text;
        if(trial.text_language == 'english'){
            html += parseEnglish();
        }else if(trial.text_language == 'mandarin'){
            html += parseMandarin();
        }else{
            html += '<div id="error">Error: text_file_language is set incorrectly.</div>'
        }
        
        display_element.innerHTML = html;
        
        var ofInterest = display_element.getElementsByClassName('ofInterest');
        for(var i = 0; i < ofInterest.length; i++){
            ofInterest[i].addEventListener("click", function(){
                if(this.classList.contains('correct')){
                    this.classList.add('incorrect');
                    this.classList.remove('correct');
                }
                else if(this.classList.contains('incorrect')){
                    this.classList.add('correct');
                    this.classList.remove('incorrect');
                }
            });
        }

        function parseEnglish(){
            var wrapperSpecialSt;
            var wrapperSpecialEnd = '</mark>';
            var wrapperRegSt = '';
            var wrapperRegEnd = '';
            var retString = '<div id="passage-highlight-english">';
            var textSplitPrimary = (trial.text).split(trial.word_tag_char1);
            var numOfInterest = 0;
            var correct = trial.default_correct?'correct':'incorrect';
            for(var index = 0; index<textSplitPrimary.length; index++){
                var currString = textSplitPrimary[index];
                var tempSt;
                if(currString.substring(0, 1) === trial.word_tag_char2){
                    wrapperSpecialSt = '<mark class="ofInterest ' + correct + '" id="' + numOfInterest + '">';
                    tempSt = wrapperSpecialSt + currString.substring(1) + wrapperSpecialEnd;
                    numOfInterest++;
                }else{
                    tempSt = wrapperRegSt + currString + wrapperRegEnd;
                }
                retString += tempSt;
            }
            retString += '</div>'
            return retString;
        }
        
        function parseMandarin(){

        }   
        function maybeFinish() {
            //measure response time
            endTime = (new Date()).getTime();
            // if test_length has been exceeded, end the test
            var response_time = endTime - startTime;
            if(response_time>trial.test_length*1000){
                var answers = {};
                var ofInterest = display_element.getElementsByClassName('ofInterest');
                for(var index=0; index<ofInterest.length; index++){
                    var answer = {};
                    var markedCorrect = false;
                    if(ofInterest[index].classList.contains('correct')){
                        markedCorrect = true;
                    }
                    var word = ofInterest[index].innerText;
                    
                    answer[word] = markedCorrect;
                    answers[index] = answer;
                }
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