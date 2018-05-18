/*
    * gender-info
    * A jspsych plugin which provides a user the ability to give their
    * gender in the following format:
    * [ ] Female
    * [ ] Male
    * [ ] Other _________
    * Providing data normalization and validation for the expirimenter
    * while giving users the ability to accurately provide their
    * gender
    * - Ankit Dassor
*/

jsPsych.plugins["gender-info"] = (function () {
    var plugin = {};
    plugin.info = {
        name: "gender-info",
        description: '',
        parameters: {
            preamble: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Preamble',
				default: null,
				description: 'HTML formatted string to display at the top of the page above all the languages.'
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
        var html = '';
        if (trial.preamble !== null) {
			html += '<div id="jspsych-language-info-preamble" class="jspsych-language-info-preamble">' + trial.preamble + '</div>';
        }
        html += '<div class="jspsych-gender-info-gender"><input type="radio" id="gender-female" name="gender" value="female"/>Female</div>';
        html += '<div class="jspsych-gender-info-gender"><input type="radio" id="gender-male" name="gender" value="male"/>Male</div>';
        html += '<div class="jspsych-gender-info-gender" id="gender-other-container"><input type="radio" id="gender-other" name="gender" value="other"/>';
        html += '<input id="gender-specified" type="text" name="#jspsych-gender-info-other" size="10"/></div>';
        html += '<button id="jspsych-gender-info-next" class="jspsych-gender-info-next">' + trial.button_label + '</button>';

        display_element.innerHTML = html;
		display_element.querySelector('#jspsych-gender-info-next').addEventListener('click', function () {
			// measure response time
			var endTime = (new Date()).getTime();
			var response_time = endTime - startTime;

			// create object to hold responses
            var gender_data = {};
            var gender = '';
            if(display_element.querySelector("#gender-female").checked){
                gender = "female";
            }else if(display_element.querySelector("#gender-male").checked){
                gender = "male";
            }else if(display_element.querySelector("#gender-other").checked){
                gender = display_element.querySelector("#gender-specified").value;
            }
            gender_data["Gender"] = gender;
            display_element.innerHTML = '';
            var trialdata = {
                "rt": response_time,
                "responses" : gender_data
            };
            jsPsych.finishTrial(trialdata);
		});
		var startTime = (new Date()).getTime();
	};
    return plugin;
})();