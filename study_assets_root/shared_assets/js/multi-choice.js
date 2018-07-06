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
jsPsych.plugins['multi-choice'] = (function () {
	var plugin = {};
	plugin.info = {
        name: 'multi-choice',
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
                default: 'null'
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
        var html = '<form id="multi-choice">';

        if (trial.preamble !== null) {
            html += '<div class="multi-choice-preamble">' + trial.preamble + '</div>';
        }
        if (trial.passage != null){
            if(trial.passage_language == 'mandarin'){
                html += '<h3>Passage</h3><div id="multi-choice-passage-mandarin">' + parseMandarin() + '</div>' ;
            }else if(trial.passage_language == 'english'){
                html += '<h2>Passage</h2><div id="multi-choice-passage-english">' + trial.passage + '</div>';
            }
        }
        
        
        html += '<h3>Questions</h3><div class="multi-choice-questions">';
        for(var currQuestion = 1; currQuestion <= trial.questions.length; currQuestion++){
            html += '<div class="multi-choice-question" id="multi-choice-question-' + currQuestion + '">';
            html += '<p class="multi-choice-question-prompt">' + currQuestion + '. ' + trial.questions[currQuestion-1].prompt + '</p>';
            for(var currOption = 1; currOption <= trial.questions[currQuestion-1].options.length; currOption++){
                html += '<div class="multi-choice-question-option-container">';
                html += '<input type="radio" class="multi-choice-question-option" id="multi-choice-question-'+currQuestion+'-option-' + currOption + '" value="'+trial.questions[currQuestion-1].options[currOption-1]+'"  name="multi-choice-question-'+currQuestion + '" required>';
                html += '<label for="multi-choice-question-'+currQuestion+'-option-' + currOption + '">' + trial.questions[currQuestion-1].options[currOption-1]+'</label>';
                html += '</div>';
            }
            html += '</div>';
        }
        html += '</div>';


        html += '</form><input type="submit" class="jspsych-btn" type="submit" form="multi-choice" id="multi-choice-next" value="' + trial.button_label + '"></input>';

        display_element.innerHTML = html;
        function parseMandarin(){
            var pinyinUnifiedPairs = new RegExp(/([^\s^>]*) ([\u4E00-\u9Fcc])/gu);
            var punct = new RegExp(/\s?(['，,。“‘’”'：！])\s?/gu);
            var withPunct = (trial.passage).replace(punct, '<div class="punctuation">$1 </div>');
            var toRet = withPunct.replace(pinyinUnifiedPairs, '<div class="mandarinPair"><div class="pinyin">$1</div><div class="unifiedUni">$2</div></div>');

            return toRet;

        }   
        display_element.querySelector("#multi-choice").addEventListener('submit', function (event) {
            event.preventDefault();
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			// create object to hold responses
            var answers = {};
            var options = document.querySelectorAll("input[type=radio]:checked");
            for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
                var id = "Q" + currAnswer;
                var answer = {};
                answer[id] = options[currAnswer].value;
                Object.assign(answers, answer);
            }

            var trialdata = {
                "rt": response_time,
                [trial.json_label] : answers
            };
            jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
    }
    return plugin;
})();