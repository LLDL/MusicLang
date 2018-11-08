/*
    * multi-choice.js
    * A jspsych plugin for multiple choice survey questions that follows a
    * preamble and section (text) capable of displaying Mandarin & Pinyin together, for example:
    * péng 朋 you 友. 
    * will display as:
    * péng  you
    * 朋    友  .
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
            },
            horizontal: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Horizontal Options',
                default: false,
                description: 'Whether to display options horizontally or vertically'
            },
            starting_question_number: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Where to start numbering the questions',
                default: 1
            },
            use_passage_header: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Create a "Passage" Header',
                default: true
            },
        }
    }
    plugin.trial = function(display_element, trial){
        var html = '<form id="multi-choice">';

        if (trial.preamble !== null) {
            html += '<div class="multi-choice-preamble">' + trial.preamble + '</div>';
        }
        if (trial.passage != null){
            if(trial.passage_language == 'mandarin'){
                if(trial.use_passage_header){
                    html += '<h3>Passage</h3>';
                }
                html += '<div id="multi-choice-passage-mandarin">' + parseMandarin() + '</div>' ;
            }else if(trial.passage_language == 'english'){
                if(trial.use_passage_header){
                    html += '<h2>Passage</h2>';
                }
                html += '<div id="multi-choice-passage-english">' + trial.passage + '</div>';
            }
        }
        
        
        html += '<h3>Questions</h3><div class="multi-choice-questions">';
        for(var currQuestion = trial.starting_question_number; currQuestion < trial.questions.length+trial.starting_question_number; currQuestion++){
            html += '<div class="multi-choice-question" id="multi-choice-question-' + currQuestion + '">';
            html += '<p class="multi-choice-question-prompt">' + currQuestion + '. ' + trial.questions[currQuestion-trial.starting_question_number].prompt + '</p>';
            for(var currOption = 1; currOption <= trial.questions[currQuestion-trial.starting_question_number].options.length; currOption++){
                html += '<div class="multi-choice-question-option-container';
                if(trial.horizontal){
                    html += ' horizontal';
                }
                html += '">';
                html += '<input type="radio" class="multi-choice-question-option" id="multi-choice-question-'+currQuestion+'-option-' + currOption + '" value="'+trial.questions[currQuestion-trial.starting_question_number].options[currOption-1]+'"  name="multi-choice-question-'+currQuestion + '" required>';
                html += '<label for="multi-choice-question-'+currQuestion+'-option-' + currOption + '">' + trial.questions[currQuestion-trial.starting_question_number].options[currOption-1]+'</label>';
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
            var trialdata = {
				"trial_name": trial.json_label,
                "rt": response_time
            };
            var options = document.querySelectorAll("input[type=radio]:checked");
            for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
                trialdata['q' + (currAnswer + trial.starting_question_number)] = options[currAnswer].value
            }
            trialdata["question_count"] = trial.questions.length;
            jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
    }
    return plugin;
})();