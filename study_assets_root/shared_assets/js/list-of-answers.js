/*
    * list-of-answers.js
    * A jspsych plugin for providing an array of prompts, one per page, and 
    * receiving up to n responses per prompt, with the first m being mandatory
    * 
    * - Ankit Dassor        
*/

var currQuestion;
var startTime = (new Date()).getTime();
var answers = [];


jsPsych.plugins['list-of-answers'] = (function (){
	var plugin = {};
	plugin.info = {
        name: 'list-of-answers',
        description: '',
        parameters: {
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
            json_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'JSON Label',
				default: 'list-of-answers'
            },
            prompt_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt Label',
				default: ''
            },
            answer_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Answer Label',
				default: ''
            },
            response_preambles: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Response Preambles',
                default: undefined,
                array: true,
                description: 'The preambles that will proceed the corresponding answer box.'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Preamble',
                default: null,
                description: 'HTML formatted string to display at the top of the each prompt.'
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
        function makePrompt(index, trial){
            var html = '<form class="list-of-answers-prompt" id="list-of-answers-prompt-' + index + '">';
            html += '<h3>' + trial.prompt_label + ': ' + trial.prompts[index] +' </h3>';
            qnum = index + 1;
            html += '<h3>' + qnum + '. ' + trial.answer_label + '</h3>';
            for(var currAnswer = 0; currAnswer<trial.max_response_count; currAnswer++){
                html += trial.response_preambles[currAnswer] + '<input type="text" class="list-of-answers-answer" id="list-of-answers-prompt-' + trial.prompts[index] + '-answer-' + currAnswer + '" name="list-of-answers-prompt-' + trial.prompts[index] + '-answer-' + currAnswer + '"';
                if(currAnswer<trial.min_response_count){
                    html += ' required';
                }
                html += '><br>';
            }
            html += '</form>';
            html += '<input type="button" class="list-of-answers-button" name="list-of-answers-button-' + index + '" id="list-of-answers-button-' + index + '" value="' + trial.button_label + '">';
            return html;
        }
        function appendAnswers(){
            promptAnswers = [];
            var answerQuery = display_element.getElementsByClassName("list-of-answers-answer");
            for (var answer of answerQuery){
                promptAnswers.push(answer.value);
            }
            answers.push(promptAnswers);

        }
        function checkAnswers(){
            var answerQuery = display_element.getElementsByClassName("list-of-answers-answer");
            console.log(answerQuery)
            validFlag = true;
            for (var index = 0; index<trial.min_response_count; index++){
                if(!answerQuery[index].value){
                    validFlag = false;
                    console.log(answerQuery[index].value);
                }
            }
            return validFlag;
        }
        function onContinue(){
            if(checkAnswers()){
                appendAnswers();
                if(currQuestion < trial.prompts.length-1){
                    currQuestion++;
                    display_element.getElementsByClassName('list-of-answers-button')[0].removeEventListener('click', onContinue, false);
                    display_element.innerHTML = outerHTML + promptHTMLs[currQuestion];
                    display_element.getElementsByClassName('list-of-answers-button')[0].addEventListener('click', onContinue, false);
                }else{
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    var trialdata = {
                        "trial_name": trial.json_label,
                        "rt": response_time
                    };
                    for(var i = 0; i<trial.prompts.length; i++){
                        trialdata[trial.prompts[i]] = answers[i]
                    }
                    trialdata["prompt_count"] = trial.prompts.length;
                    jsPsych.finishTrial(trialdata);
                }
            }else{
                plural_resp = trial.min_response_count > 1;
                if(plural_resp){
                    display_element.innerHTML+= '<p class="error"> Please input at least ' + trial.min_response_count  + ' valid answers' + '</p>';
                }else{
                    display_element.innerHTML+= '<p class="error"> Please input at least ' + trial.min_response_count  + ' valid answer' + '</p>';
                    display_element.getElementsByClassName('list-of-answers-button')[0].addEventListener('click', onContinue, false);
                }
                
            }
            
        }
        var outerHTML = '';
        if (trial.preamble !== null) {
            outerHTML += '<div class="list-of-answers-preamble">' + trial.preamble + '</div>';
        }
        var promptHTMLs = [];
        for(var currPrompt = 0; currPrompt < trial.prompts.length; currPrompt++){
            promptHTMLs[currPrompt] = makePrompt(currPrompt, trial)
        }
        currQuestion = 0;
        display_element.innerHTML = outerHTML + promptHTMLs[currQuestion];
        display_element.getElementsByClassName('list-of-answers-button')[0].addEventListener('click', onContinue, false);
    }
    return plugin;
})();