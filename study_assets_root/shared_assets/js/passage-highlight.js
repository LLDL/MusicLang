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
            word_tag_char: {
                type: jsPsych.plugins.parameterType.STRING,
                default: '#',
                description: 'The marker that surrounds words of interest ie: #testword#'
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
        var everySecond =  setInterval(maybeFinish, 1000);
        
        
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
        var ofInterest;
        if(trial.text_language == 'english'){
            html += parseEnglish();
            ofInterest = display_element.getElementsByClassName('ofInterest');
        }else if(trial.text_language == 'mandarin'){
            html += parseMandarin();
            ofInterest = display_element.getElementsByClassName('ofInterestMandarin');
        }else{
            html += '<div id="error">Error: text_file_language is set incorrectly.</div>'
        }

        display_element.innerHTML = html;
        
        
        
        
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
            var correct = trial.default_correct?'correct':'incorrect';
            var findOfInterest = new RegExp(trial.word_tag_char1  +"([^" + trial.word_tag_char1 +"]*)"+ trial.word_tag_char1, 'gu');
            var retString = '<div id="passage-highlight-english">';
            retString += (trial.text).replace(findOfInterest, '<mark class="ofInterest ' + correct + '">$1</mark>');           
            retString += '</div>'
            return retString;
        }
        
        function parseMandarin(){
            // var specials = new RegExp(/',。“‘’”'/, 'u', 'i');
            var correct = trial.default_correct?'correct':'incorrect';
            var findOfInterest = new RegExp(trial.word_tag_char1 +"([^\\s^" + trial.word_tag_char1 +"]* [\u4E00-\u9Fcc])"+ trial.word_tag_char1, 'gu');
            var pinyinUnifiedPairs = new RegExp("([^\\s^" + trial.word_tag_char1 +"^>]*) ([\u4E00-\u9Fcc])", 'gu');
            var punct = new RegExp("\s?(['，,。“‘’”'：！])\s?", 'gu');
            var retString = '<div id="passage-highlight-mandarin">';
            var withPunct = (trial.text).replace(punct, '<div class="punctuation">$1 </div>');
            var withMarks = withPunct.replace(findOfInterest, '<div class="ofInterestMandarin '+ correct + '">$1</div>');
            retString += withMarks.replace(pinyinUnifiedPairs, '<div class="mandarinPair"><div class="pinyin">$1</div><div class="unifiedUni">$2</div></div>');

            retString += '</div>'
            return retString;

        }   
        function maybeFinish() {
            //measure response time
            endTime = (new Date()).getTime();
            // if test_length has been exceeded, end the test
            var response_time = endTime - startTime;
            if(response_time>trial.test_length*1000){
                var answers = {};
                if(trial.text_language == 'english'){
                    var ofInterest = display_element.getElementsByClassName('ofInterest');
                    for(var index=0; index<ofInterest.length; index++){
                        var answer = {};
                        var marked = 'incorrect';
                        if(ofInterest[index].classList.contains('correct')){
                            marked = 'correct';
                        }
                        var word = ofInterest[index].innerText;
                        
                        answer[word] = marked;
                        answers[index] = answer;
                    }
                }else{
                    var ofInterest = display_element.getElementsByClassName('ofInterestMandarin');
                    for(var index=0; index<ofInterest.length; index++){
                        var answer = {};
                        var marked = 'incorrect';
                        if(ofInterest[index].classList.contains('correct')){
                            marked = 'correct';
                        }
                        var word = ofInterest[index].childNodes[0].childNodes[0].innerText;
                        
                        answer[word] = marked;
                        answers[index] = answer;
                    }
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