/*
    * multi-choice.js
    * A jspsych plugin for multiple choice survey questions that follows a
    * preamble and section (text) capable of displaying Mandarin & Pinyin together, for example:
    * péng 朋 you 友 
    * will display as:
    * péng  you
    * 朋    友
    * If this is not desired, entering "english" into the text_language will
    * make this behave very similarly to survey-multi-choice
    * 
    * - Ankit Dassor        
*/
jsPsych.plugins['multi-choice-mandarin'] = (function () {
	var plugin = {};
	plugin.info = {
        name: 'multi-choice-mandarin',
        description: '',
        parameters: {
            questions: {
                type: jsPsych.plugins.parameterType.COMPLEX,
                array: true,
                pretty_name: 'Questions',
                nested: {
                  prompt: {type: jsPsych.plugins.parameterType.STRING,
                             pretty_name: 'Prompt',
                             default: undefined,
                             description: 'The strings that will be associated with a group of options.'},
                  options: {type: jsPsych.plugins.parameterType.STRING,
                             pretty_name: 'Options',
                             array: true,
                             default: undefined,
                             description: 'Displays options for an individual question.'}
                }
            },
            json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'JSON Label',
				default: 'multi-choice'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the page above all the questions.'
            },
            passage: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Passage',
                default: null,
                description: 'Passage to display that relates to the questions, formatted with html.'
            },
            passage_language: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Language the passage is in (english or mandarin)',
                default: 'english'
            },
            button_label: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button label',
				default: 'Continue',
				description: 'The text that appears on the button to finish the trial.'
			}
        }
    }
    plugin.trial = function(display_element, trial){
        var html = '';

        if (trial.preamble !== null) {
            html += '<div class="multi-choice-preamble">' + trial.preamble + '</div>';
        }

        if(trial.passage_language == 'mandarin'){
            html += parseMandarin();
        }else{
            html += '<div class="multi-choice-passage">' + trial.passage + '</div>';
        }
        
        html += '<div class="multi-choice-questions">';
        for(var currQuestion = 0; currQuestion < trial.questions.length; currQuestion++){
            html += '<div class="multi-choice-question" id="multi-choice-question-' + (currQuestion+1) + '">"';
            html += '<label class="multi-choice-question-prompt" for="multi-choice-question-options-' + (currQuestion+1) + '">' + (currQuestion+1) + '. ' + trial.questions[currQuestion].prompt + '</label>';
            // for(var currOption = 0; currOption < trial.questions[currQuestion].options.length; currOption++){

            // }

        }
        html += '</div>';


        html += '<button id="multi-choice-next">' + trial.button_label + '</button>';

        display_element.innerHTML = html;
        function parseMandarin(){
            var pinyinUnifiedPairs = new RegExp(/([^\s^>]*) ([\u4E00-\u9Fcc])/gu);
            var punct = new RegExp(/\s?(['，,。“‘’”'：！])\s?/gu);
            var withPunct = (trial.passage).replace(punct, '<div class="punctuation">$1 </div>');
            var toRet = withPunct.replace(pinyinUnifiedPairs, '<div class="mandarinPair"><div class="pinyin">$1</div><div class="unifiedUni">$2</div></div>');

            return toRet;

        }   
        display_element.querySelector('#multi-choice-next').addEventListener('click', function () {
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			// create object to hold responses
           

            var trialdata = {
                "rt": response_time,
                // [trial.json_label] : answers
            };
            jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
    }
    return plugin;
})();