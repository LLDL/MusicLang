/*
    * list-of-answers.js
    * A jspsych plugin for providing an array of prompts, one per page, and 
    * recieving up to n responses per prompt, with the first m being mandatory
    * 
    * - Ankit Dassor        
*/
jsPsych.plugins['list-of-answers'] = (function () {
	var plugin = {};
	plugin.info = {
        name: 'list-of-answers',
        description: '',
        parameters: {
            questions: {
                type: jsPsych.plugins.parameterType.COMPLEX,
                array: true,
                pretty_name: 'Questions',
                nested: {
                    prompts: {
                        type: jsPsych.plugins.parameterType.STRING,
                        pretty_name: 'Prompts',
                        default: undefined,
                        array: true,
                        description: 'The prompts that will be associated with a group of responses.'
                    },
                    max_response_count: {
                        type: jsPsych.plugins.parameterType.INT,
                        pretty_name: 'Max Response Count per Prompt',
                        array: false,
                        default: undefined,
                        description: 'This many prompt input bars will be available for an individual prompt.'
                    },
                    min_response_count: {
                        type: jsPsych.plugins.parameterType.INT,
                        pretty_name: 'Min Response Count per Prompt',
                        array: false,
                        default: undefined,
                        description: 'This many prompt input bars will be required for an individual prompt: ie the first n input bars will be required.'
                    },
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
                description: 'HTML formatted string to display at the top of the  each prompt.'
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
				description: 'The text that appears on the button to continue the experiment.'
            },
        }
    }
    plugin.trial = function(display_element, trial){
    //     var html = '<form id="multi-choice">';

    //     if (trial.preamble !== null) {
    //         html += '<div class="multi-choice-preamble">' + trial.preamble + '</div>';
    //     }
    //     if (trial.passage != null){
    //         if(trial.passage_language == 'mandarin'){
    //             html += '<h3>Passage</h3><div id="multi-choice-passage-mandarin">' + parseMandarin() + '</div>' ;
    //         }else if(trial.passage_language == 'english'){
    //             html += '<h2>Passage</h2><div id="multi-choice-passage-english">' + trial.passage + '</div>';
    //         }
    //     }
        
        
    //     html += '<h3>Questions</h3><div class="multi-choice-questions">';
    //     for(var currQuestion = 1; currQuestion <= trial.questions.length; currQuestion++){
    //         html += '<div class="multi-choice-question" id="multi-choice-question-' + currQuestion + '">';
    //         html += '<p class="multi-choice-question-prompt">' + currQuestion + '. ' + trial.questions[currQuestion-1].prompt + '</p>';
    //         for(var currOption = 1; currOption <= trial.questions[currQuestion-1].options.length; currOption++){
    //             html += '<div class="multi-choice-question-option-container';
    //             if(trial.horizontal){
    //                 html += ' horizontal';
    //             }
    //             html += '">';
    //             html += '<input type="radio" class="multi-choice-question-option" id="multi-choice-question-'+currQuestion+'-option-' + currOption + '" value="'+trial.questions[currQuestion-1].options[currOption-1]+'"  name="multi-choice-question-'+currQuestion + '" required>';
    //             html += '<label for="multi-choice-question-'+currQuestion+'-option-' + currOption + '">' + trial.questions[currQuestion-1].options[currOption-1]+'</label>';
    //             html += '</div>';
    //         }
    //         html += '</div>';
    //     }
    //     html += '</div>';


    //     html += '</form><input type="submit" class="jspsych-btn" type="submit" form="multi-choice" id="multi-choice-next" value="' + trial.button_label + '"></input>';

    //     display_element.innerHTML = html;
    //     function parseMandarin(){
    //         var pinyinUnifiedPairs = new RegExp(/([^\s^>]*) ([\u4E00-\u9Fcc])/gu);
    //         var punct = new RegExp(/\s?(['，,。“‘’”'：！])\s?/gu);
    //         var withPunct = (trial.passage).replace(punct, '<div class="punctuation">$1 </div>');
    //         var toRet = withPunct.replace(pinyinUnifiedPairs, '<div class="mandarinPair"><div class="pinyin">$1</div><div class="unifiedUni">$2</div></div>');

    //         return toRet;

    //     }   
    //     display_element.querySelector("#multi-choice").addEventListener('submit', function (event) {
    //         event.preventDefault();
	// 		// measure response time
	// 		var endTime = (new Date()).getTime();
	// 		var response_time = endTime - startTime;
    //         var trialdata = {
	// 			"trial_name": trial.json_label,
    //             "rt": response_time
    //         };
    //         var options = document.querySelectorAll("input[type=radio]:checked");
    //         for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
    //             trialdata['q' + (currAnswer + 1)] = options[currAnswer].value
    //         }
    //         trialdata["question_count"] = trial.questions.length;
    //         jsPsych.finishTrial(trialdata);
	// 	});
	// 	var startTime = (new Date()).getTime();
    // }
    // return plugin;
})();