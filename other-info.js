/*
	* other-info
    * A jspsych plugin which takes the results of a T/F question
    * and produces a table for each Y which requests further info.
    * If none are selected, no trial is generated.
	* - Ankit Dassor
*/

jsPsych.plugins["other-info"] = (function () {
	var plugin = {};
	plugin.info = {
		name: "other-info",
		description: '',
		parameters: {
			proceed: {
				type: jsPsych.plugins.parameterType.COMPLEX,
				array: false,
				pretty_name: 'other individual experience',
				description: 'The t/f that controls which prompts to display to user',
				default: false
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above the table.'
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
		if(trial.proceed == false){
			// Initialize form and add preamble if any
			var html = '';
			if (trial.preamble !== null) {
				html += '<div id="other-info-preamble" class="other-info-preamble">' + trial.preamble + '</div>';
			}
			// Table headers and formatting
			var exp_strings = ["Other Language Exposure"];

			html += '<table align="center" id="other-info-table" class="other-info-table">';
			
			html += '<tr class="other-info-header" id="other-info-table-header">';
			html += '<td class="other-info-header-col">Individual</td>';
			html += '<td class="other-info-header-col">Language Spoken</td>';
			html += '<td class="other-info-header-col">Proportion Spoken</td>';
			html += '<td class="other-info-header-col">Hours Spent</td>';
			html += '</tr>';

			for(var i = 0; i < 8; i++){
				html += '<tr class="other-info-row" id="other-info-row-' + i + '">';
				html += '<td class="other-info-other">' + '<input class="other-info-family-response" type="text" name="#other-info-other-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-language">' + '<input class="other-info-language-response" type="text" name="#other-info-language-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-proportion">' + '<input class="other-info-proportion-response" type="text" name="#other-info-proportion-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-hours">' + '<input class="other-info-hours-response" type="text" name="#other-info-hours-response" size="20"></input>' + '</td>';
				html += '</tr>'
			}

			html += '</table>'
			
			html += '<button id="other-info-next" class="other-info-next">' + trial.button_label + '</button>';
			display_element.innerHTML = html;

			
			var startTime = (new Date()).getTime();
			display_element.querySelector('#other-info-next').addEventListener('click', function () {
				//measure response time
				endTime = (new Date()).getTime();
				var response_time = endTime - startTime;
				var trialdata = {
					"trial_name": trial.json_label,
					"rt": response_time
				};
				if(trial.proceed){
					var tab_index;
					for(tab_index = 0; tab_index < 8; tab_index++){
						var row = display_element.querySelector('#other-info-row-' + tab_index).childNodes;
						var other = row[0].firstChild.value;
						if(other != ''){
							var language = row[1].firstChild.value;
							var proportion = row[2].firstChild.value;
							var hours = row[3].firstChild.value;

							var currQBase = 4 * tab_index + 1;
							trialdata['q' + currQBase] = other;
							trialdata['q' + (currQBase + 1)] = language;
							trialdata['q' + (currQBase + 2)] = proportion;
							trialdata['q' + (currQBase + 3)] = hours;
							
						}
					};
					trialdata['question_count'] = tab_index * 4;
				}
				
				
				display_element.innerHTML = '';
				// next trial
				jsPsych.finishTrial(trialdata);
			});
			
		}else{
			// Initialize form and add preamble if any
			var html = '';
			if (trial.preamble !== null) {
				html += '<div id="other-info-preamble" class="other-info-preamble">' + trial.preamble + '</div>';
			}
			// Table headers and formatting
			var exp_strings = ["Other Language Exposure"];

			html += '<table align="center" id="other-info-table" class="other-info-table">';
			
			html += '<tr class="other-info-header" id="other-info-table-header">';
			html += '<td class="other-info-header-col">Individual</td>';
			html += '<td class="other-info-header-col">Language Spoken</td>';
			html += '<td class="other-info-header-col">Proportion Spoken</td>';
			html += '<td class="other-info-header-col">Hours Spent</td>';
			html += '</tr>';

			for(var i = 0; i < 8; i++){
				html += '<tr class="other-info-row" id="other-info-row-' + i + '">';
				html += '<td class="other-info-other">' + '<input class="other-info-family-response" type="text" name="#other-info-other-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-language">' + '<input class="other-info-language-response" type="text" name="#other-info-language-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-proportion">' + '<input class="other-info-proportion-response" type="text" name="#other-info-proportion-response" size="20"></input>' + '</td>';
				html += '<td class="other-info-hours">' + '<input class="other-info-hours-response" type="text" name="#other-info-hours-response" size="20"></input>' + '</td>';
				html += '</tr>'
			}

			html += '</table>'
			
			html += '<button id="other-info-next" class="other-info-next">' + trial.button_label + '</button>';
			display_element.innerHTML = html;

			
			var startTime = (new Date()).getTime();
			display_element.querySelector('#other-info-next').addEventListener('click', function () {
				//measure response time
				endTime = (new Date()).getTime();
				var response_time = endTime - startTime;
				var trialdata = {
					"trial_name": trial.json_label,
					"rt": response_time
				};
				if(trial.proceed){
					var tab_index;
					for(tab_index = 0; tab_index < 8; tab_index++){
						var row = display_element.querySelector('#other-info-row-' + tab_index).childNodes;
						var other = row[0].firstChild.value;
						if(other != ''){
							var language = row[1].firstChild.value;
							var proportion = row[2].firstChild.value;
							var hours = row[3].firstChild.value;

							var currQBase = 4 * tab_index + 1;
							trialdata['q' + currQBase] = other;
							trialdata['q' + (currQBase + 1)] = language;
							trialdata['q' + (currQBase + 2)] = proportion;
							trialdata['q' + (currQBase + 3)] = hours;
							
						}
					};
					trialdata['question_count'] = tab_index * 4;
				}
				
				
				display_element.innerHTML = '';
				// next trial
				jsPsych.finishTrial(trialdata);
			});
			
		};
	}
	return plugin;
})();
