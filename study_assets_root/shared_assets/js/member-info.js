/*
	* member-info
	* A jspsych plugin which given a list of languages produces a
	* table to be filled in detailing the age learning a language 
	* began and how many years of learning have been completed.
	* - Ankit Dassor
*/

jsPsych.plugins["member-info"] = (function () {
	var plugin = {};
	plugin.info = {
		name: "member-info",
		description: '',
		parameters: {
			member: {
				type: jsPsych.plugins.parameterType.STRING,
				array: true,
				pretty_name: 'Members',
				description: 'The members the subject specified in member_info',
				default: undefined
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above all the member.'
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
			html += '<div id="jspsych-member-info-preamble" class="jspsych-member-info-preamble">' + trial.preamble + '</div>';
		}
		// Table headers and formatting
		html += '<table align="center" id="jspsych-member-info-table class="jspsych-member-info-table">';
		html += '<tr class="jspsych-member-info-header" id="jspsych-member-info-table-header">';
		html += '<td class="jspsych-member-info-header-col">Family Member</td>';
		html += '<td class="jspsych-member-info-header-col">Proportion Spoken</td>';
		html += '<td class="jspsych-member-info-header-col">Hours Spent</td>';
		html += '</tr>';

		//Show all languages in table
		for (var i = 0; i < 8; i++) {
			if (trial.member[i] == undefined) {
				break;
			}
			html += '<tr class="jspsych-member-info-member-row" id="member-row-' + i + '">';
			html += '<td class="jspsych-member-info-member">' + trial.member[i] + '</td>';
			html += '<td class="jspsych-member-info-age">' + '<input class="jspsych-member-info-age-response" type="text" name="#jspsych-member-info-age-response" size="10"></input>' + '</td>';
			html += '<td class="jspsych-member-info-years">' + '<input class="jspsych-member-info-year-response" type="text" name="#jspsych-member-info-year-response" size="10"></input>' + '</td>';
			html += '</tr>'
		}
		html += '</table>';
		html += '<button id="jspsych-member-info-next" class="jspsych-member-info-next">' + trial.button_label + '</button>';

		display_element.innerHTML = html;
		display_element.querySelector('#jspsych-member-info-next').addEventListener('click', function () {
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			var trialdata = {
				"trial_name": trial.json_label,
				"rt": response_time
			};
			var member = display_element.querySelectorAll('.jspsych-member-info-member');
			var ages = display_element.querySelectorAll('.jspsych-member-info-age-response');
			var years = display_element.querySelectorAll('.jspsych-member-info-year-response');
			trialdata['question_count'] = member.length * 3; 
			
			for (var i = 0; i < member.length; i++) {
				var memberinfo = [member[i].innerHTML, ages[i].value, years[i].value];
				for (var j = 0; j<3; j++){
					var currQ = 3*i + j + 1;
					trialdata['q' + currQ] = memberinfo[j];
				}
			}
			
			display_element.innerHTML = '';
			jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
	};
	return plugin;
})();
