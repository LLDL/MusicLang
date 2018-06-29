/*
    * survey-multi-choice-mand-pre.js
    * A jspsych plugin for multiple choice survey questions that follows a
    * preamble capable of displaying Mandarin & Pinyin together, for example:
    * péng 朋 you 友 
    * will display as:
    * péng  you
    * 朋    友
    * If this is not desired, entering "english" into the text_language will
    * make this behave very similarly to survey-multi-choice
    * 
    * The fields are:
    * - json_label:                 Wraps output ie: $jsonLabel: {'question': 'answer'...,}
    * - preamble:                   Header to put at top of page   
    * - preamble_language:          english/mandarin: changes expected format
    * - button_label:               label of the button to continue
    * - questions:                  array containing questions
    * 
    * - Ankit Dassor        
*/
jsPsych.plugins['survey-multi-choice-mand-pre'] = (function () {
	var plugin = {};

	plugin.info = {
        name: 'survey-multi-choice-mand-pre',
        description: '',
        parameters: {
            json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'JSON Label',
				default: 'multi-choice-mand-pre'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the page above all the questions.'
            },
            preamble_language: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Language the text is in (english or mandarin)',
                default: 'english'
            },
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
            }
        }
    }
    plugin.trial = function (display_element, trial){
        
    }
    return plugin;
});