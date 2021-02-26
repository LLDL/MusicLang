/*
    * multi-select.js
    * A jspsych plugin for multiple select survey questions
    * modified by Gloriane Jue using Ankit Dassor's template
 *
 * documentation: docs.jspsych.org
 *
 */
 
jsPsych.plugins['multi-select'] = (function () {
	var plugin = {};
	plugin.info = {
        name: 'multi-select',
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
                             description: 'The strings that will be associated with a group of options.'
                  },

                  options: {type: jsPsych.plugins.parameterType.STRING,
                             pretty_name: 'Options',
                             array: true,
                             default: undefined,
                             description: 'Displays options for an individual question.'}
                },
            },
            json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'JSON Label',
				default: 'multi-select'
            },
            name: {
            type: jsPsych.plugins.parameterType.STRING,
            	pretty_name: 'Question Name',
           		default: '',
            	description: 'Controls the name of data values associated with this question'
            },
            horizontal: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Horizontal Options',
                default: false,
                description: 'Whether to display options horizontally or vertically'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the page above all the questions.'
            },
            button_label: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button label',
				default: 'Continue',
				description: 'The text that appears on the button to finish the trial.'
            },
            starting_question_number: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Where to start numbering the questions',
                default: 1
            },
        }
    }
    plugin.trial = function(display_element, trial){
        var html = '<form id="multi-select">';

        if (trial.preamble !== null) {
            html += '<div class="multi-select-preamble">' + trial.preamble + '</div>';
        }
        
        
        for(var currQuestion = trial.starting_question_number; currQuestion < trial.questions.length+trial.starting_question_number; currQuestion++){
            html += '<div class="multi-select-question" id="multi-select-question-' + currQuestion + '">';
            html += '<p class="multi-select-question-prompt">' + trial.questions[currQuestion-trial.starting_question_number].prompt + '</p>';
            for(var currOption = 1; currOption <= trial.questions[currQuestion-trial.starting_question_number].options.length; currOption++){
                html += '<div class="multi-select-question-option-container';
                if(trial.horizontal){
                    html += ' horizontal';
                }
                html += '">';
                html += '<input type="checkbox" class="multi-select-question-option" id="multi-select-question-'+currQuestion+'-option-' + currOption + '" value="'+trial.questions[currQuestion-trial.starting_question_number].options[currOption-1]+'" data-name="'+trial.questions.name+'" name="multi-select-question-'+currQuestion + '">';
                html += '<label for="multi-select-question-'+currQuestion+'-option-' + currOption + '">' + trial.questions[currQuestion-trial.starting_question_number].options[currOption-1]+'</label>';
                html += '</div>';
            }
            html += '</div>';
        }
        html += '</div>';


        html += '</form><input type="submit" class="jspsych-btn" type="submit" form="multi-select" id="multi-select-next" value="' + trial.button_label + '"></input>';
  
    display_element.innerHTML = html;
    display_element.querySelector("#multi-select").addEventListener('submit', function (event) {
            event.preventDefault();
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;
            var trialdata = {
				"trial_name": trial.json_label,
                "rt": response_time
            };
            
            /* testing out data retrieval
            for(var index=0; index<trial.questions.length; index++){
            var options = [];
            function showSelectedValues()
            {
            alert($("input[type=checkbox]:checked").map(
            function () {return this.value;}).get().join(","));
            options.push(showSelectedValues.value)
            }
            }
            
            for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
        trialdata['q' + (currAnswer + trial.starting_question_number)] = val[currAnswer].value
            }
            */
            
            /* testing again..
             for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
        var options = [];
        var inputboxes = document.querySelectorAll("input[type=checkbox]:checked")
        for(var i=0; i<inputboxes.length; i++){
          options.push(inputboxes[i].value)
          Object.assign(options);
          trialdata['q' + trial.starting_question_number] = options[currAnswer].value
        }
        }
        */
        
            for(var index=0; index<trial.questions.length; index++){
        var val = [];
        var inputboxes = document.querySelectorAll("input[type=checkbox]:checked")
        for(var j=0; j<inputboxes.length; j++){
          currentChecked = inputboxes[j];
          val.push(currentChecked.value)
          answer = Object.assign(val);
        }}
        
    
        
        for(var currAnswer = 0; currAnswer<trial.questions.length; currAnswer++){
        trialdata['q' + (currAnswer + trial.starting_question_number)] = answer[currAnswer].value
        }


       		
            jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
    }
    return plugin;
})();
