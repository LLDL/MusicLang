/*
	* members-info
	* A jspsych plugin which given a list of languages produces a
	* table to be filled in detailing the age learning a language 
	* began and how many years of learning have been completed.
	* - Ankit Dassor
*/

jsPsych.plugins["members-info"] = (function () {
	var plugin = {};
	plugin.info = {
		name: "members-info",
		description: '',
		parameters: {
			members: {
				type: jsPsych.plugins.parameterType.STRING,
				array: true,
				pretty_name: 'members',
				description: 'The members the subject specified in members_info',
				default: undefined
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above all the members.'
			},
			json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                default: 'response'
            },
			button_label: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button label',
				default: 'Continue',
				description: 'The text that appears on the button to finish the trial.'
			}
		}
	}

	plugin.trial = function (display_element, trial) {
		// Initialize form and add preamble if any
		var html = '';
		if (trial.preamble !== null) {
			html += '<div id="jspsych-members-info-preamble" class="jspsych-members-info-preamble">' + trial.preamble + '</div>';
		}
		// Table headers and formatting
		html += '<table align="center" id="jspsych-members-info-table class="jspsych-members-info-table">';
		html += '<tr class="jspsych-members-info-header" id="jspsych-members-info-table-header">';
		html += '<td class="jspsych-members-info-header-col">Individual</td>';
		html += '<td class="jspsych-members-info-header-col">Proportion Spoken</td>';
		html += '<td class="jspsych-members-info-header-col">Hours Spent</td>';
		html += '</tr>';

		//Show all languages in table
		for (var i = 0; i < 8; i++) {
			if (trial.members[i] == undefined) {
				break;
			}
			html += '<tr class="jspsych-members-info-members-row" id="members-row-' + i + '">';
			html += '<td class="jspsych-members-info-members">' + trial.members[i] + '</td>';
			html += '<td class="jspsych-members-info-age">' + '<input class="jspsych-members-info-age-response" type="text" name="#jspsych-members-info-age-response" size="10"></input>' + '</td>';
			html += '<td class="jspsych-members-info-years">' + '<input class="jspsych-members-info-year-response" type="text" name="#jspsych-members-info-year-response" size="10"></input>' + '</td>';
			html += '</tr>'
		}
		html += '</table>';
		html += '<button id="jspsych-members-info-next" class="jspsych-members-info-next">' + trial.button_label + '</button>';

		display_element.innerHTML = html;
		display_element.querySelector('#jspsych-members-info-next').addEventListener('click', function () {
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			var trialdata = {
				"trial_name": trial.json_label,
				"rt": response_time
			};
			var members = display_element.querySelectorAll('.jspsych-members-info-members');
			var ages = display_element.querySelectorAll('.jspsych-members-info-age-response');
			var years = display_element.querySelectorAll('.jspsych-members-info-year-response');
			trialdata['question_count'] = members.length * 3; 
			
			for (var i = 0; i < members.length; i++) {
				var membersinfo = [members[i].innerHTML, ages[i].value, years[i].value];
				for (var j = 0; j<3; j++){
					var currQ = 3*i + j + 1;
					trialdata['q' + currQ] = membersinfo[j];
				}
			}
			
			display_element.innerHTML = '';
			jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
	};
	return plugin;
})();
