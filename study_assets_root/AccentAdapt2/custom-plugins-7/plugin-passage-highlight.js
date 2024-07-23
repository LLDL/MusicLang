/*
	* passage-highlight for jsPsych v. 7.x (updated from original for jsPsych v. 6.x)
    * A jspsych plugin which plays audio of a passage. The passage appears as text. Words
    * that may be pronounced incorrectly are highlighted as a div, and on clicking are 
    * toggled correct/incorrect, starting with the default prior to clicking.
    *     
    * The fields are:
    * - trial_name:                 Wraps output ie: $jsonLabel: {'wordNum': {'word': 'correct'}}...},
	* - preamble:                   Header to put at top of page
	* - stimulus:                   location of audio file to be played
	* - allow_audio_control:        participant can play/pause themselves:  (Options: true, false)
                                    note: if controls are visible, participants would be able to not hear the whole audio before it times out
    * - test_length:                length of audio clip + grace period before automatic skip to next section
    * - word_tag_char:              separator that surrounds words of interest               
    * - default_correct:            true/false: Start with all words marked correct or incorrect
    * - text:                       text to be displayed. Format follows below
    * - pinyin_pairing:             true/false: if true, shows pinyin above Chinese characters
    * - custom_css:                 instructions for how to display the text
    * 
    * - Ankit Dassor
    * - updated by Elise McClay & Luca Cavasso (Oct 2023) using https://www.jspsych.org/7.0/support/migration-v7/#custom-plugins

    */

