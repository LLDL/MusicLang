/*
 * language-info
 * a jspsych plugin for giving 2 additional pieces of information
 *  about each element in a list of user inputs
 * Ankit Dassor
 */

jsPsych.plugins["language-info"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "language-info",
    description: '',
    parameters: {
      languages: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Languages',
        description: 'The languages the subject specified in language_info, ordered from most to least dominant',
        default: undefined,
        nested: {
          language: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Language',
            default: 'test',
            description: 'Language that subject will give additional information about'
          },
          age: {
            type: jsPsych.plugins.parameterType.INT,
            default: 0,
            pretty_name: 'Age Learning Started'
          },
          years: {
            type: jsPsych.plugins.parameterType.INT,
            default: 0,
            pretty_name: 'Years of Learning'
          }
        }
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
      },
      language_count: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Number of Languages subject speaks',
        default: 1,
        description: 'The number of languages specified by the subject in the language_info'
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    var html = '';
    if(trial.preamble !== null){
      html += '<div id="jspsych-language-info-preamble" class="jspsych-language-info-preamble">'+trial.preamble+'</div>';
    }
    html += '<table align="center" id="jspsych-language-info-table class="jspsych-language-info-table">';
    html += '<tr class="jspsych-language-info-header" id="jspsych-language-info-table-header">';
    html += '<td class="jspsych-language-info-header-col">Language</td>';
    html += '<td class="jspsych-language-info-header-col">Age Began</td>';
    html += '<td class="jspsych-language-info-header-col">Years Learned</td>';
    html += '</tr>';
    for (var i = 0; i < trial.languages.length; i++){
      html += '<tr class="jspsych-language-info-lang-row">';
      html += '<td class="jspsych-language-info-lang">' + trial.languages[i].language + '</td>';
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
