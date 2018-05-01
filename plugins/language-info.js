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
        default: undefined,
        nested: {
          language: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Language',
            default: undefined,
            description: 'Language that subject will give additional information about'
          },
          age: {
            type: jsPsych.plugins.parameterType.INT,
            default: '',
            pretty_name: 'Age Learning Started'
          },
          years: {
            type: jsPsych.plugins.parameterType.INT,
            default: '',
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
      }
    }
  }

  plugin.trial = function(display_element, trial) {


    jsPsych.finishTrial();
  };

  return plugin;
})();
