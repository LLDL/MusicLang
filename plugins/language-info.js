/*
 * language-info
 * A jspsych plugin which given a list of languages produces a
 * table to be filled in detailing the age learning a language 
 * began and how many years of learning have been completed.
 * Ankit Dassor
 */

jsPsych.plugins["language-info"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "language-info",
    description: '',
    parameters: {
      languages: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        pretty_name: 'Languages',
        description: 'The languages the subject specified in language_info, ordered from most to least dominant',
        default: undefined
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'HTML formatted string to display at the top of the page above all the languages.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    // Initialize form and add preamble if any
    var html = '';
    if(trial.preamble !== null){
      html += '<div id="jspsych-language-info-preamble" class="jspsych-language-info-preamble">'+trial.preamble+'</div>';
    }
    // Table headers and formatting
    html += '<table align="center" id="jspsych-language-info-table class="jspsych-language-info-table">';
    html += '<tr class="jspsych-language-info-header" id="jspsych-language-info-table-header">';
    html += '<td class="jspsych-language-info-header-col">Language</td>';
    html += '<td class="jspsych-language-info-header-col">Age Began</td>';
    html += '<td class="jspsych-language-info-header-col">Years Learned</td>';
    html += '</tr>';

    //Show all languages in table
    for (var i = 0; i < 4; i++){
      if(trial.languages[i] == undefined){
        break;
      }
      html += '<tr class="jspsych-language-info-lang-row" id="lang-row-'+ i +'">';
      html += '<td class="jspsych-language-info-lang">' + trial.languages[i] + '</td>';
      html += '<td class="jspsych-language-info-age">' + '<input class="jspsych-language-info-age-response" type="text" name="#jspsych-language-info-age-response" size="10"></input>' + '</td>';
      html += '<td class="jspsych-language-info-years">' + '<input class="jspsych-language-info-year-response" type="text" name="#jspsych-language-info-year-response" size="10"></input>' + '</td>';
      html += '</tr>'
    }
    html += '</table>';
    html += '<button id="jspsych-language-info-next" class="jspsych-language-info-next">'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    
    display_element.querySelector('#jspsych-language-info-next').addEventListener('click', function() {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var lang_data = {};
      var langs = display_element.querySelectorAll('.jspsych-language-info-lang');
      var ages =  display_element.querySelectorAll('.jspsych-language-info-age-response');
      var years = display_element.querySelectorAll('.jspsych-language-info-year-response');
      for(var i = 0; i < langs.length; i++){
        var id = langs[i].innerHTML;
        var age = ages[i].value;
        var year = years[i].value;
        var obje = {};
        obje[id] = [age, year];
        Object.assign(lang_data, obje);
      }
      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(lang_data)
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
