/**
 * survey-yes-no
 * A jspsych plugin for yes/no survey questions which given a list
 * of questions generates HTML for users to answer them.
 * - Ankit Dassor
 */


jsPsych.plugins['survey-yes-no'] = (function () {
	var plugin = {};

	plugin.info = {
		name: 'survey-yes-no',
		description: '',
		parameters: {
			questions: {
				type: jsPsych.plugins.parameterType.COMPLEX,
				array: true,
				pretty_name: 'Questions',
				nested: {
					prompt: {
						type: jsPsych.plugins.parameterType.STRING,
						pretty_name: 'Prompt',
						default: undefined,
						description: 'The strings that will be associated with Y/N.'
					},
				}
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above all the questions.'
			},
			json_label: {
				type: jsPsych.plugins.parameterType.STRING,
				default: 'response'
			},
			button_label: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button label',
				default: 'Continue',
				description: 'Label of the button.'
			}
		}
	}
	plugin.trial = function (display_element, trial) {
		var html = '';
		if (trial.preamble !== null) {
			html += '<div id="jspsych-language-info-preamble" class="jspsych-language-info-preamble">' + trial.preamble + '</div>';
		}
		for (var i = 0; i < trial.questions.length; i++) {
			html += '<div class="survey-yes-no-question" id="survey-yes-no-question-' + i + '">';
			html += '<p>' + trial.questions[i].prompt + '</p>';
			html += '<input type="radio" class="survey-yes-no-response" id="survey-yes-no-response-' + i + '-' + 0 + '" name="' + i + '" value="true">Yes';
			html += '<input type="radio" class="survey-yes-no-response" id="survey-yes-no-response-' + i + '-' + 1 + '" name="' + i + '" value="false">No';
			html += '</div>';
		}
		html += '<button id="survey-yes-no-next" class="jspsych-btn jspsych-yes-no-next">' + trial.button_label + '</button>';
		display_element.innerHTML = html;

		display_element.querySelector('#survey-yes-no-next').addEventListener('click', function () {
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			var trialdata = {
				"trial_name": trial.json_label,
				"rt": response_time,
				"question_count": trial.questions.length
			};

			for (var i = 0; i < trial.questions.length; i++) {
				var curr_yes = document.getElementById("survey-yes-no-response-" + i + "-0").checked;
				if (curr_yes == true) {
					trialdata['q' + (i + 1)] = true;
				} else {
					trialdata['q' + (i + 1)] = false;
				}
			}

			display_element.innerHTML = '';
			jsPsych.finishTrial(trialdata);
		});

		var startTime = (new Date()).getTime();
	};
	return plugin;
})();