var jsPsychPassageHighlight = (function (jspsych) {
    'use strict';

    const info = {
        name: 'passage-highlight',
        parameters: {
            trial_name: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Trial Name',
                default: 'passage-highlight-trial-name'
            },
            preamble: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the page above all content.'
            },
            stimulus: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Audio Location',
                default: ''
            },
            allow_audio_control: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: 'Allow Audio Control',
                default: false
            },
            test_length: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Length of Test in Seconds',
                default: 0
            },
            word_tag_char: {
                type: jspsych.ParameterType.STRING,
                default: '#',
                description: 'The marker that surrounds words of interest ie: #testword#'
            },
            default_correct: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: 'Mark as correct by default',
                default: true
            },
            text: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Text to display, formatted with html and escaped',
                default: ''
            },
            pinyin_pairing: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: 'Show Pinyin above Chinese Characters',
                default: false
            },
            /** CSS for ofInterest text (clickable words in text) and pinyin/Hanzi formatting*/
            custom_css: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Custom CSS",
                default: `#passage-highlight-simple, #multi-choice-passage-simple{
    
                    width: 60%;
                    margin: auto;
                    text-align: left;
                    font-size: 1em;
                    user-select: none;
                
                }
                #passage-highlight-chinese, #multi-choice-passage-chinese{
                    width: 80%;
                    margin: auto;
                    text-align: left;
                    font-size: 1em;
                    user-select: none;
                }
                .chinesePair, .ofInterestChinese, .punctuation{
                    display: inline-block;
                }
                .unifiedUni, .punctuation{
                    font-size: 2em;
                }
                
                .correct{
                    background-color: #00ff00;
                    /* padding: .1em; */
                }
                
                .incorrect{
                    background-color: #ff1900;
                    /* padding: .1em; */
                }
                .error{
                    color: #ff1900;
                }
                
                .correct:hover, .incorrect:hover{
                    cursor: pointer;
                }`
            },
        },
    };
    
    class PassageHighlightPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial, on_load){
            //some content from plugin-audio-button-response
            //hold the .resolve() function from the Promise that ends the trial
            let trial_complete;
            // setup stimulus
            var context = this.jsPsych.pluginAPI.audioContext();
           
            //record webaudio context start time
            var startTime;          
            // load audio file
            this.jsPsych.pluginAPI
                .getAudioBuffer(trial.stimulus)
                .then((buffer) => {
                    if (context !== null) {
                        this.audio = context.createBufferSource();
                        this.audio.buffer = buffer;
                        this.audio.connect(context.destination);
                    }
                    else {
                        this.audio = buffer;
                        this.audio.currentTime = 0;
                    }
                    setupTrial();
                })
                .catch((err) => {
                    console.error(`${trial.stimulus} had an error :')`);
                    console.error(err);
            });
            //create trialdata object so we can add RT to it
            var trialdata = {
                // "response": JSON.stringify(answers),
                "trial_name": trial.trial_name,
            };

            const setupTrial = () => {
                // end trial after set time limit
                if (trial.test_length !== null) {
                    this.jsPsych.pluginAPI.setTimeout(() => {
                        end_trial();
                    }, trial.test_length * 1000);   // convert to ms
                }
                
                //setting up html for the page, inserting CSS for simple or chinese trial types
                var html = '';
                html += '<style>'+trial.custom_css+'</style>'
                if (trial.preamble !== null) {
                    html += '<div id="passage-highlight-preamble" class="passage-highlight-preamble">' + trial.preamble + '</div>';
                }
                //Audio
                html += '<audio preload="auto" autoplay'
                if(trial.allow_audio_control){
                    html += ' controls';
                }
                html += '><source src="'+ trial.stimulus + '" type="audio/mpeg"></audio>';
                
                //Text Section
                var ofInterest;
                if(trial.pinyin_pairing){
                    html += parseChinese();
                    ofInterest = display_element.getElementsByClassName('ofInterestChinese');
                }
                else{
                    html += parseSimple();
                    ofInterest = display_element.getElementsByClassName('ofInterest');
                };
                display_element.innerHTML = html;

                //function called by clicking on words of interest
                function toggleCorrect(){
                    //console.log("click detected :)");
                    if(this.classList.contains('correct')){
                        //console.log("marked incorrect");
                        this.classList.add('incorrect');
                        this.classList.remove('correct');
                    }
                    else if(this.classList.contains('incorrect')){
                        //console.log("marked correct");
                        this.classList.add('correct');
                        this.classList.remove('incorrect');
                    }
                };

                //listens for clicks to mark ofInterest words as in/correct
                for(var i = 0; i < ofInterest.length; i++){
                    ofInterest[i].addEventListener("click", toggleCorrect);
                }

                //functions for parsing "simple" text and Chinese, using custom CSS from above (simple = not pairing text)
                function parseSimple(){
                    var correct = trial.default_correct?'correct':'incorrect';
                    //find anything enclosed in the word_tag_char to mark it
                    var findOfInterest = new RegExp(trial.word_tag_char  +"([^" + trial.word_tag_char +"]*)"+ trial.word_tag_char, 'gu');
                    var retString = '<div id="passage-highlight-simple">';
                    //mark the words of interest
                    retString += (trial.text).replace(findOfInterest, '<mark class="ofInterest ' + correct + '">$1</mark>');           
                    retString += '</div>'
                    return retString;
                }
                function parseChinese(){
                    var correct = trial.default_correct?'correct':'incorrect';
                    //regex to find anything enclosed in the word_tag_char to mark it
                    var findOfInterest = new RegExp(trial.word_tag_char +"([^\\s^" + trial.word_tag_char +"]* [\u4E00-\u9Fcc])"+ trial.word_tag_char, 'gu');
                    //regex to find any instances of pinyin followed by a chinese character
                    var pinyinUnifiedPairs = new RegExp("([^\\s^" + trial.word_tag_char +"^>]*) ([\u4E00-\u9Fcc])", 'gu');
                    //regex to find any punctuation
                    var punct = new RegExp("\s?(['，,。“‘’”'：！])\s?", 'gu');
                    var retString = '<div id="passage-highlight-chinese">';
                    //surround punctuation with a div
                    var withPunct = (trial.text).replace(punct, '<div class="punctuation">$1 </div>');
                    //surround words we are interested in with a div
                    var withMarks = withPunct.replace(findOfInterest, '<div class="ofInterestChinese '+ correct + '">$1</div>');
                    //surround pinyin followed by a chinese character with formatting to make it appear correctly
                    retString += withMarks.replace(pinyinUnifiedPairs, '<div class="chinesePair"><div class="pinyin">$1</div><div class="unifiedUni">$2</div></div>');

                    retString += '</div>'
                    return retString;
                }

                on_load();
                // start time
                startTime = performance.now();
            } // end of setup trial
            
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                /* //stop the audio file if it is playing
                // remove end event listeners if they exist
                if (context !== null) {
                    this.audio.stop();
                }
                else {
                    this.audio.pause();
                }*/
                
                // save responses
                if(trial.pinyin_pairing){
                    var ofInterest = display_element.getElementsByClassName('ofInterestChinese');
                }else{
                    var ofInterest = display_element.getElementsByClassName('ofInterest');
                }
                //adding information for the results file: number of questions & name of audio file
                trialdata["question_count"] = ofInterest.length;           
                trialdata["stimulus"] = trial.stimulus;

                //add information for words of interest
                for(var i = 0; i < ofInterest.length; i++){
                    // remove listener for clicks
                    ofInterest[i].removeEventListener("click", this.toggleCorrect)
                    // save data
                    var marked = 'incorrect';
                    if(ofInterest[i].classList.contains('correct')){
                        marked = 'correct';
                    }
                    trialdata['q' + (i + 1)] = marked;
                }

                display_element.innerHTML = '';
                this.jsPsych.finishTrial(trialdata);
                trial_complete();
            }
            return new Promise((resolve) => {
                trial_complete = resolve;
            });
        }// end of trial
    //simulate stuff from other plugin would go here, if we had it
    } // end of class
    PassageHighlightPlugin.info = info;
    return PassageHighlightPlugin;
})(jsPsychModule);