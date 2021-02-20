/*
	* family-info
    * A jspsych plugin which takes the results of a T/F question
    * and produces a table for each Y which requests further info.
    * If none are selected, no trial is generated.
	* - Ankit Dassor
*/

jsPsych.plugins["family-info"] = (function () {
	var plugin = {};
	plugin.info = {
		name: "family-info",
		familyription: '',
		parameters: {
			proceed: {
				type: jsPsych.plugins.parameterType.COMPLEX,
				array: false,
				pretty_name: 'family experience',
				familyription: 'The t/f that controls which prompts to display to user',
				default: false
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				familyription: 'HTML formatted string to display at the top of the page above the table.'
			},
			json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                default: 'response'
            },
			button_label: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button label',
				default: 'Continue',
				familyription: 'The text that appears on the button to finish the trial.'
			}
		}
	}

	plugin.trial = function (display_element, trial) {
		if(trial.proceed == false){
			// Initialize form and add preamble if any
			var html = '';
			if (trial.preamble !== null) {
				html += '<div id="family-info-preamble" class="family-info-preamble">' + trial.preamble + '</div>';
			}
			// Table headers and formatting
			var exp_strings = ["Family Language Exposure"];

			html += '<table align="center" id="family-info-table" class="family-info-table">';
			
			html += '<tr class="family-info-header" id="family-info-table-header">';
			html += '<td class="family-info-header-col">Family Member</td>';
			html += '<td class="family-info-header-col">Language Spoken</td>';
			html += '<td class="family-info-header-col">Proportion Spoken</td>';
			html += '<td class="family-info-header-col">Hours Spent</td>';
			html += '</tr>';

			for(var i = 0; i < 8; i++){
				html += '<tr class="family-info-row" id="family-info-row-' + i + '">';
				html += '<td class="family-info-family">' + '<input class="family-info-family-response" type="text" name="#family-info-family-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-language">' + '<input class="family-info-language-response" type="text" name="#family-info-language-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-proportion">' + '<input class="family-info-proportion-response" type="text" name="#family-info-proportion-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-hours">' + '<input class="family-info-hours-response" type="text" name="#family-info-hours-response" size="20"></input>' + '</td>';
				html += '</tr>'
			}

			html += '</table>'
			
			html += '<button id="family-info-next" class="family-info-next" style= color:"white"> ' + trial.button_label + '</button>';
			
			display_element.innerHTML = html;

			
			var startTime = (new Date()).getTime();
			display_element.querySelector('#family-info-next').addEventListener('click', function () {
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
						var row = display_element.querySelector('#family-info-row-' + tab_index).childNodes;
						var family = row[0].firstChild.value;
						if(family != ''){
							var language = row[1].firstChild.value;
							var proportion = row[2].firstChild.value;
							var hours = row[3].firstChild.value;

							var currQBase = 4 * tab_index + 1;
							trialdata['q' + currQBase] = family;
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
				html += '<div id="family-info-preamble" class="family-info-preamble">' + trial.preamble + '</div>';
			}
			// Table headers and formatting
			var exp_strings = ["Family Language Exposure"];

			html += '<table align="center" id="family-info-table" class="family-info-table">';
			
			html += '<tr class="family-info-header" id="family-info-table-header">';
			html += '<td class="family-info-header-col">Family Member</td>';
			html += '<td class="family-info-header-col">Language Spoken</td>';
			html += '<td class="family-info-header-col">Proportion Spoken</td>';
			html += '<td class="family-info-header-col">Hours Spent</td>';
			html += '</tr>';

			for(var i = 0; i < 8; i++){
				html += '<tr class="family-info-row" id="family-info-row-' + i + '">';
				html += '<td class="family-info-family">' + '<input class="family-info-family-response" type="text" name="#family-info-family-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-language">' + '<input class="family-info-language-response" type="text" name="#family-info-language-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-proportion">' + '<input class="family-info-proportion-response" type="text" name="#family-info-proportion-response" size="20"></input>' + '</td>';
				html += '<td class="family-info-hours">' + '<input class="family-info-hours-response" type="text" name="#family-info-hours-response" size="20"></input>' + '</td>';
				html += '</tr>'
			}

			html += '</table>'
			
			html += '<button id="family-info-next" class="family-info-next" style= color:"white"> ' + trial.button_label + '</button>';
			
			display_element.innerHTML = html;

			
			var startTime = (new Date()).getTime();
			display_element.querySelector('#family-info-next').addEventListener('click', function () {
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
						var row = display_element.querySelector('#family-info-row-' + tab_index).childNodes;
						var family = row[0].firstChild.value;
						if(family != ''){
							var language = row[1].firstChild.value;
							var proportion = row[2].firstChild.value;
							var hours = row[3].firstChild.value;

							var currQBase = 4 * tab_index + 1;
							trialdata['q' + currQBase] = family;
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
