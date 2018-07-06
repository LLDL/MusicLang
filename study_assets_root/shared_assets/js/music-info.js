/*
	* music-info
    * A jspsych plugin which takes the results of a 3-question T/F
    * about whether participant has:
    * - played an instrument
    * - sung in a group
    * - studied music
    * and produces a table for each Y which requests further info.
    * If none are selected, no trial is generated.
	* - Ankit Dassor
*/

jsPsych.plugins["music-info"] = (function () {
	var plugin = {};
	plugin.info = {
		name: "music-info",
		description: '',
		parameters: {
			experience: {
				type: jsPsych.plugins.parameterType.COMPLEX,
				array: false,
				pretty_name: 'musical experience',
				description: 'The t/f for whether a participant has played instruments, sung in a group, or studied music that controls which prompts to display to user',
				default: false
			},
			preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above all the languages.'
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
		if(trial.experience == false){
			display_element.innerHTML = '';
			// next trial
			jsPsych.finishTrial();
		}else{
			// Initialize form and add preamble if any
			var html = '';
			if (trial.preamble !== null) {
				html += '<div id="music-info-preamble" class="music-info-preamble">' + trial.preamble + '</div>';
			}
			// Table headers and formatting
			var exp_strings = ["Musical Experience"];

			html += '<table align="center" id="music-info-table" class="music-info-table">';
			
			html += '<tr class="music-info-header" id="music-info-table-header">';
			html += '<td class="music-info-header-col">Description</td>';
			html += '<td class="music-info-header-col">Age Began</td>';
			html += '<td class="music-info-header-col">Years Learned</td>';
			html += '<td class="music-info-header-col">Instruction Type</td>';
			html += '</tr>';

			for(var i = 0; i < 5; i++){
				html += '<tr class="music-info-row" id="music-info-row-' + i + '">';
				html += '<td class="music-info-desc">' + '<input class="music-info-desc-response" type="text" name="#music-info-desc-response" size="20"></input>' + '</td>';
				html += '<td class="music-info-age">' + '<input class="music-info-age-response" type="text" name="#music-info-age-response" size="20"></input>' + '</td>';
				html += '<td class="music-info-years">' + '<input class="music-info-years-response" type="text" name="#music-info-years-response" size="20"></input>' + '</td>';
				html += '<td class="music-info-inst">' + '<input class="music-info-inst-response" type="text" name="#music-info-inst-response" size="20"></input>' + '</td>';
				html += '</tr>'
			}

			html += '</table>'
			
			html += '<button id="music-info-next" class="music-info-next">' + trial.button_label + '</button>';
			display_element.innerHTML = html;

			
			display_element.querySelector('#music-info-next').addEventListener('click', function () {
				//measure response time
				endTime = (new Date()).getTime();
				var response_time = endTime - startTime;
				var exps = {};
				var exp_types = ["Instruments", "Singing in a Group", "Music Study"];

					if(trial.experience){
						var exp = {};
						for(var inst_index = 0; inst_index < 5; inst_index++){
							var row = display_element.querySelector('#music-info-row-' + inst_index).childNodes;
							var desc = row[0].firstChild.value;
							if(desc != ''){
								var age = row[1].firstChild.value;
								var years = row[2].firstChild.value;
								var inst = row[3].firstChild.value;
								var row_obj = {};
								row_obj["Starting Age"] = age;
								row_obj["Years Learned"] = years;
								row_obj["Instruction"] = inst;
								exp[desc] = row_obj;
							}
						};
					}
				
				var trialdata = {
					"rt": response_time,
					[trial.json_label]: exp
				};
				display_element.innerHTML = '';
				// next trial
				jsPsych.finishTrial(trialdata);
			});
			var startTime = (new Date()).getTime();
		};
	}
	return plugin;
})();