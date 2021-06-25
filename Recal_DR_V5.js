<!DOCTYPE html>
<html>
    <head>
        <title>LangDev Recal</title>
        <script src="jatos.js"></script>
        <script src="jspsych-6.1/jspsych.js"></script>
        <script src="jspsych-6.1/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.1/plugins/jspsych-audio-keyboard-response.js"></script>
        <script src="jspsych-6.1/plugins/jspsych-video-keyboard-response.js"></script>
        <script src="shared_assets/js/instructions.js"></script>
        <link href="shared_assets/stylesheet.css" rel="stylesheet" type="text/css"/>
        <link href="jspsych-6.1/css/jspsych.css" rel="stylesheet" type="text/css"/>
    </head>
    <body></body>
    <script>

    var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img>"; //to be prepended to preludes

    // create timeline //
    var timeline = [];

    // welcoming participants and general instructions //
    var generalinstructions = {
      type: 'instructions',
      pages: [
        header +
        '<p><div style="font-size:20px;text-align: center;"><h1>Language Learning & Development Lab: Recal</h1></p></div>' +
        '<p><div style="font-size:20px;text-align: center;">Welcome to the second part of the experiment.</div></p>' +
    '<p><div style="font-size:20px;test-align: center;">This is a video and audio listening task.</div></p>' +
    '<p><div style="font-size:20px;text-align: center;">Please put on your headphones now. Make sure your headphones are set to a comfortable volume by playing the following audio clip and adjusting accordingly.</div></p>' +
    '<div style="font-size:20px;text-align: center;"><audio preload="auto" controls><source src="audio/sample.mp3" type="audio/mpeg"></audio></div>' +
          '<p> The second part of the experiment will take 25-30 minutes. You will get one break halfway through. </p>' +
    '<p><div style="font-size:20px;text-align: center;">Click <i>next</i> to begin the experiment.</div></p>'],
    data: {test_part: 'instructions'},
      show_clickable_nav: true,
      allow_keys: false
    }
    timeline.push(generalinstructions);

    // practice instructions //
    var practiceinstructions = {
    type: 'instructions',
    pages: ["<h2> Instructions </h2>" +
    "<p> There are two phases for each trial, you will be presented with a series of videos immediately followed by a series of sound clips. </p>" +
    "<p> <h2>Series of video clips</h2></p>" +
    "<p> In this phase, you will be asked to watch a series of videos. </p>" +
    "<p> <h2>Series of sound clips</h2></p>" +
    "<p> In this phase, you will be asked to decide what sound you heard after each sound clip.</p>" +
    "<p> Press the left arrow key for <b>/ABA/</b> or right arrow key for <b>/ADA/</b>.</p>" +
    "<p> Answer as quickly and accurately as you can. </p>" +
    "<p> Please use your dominant hand (right if righthanded, left if lefthanded) to press the arrow keys and your non-dominant hand to press the spacebar or enter key. </p>" +
    "<p> <h2> Practice Trial </h2>" +
    "<p> A trial consists of both the series of video clips and series of sound clips phases. <p>" +
    "<p> You will be given two practice trials before starting the test. Click <i>next</i> to begin the practice trials.</p>"],
          show_clickable_nav: true,
          allow_keys: false
        }
    timeline.push(practiceinstructions);

    /* begin test trials screen */
    var begintest = {
        type: 'instructions',
        pages: ['The test trials will now begin. Click <i>next</i> to continue.'],
        data: {test_part: 'instructions'},
        show_clickable_nav: true,
        allow_keys: false
    }

/* PRACTICE PROCEDURE OUTLINES HOW INSTRUCTIONS AND VIDEOS ARE SUPPOSED TO STRUCTURED LIKE
      1) instructions to say either [ADA or ABA]
      2) series of video clips either [ADA or ABA]
      3) series of audio clips [respond ADA or ABA] */

/* MAIN PROCEDURE; OUTLINES HOW INSTRUCTIONS AND VIDEOS ARE SUPPOSED TO STRUCTURED LIKE
    1) instructions to say either [ADA or ABA]
    2) series of video clips either [ADA or ABA]
    3) series of audio clips [respond ADA or ABA] */


// instructions for silence + watch only //
var silence = {
        type: 'html-keyboard-response',
        data: {test_part: 'instructions', blocktype: 'ABA'},
        stimulus: '<p>Please watch the following videos.</p>' +
        '<p>Press the spacebar or enter key to begin.</p>',
        choices: ['spacebar', 'enter']
    }


// LIST OF PRACTICE TRIALS BY BLOCK TYPE "ABA"
// condition 4: block "ABA" //
var prac_adapt4ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',
            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },
    ],

    timeline_variables: [
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
    ]
}

// condition 5: block "ABA" //
var prac_adapt5ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',

            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },

    ],
    timeline_variables: [
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
    ]
}


// condition 6: block ABA //
var prac_adapt6ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',

            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },

    ],
    timeline_variables: [
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
      
      { sources: ['video/VbA1.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
    ]
}

// condition 4: block "ADA" //
var prac_adapt4ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',
        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
]
}

// condition 5: block "ADA" //
var prac_adapt5ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',
        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
]
}
// condition 6: block "ADA" //
var prac_adapt6ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',
        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
  
  { sources: ['video/VdA9.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
]
}

/* LIST OF recalGRUENT VIDEO TRIALS BY BLOCK TYPE "ABA" */
// condition 4: block "ABA" //
var prac_recal4ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',
            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },

    ],
    timeline_variables: [
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
      
      { sources: ['video/VbA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
    ]
}

// condition 5: block "ABA" //
var prac_recal5ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',
            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },

    ],
    timeline_variables: [
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
      
      { sources: ['video/VbA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
    ]
}


// condition 6: block ABA //
var prac_recal6ABA = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '',
            trial_duration: 1
        },
        {
            type: 'video-keyboard-response',
            sources: jsPsych.timelineVariable('sources'),
            data: jsPsych.timelineVariable('data'),
            choices: jsPsych.NO_KEYS,
            trial_ends_after_video: true
        },

    ],
    timeline_variables: [
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
      
      { sources: ['video/VbA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
    ]
}

// condition 4: block "ADA" //
var prac_recal4ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',
        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
  
  { sources: ['video/VdA4.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
]
}

// condition 5: block "ADA" //
var prac_recal5ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',

        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
  
  { sources: ['video/VdA5.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
]
}

// condition 6: block "ADA" //
var prac_recal6ADA = {
timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '',
        trial_duration: 1
    },
    {
        type: 'video-keyboard-response',
        sources: jsPsych.timelineVariable('sources'),
        data: jsPsych.timelineVariable('data'),
        choices: jsPsych.NO_KEYS,
        trial_ends_after_video: true
    },

],
timeline_variables: [
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
  
  { sources: ['video/VdA6.mp4'], data: {test_part: 'practice', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
]
}


// LIST OF CONGRUENT VIDEO TRIALS BY BLOCK TYPE "ABA" //
// condition 4: block "ABA" //
    var adapt4ABA = {
        timeline: [
            {
                type: 'html-keyboard-response',
                stimulus: '',
                trial_duration: 1
            },
            {
                type: 'video-keyboard-response',
                sources: jsPsych.timelineVariable('sources'),
                data: jsPsych.timelineVariable('data'),
                choices: jsPsych.NO_KEYS,
                trial_ends_after_video: true
            },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
        ]
    }

// condition 5: block "ABA" //
    var adapt5ABA = {
        timeline: [
          {
              type: 'html-keyboard-response',
              stimulus: '',
              trial_duration: 1
          },
          {
              type: 'video-keyboard-response',
              sources: jsPsych.timelineVariable('sources'),
              data: jsPsych.timelineVariable('data'),
              choices: jsPsych.NO_KEYS,
              trial_ends_after_video: true
          },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
        ]
    }


// condition 6: block ABA //
    var adapt6ABA = {
        timeline: [
          {
              type: 'html-keyboard-response',
              stimulus: '',
              trial_duration: 1
          },
          {
              type: 'video-keyboard-response',
              sources: jsPsych.timelineVariable('sources'),
              data: jsPsych.timelineVariable('data'),
              choices: jsPsych.NO_KEYS,
              trial_ends_after_video: true
          },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
          
          { sources: ['video/VbA1.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'adaptation', level: 'VbA1'}},
        ]
    }

// condition 4: block "ADA" //
var adapt4ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
    ]
}

// condition 5: block "ADA" //
var adapt5ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
    ]
}
// condition 6: block "ADA" //
var adapt6ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
      
      { sources: ['video/VdA9.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'adaptation', level: 'VdA9'}},
    ]
}

/* LIST OF recalGRUENT VIDEO TRIALS BY BLOCK TYPE "ABA" */
// condition 4: block "ABA" //
    var recal4ABA = {
        timeline: [
          {
              type: 'html-keyboard-response',
              stimulus: '',
              trial_duration: 1
          },
          {
              type: 'video-keyboard-response',
              sources: jsPsych.timelineVariable('sources'),
              data: jsPsych.timelineVariable('data'),
              choices: jsPsych.NO_KEYS,
              trial_ends_after_video: true
          },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
          
          { sources: ['video/VbA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA4'}},
        ]
    }

// condition 5: block "ABA" //
    var recal5ABA = {
        timeline: [
          {
              type: 'html-keyboard-response',
              stimulus: '',
              trial_duration: 1
          },
          {
              type: 'video-keyboard-response',
              sources: jsPsych.timelineVariable('sources'),
              data: jsPsych.timelineVariable('data'),
              choices: jsPsych.NO_KEYS,
              trial_ends_after_video: true
          },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
          
          { sources: ['video/VbA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA5'}},
        ]
    }


// condition 6: block ABA //
    var recal6ABA = {
        timeline: [
          {
              type: 'html-keyboard-response',
              stimulus: '',
              trial_duration: 1
          },
          {
              type: 'video-keyboard-response',
              sources: jsPsych.timelineVariable('sources'),
              data: jsPsych.timelineVariable('data'),
              choices: jsPsych.NO_KEYS,
              trial_ends_after_video: true
          },

        ],
        timeline_variables: [
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
          
          { sources: ['video/VbA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ABA', congruency: 'recalibration', level: 'VbA6'}},
        ]
    }

// condition 4: block "ADA" //
var recal4ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
      
      { sources: ['video/VdA4.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA4'}},
    ]
}

// condition 5: block "ADA" //
var recal5ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
      
      { sources: ['video/VdA5.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA5'}},
    ]
}

// condition 6: block "ADA" //
var recal6ADA = {
    timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '',
          trial_duration: 1
      },
      {
          type: 'video-keyboard-response',
          sources: jsPsych.timelineVariable('sources'),
          data: jsPsych.timelineVariable('data'),
          choices: jsPsych.NO_KEYS,
          trial_ends_after_video: true
      },

    ],
    timeline_variables: [
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
      
      { sources: ['video/VdA6.mp4'], data: {test_part: 'test', dresponse: 'DR', blocktype: 'ADA', congruency: 'recalibration', level: 'VdA6'}},
    ]
}


/* AUDIO TRIALS FOR EACH CONDITION */
// CONDITION 4 AUDIO
var audio_stimuli4 = [
  {stimulus: 'audio/bd04_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '4m'}},
  {stimulus: 'audio/bd04.wav', data: {test_part: 'test', dresponse: 'DR', level: '4'}},
  {stimulus: 'audio/bd04_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '4p'}},
  {stimulus: 'audio/bd04_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '4m'}},
  {stimulus: 'audio/bd04.wav', data: {test_part: 'test', dresponse: 'DR', level: '4'}},
  {stimulus: 'audio/bd04_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '4p'}},
];

var audioDR = {
      type: "audio-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true
    }

/* after audio finishes completely, participant can make a response & "level" data is logged to the response trial */
    var responseDR = {
          type: "html-keyboard-response",
          stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
          "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
          choices: ['leftarrow', 'rightarrow'],
          response_ends_trial: true,
          trial_duration: null,
          data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
          on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
            if (data.key_press == 37) {
              data.resp = 1;
            } else if (data.key_press == 39) {
              data.resp = 0;
            }
          }
        }

        var audioDR4 = {
              timeline: [audioDR, responseDR], // alternates the audio trial and response trial
              timeline_variables: audio_stimuli4, // takes stimuli from "audio_stimuli"
              randomize_order: true // randomize order of trials
            }

  // condition 4 practice audio //
            var prac_audio_stimuli4 = [
              {stimulus: 'audio/bd04_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4m'}},
              {stimulus: 'audio/bd04.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4'}},
              {stimulus: 'audio/bd04_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4p'}},
              {stimulus: 'audio/bd04_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4m'}},
              {stimulus: 'audio/bd04.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4'}},
              {stimulus: 'audio/bd04_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '4p'}},
            ];

            var prac_audioDR = {
                  type: "audio-keyboard-response",
                  stimulus: jsPsych.timelineVariable('stimulus'),
                  choices: jsPsych.NO_KEYS,
                  trial_ends_after_audio: true
                }

                var prac_responseDR = {
                      type: "html-keyboard-response",
                      stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
                      "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
                      choices: ['leftarrow', 'rightarrow'],
                      response_ends_trial: true,
                      trial_duration: null,
                      data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
                      on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
                        if (data.key_press == 37) {
                          data.resp = 1;
                        } else if (data.key_press == 39) {
                          data.resp = 0;
                        }
                      }
                    }

                    var prac_audioDR4 = {
                          timeline: [prac_audioDR, prac_responseDR], // alternates the audio trial and response trial
                          timeline_variables: prac_audio_stimuli4, // takes stimuli from "audio_stimuli"
                          randomize_order: true // randomize order of trials
                        }




// CONDITION 5 AUDIO //
var audio_stimuli5 = [
  {stimulus: 'audio/bd05_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '5m'}},
  {stimulus: 'audio/bd05.wav', data: {test_part: 'test', dresponse: 'DR', level: '5'}},
  {stimulus: 'audio/bd05_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '5p'}},
  {stimulus: 'audio/bd05_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '5m'}},
  {stimulus: 'audio/bd05.wav', data: {test_part: 'test', dresponse: 'DR', level: '5'}},
  {stimulus: 'audio/bd05_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '5p'}},
];

var audioDR = {
      type: "audio-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true
    }

    var responseDR = {
          type: "html-keyboard-response",
          stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
          "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
          choices: ['leftarrow', 'rightarrow'],
          response_ends_trial: true,
          trial_duration: null,
          data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
          on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
            if (data.key_press == 37) {
              data.resp = 1;
            } else if (data.key_press == 39) {
              data.resp = 0;
            }
          }
        }

        var audioDR5 = {
              timeline: [audioDR, responseDR], // alternates the audio trial and response trial
              timeline_variables: audio_stimuli5, // takes stimuli from "audio_stimuli"
              randomize_order: true // randomize order of trials
            }



// condition 5 practice audio //
var prac_audio_stimuli5 = [
  {stimulus: 'audio/bd05_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5m'}},
  {stimulus: 'audio/bd05.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5'}},
  {stimulus: 'audio/bd05_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5p'}},
  {stimulus: 'audio/bd05_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5m'}},
  {stimulus: 'audio/bd05.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5'}},
  {stimulus: 'audio/bd05_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '5p'}},
];

var prac_audioDR = {
      type: "audio-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true
    }

    var prac_responseDR = {
          type: "html-keyboard-response",
          stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
          "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
          choices: ['leftarrow', 'rightarrow'],
          response_ends_trial: true,
          trial_duration: null,
          data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
          on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
            if (data.key_press == 37) {
              data.resp = 1;
            } else if (data.key_press == 39) {
              data.resp = 0;
            }
          }
        }

        var prac_audioDR5 = {
              timeline: [prac_audioDR, prac_responseDR], // alternates the audio trial and response trial
              timeline_variables: prac_audio_stimuli5, // takes stimuli from "audio_stimuli"
              randomize_order: true // randomize order of trials
            }


// CONDITION 6 AUDIO //
var audio_stimuli6 = [
  {stimulus: 'audio/bd06_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '6m'}},
  {stimulus: 'audio/bd06.wav', data: {test_part: 'test', dresponse: 'DR', level: '6'}},
  {stimulus: 'audio/bd06_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '6p'}},
  {stimulus: 'audio/bd06_minus.wav', data: {test_part: 'test', dresponse: 'DR', level: '6m'}},
  {stimulus: 'audio/bd06.wav', data: {test_part: 'test', dresponse: 'DR', level: '6'}},
  {stimulus: 'audio/bd06_plus.wav', data: {test_part: 'test', dresponse: 'DR', level: '6p'}},
];

var audioDR = {
      type: "audio-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true
    }

    var responseDR = {
          type: "html-keyboard-response",
          stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
          "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
          choices: ['leftarrow', 'rightarrow'],
          response_ends_trial: true,
          trial_duration: null,
          data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
          on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
            if (data.key_press == 37) {
              data.resp = 1;
            } else if (data.key_press == 39) {
              data.resp = 0;
            }
          }
        }

        var audioDR6 = {
              timeline: [audioDR, responseDR], // alternates the audio trial and response trial
              timeline_variables: audio_stimuli6, // takes stimuli from "audio_stimuli"
              randomize_order: true // randomize order of trials
            }


// condition 6 practice audio //
            var prac_audio_stimuli6 = [
              {stimulus: 'audio/bd06_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6m'}},
              {stimulus: 'audio/bd06.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6'}},
              {stimulus: 'audio/bd06_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6p'}},
              {stimulus: 'audio/bd06_minus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6m'}},
              {stimulus: 'audio/bd06.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6'}},
              {stimulus: 'audio/bd06_plus.wav', data: {test_part: 'practice', dresponse: 'DR', level: '6p'}},
            ];

            var prac_audioDR = {
                  type: "audio-keyboard-response",
                  stimulus: jsPsych.timelineVariable('stimulus'),
                  choices: jsPsych.NO_KEYS,
                  trial_ends_after_audio: true
                }

                var prac_responseDR = {
                      type: "html-keyboard-response",
                      stimulus: "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:left';'><b>ABA</b></div>" +
                      "<div style='font-size:25px';'><div style='width: 500px;'><div style='float:right';'><b>ADA</b></div>",
                      choices: ['leftarrow', 'rightarrow'],
                      response_ends_trial: true,
                      trial_duration: null,
                      data: jsPsych.timelineVariable('data'), // this should add the 'level' data to the response trial (look at how stimuli is tagged "data")
                      on_finish: function(data){ //this should add 'resp' column, converting key_press output 37,39 to 0,1 respectively
                        if (data.key_press == 37) {
                          data.resp = 1;
                        } else if (data.key_press == 39) {
                          data.resp = 0;
                        }
                      }
                    }

            var prac_audioDR6 = {
                  timeline: [prac_audioDR, prac_responseDR], // alternates the audio trial and response trial
                  timeline_variables: prac_audio_stimuli6, // takes stimuli from "audio_stimuli"
                  randomize_order: true // randomize order of trials
                }

  // instructions for breaks: rest //
  var rest = {
    type: 'instructions',
      pages: [
        '<h2>Break time!</h2><p> Feel free to do as you like, but please stay on this screen.</p><p> Click <i>next</i> to continue when you are ready.</p>',
    ],
    data: {test_part: 'instructions'},
      show_clickable_nav: true,
      button_label_next: 'Next',
      allow_keys: false
  };

  // instructions for breaks: halfway //
  var halfway = {
    type: "instructions",
    pages: [
    "<h2>Break time! You're halfway through!</h2><p> Feel free to do as you like, but please stay on this screen.</p> <p>Click <i>next</i> to continue when you are ready.</p>"
    ],
    data: {test_part: 'instructions'},
      show_clickable_nav: true,
      button_label_next: 'Next',
      allow_keys: false
  };

// create a jatos wrapper so you can run this study in jatos && access paramters from jatos //
jatos.onLoad(function() {
var condition = jatos.urlQueryParameters.condition;   // accesses condition number from the URL
var studyID = jatos.studyResultId;  // creates a study ID for debrief & RPS purposes
jsPsych.data.addProperties({subject : studyID});     // adds study ID to results data //
jsPsych.data.addProperties({condition : condition});   // adds condition to results data


// PRACTICE TRIAL //
// RANDOMIZER, CREATES RANDOM INTEGER FROM 0-100 TO DECIDE WHICH PLAYLIST TO PLAY //
// condition 4 //
// if condition 4, play these trials //
if(condition == 4){

randomint = Math.floor(Math.random()*200);

if(randomint > 175){
  timeline.push(
    // condition 4: practice playlist #1
    silence, prac_adapt4ABA, prac_audioDR4,
    silence, prac_recal4ADA, prac_audioDR4
  );
} else if(randomint > 150){
  timeline.push(
    // condition 4: practice playlist #2
    silence, prac_adapt4ADA, prac_audioDR4,
    silence, prac_recal4ADA, prac_audioDR4
  );
} else if(randomint > 125){
  timeline.push(
    // condition 4: practice playlist #3
    silence, prac_adapt4ADA, prac_audioDR4,
    silence, prac_recal4ABA, prac_audioDR4
  );
} else if(randomint > 100){
  timeline.push(
    // condition 4 playlist #4
    silence, prac_adapt4ABA, prac_audioDR4,
    silence, prac_recal4ABA, prac_audioDR4
);
} else if(randomint > 75){
  timeline.push(
    // condition 4 playlist #5
    silence, prac_recal4ABA, prac_audioDR4,
    silence, prac_adapt4ADA, prac_audioDR4,
);
} else if(randomint > 50){
  timeline.push(
    // condition 4 playlist #6
    silence, prac_recal4ABA, prac_audioDR4,
    silence, prac_adapt4ABA, prac_audioDR4,
);
} else if(randomint > 25){
  timeline.push(
    // condition 4 playlist #7
    silence, prac_recal4ADA, prac_audioDR4,
    silence, prac_adapt4ADA, prac_audioDR4,
);
} else if(randomint > 0){
  timeline.push(
    // condition 4 playlist #8
    silence, prac_recal4ADA, prac_audioDR4,
    silence, prac_adapt4ABA, prac_audioDR4
);
}
}

// condition 5 //
// if condition 5, play these trials //
if(condition == 5){
randomint = Math.floor(Math.random()*200);

if(randomint > 175){
  timeline.push(
    // condition 5: practice playlist #1
    silence, prac_adapt5ABA, prac_audioDR5,
    silence, prac_recal5ADA, prac_audioDR5
  );
} else if(randomint > 150){
  timeline.push(
    // condition 5: practice playlist #2
    silence, prac_adapt5ADA, prac_audioDR5,
    silence, prac_recal5ADA, prac_audioDR5
  );
} else if(randomint > 125){
  timeline.push(
    // condition 5: practice playlist #3
    silence, prac_adapt5ADA, prac_audioDR5,
    silence, prac_recal5ABA, prac_audioDR5
  );
} else if(randomint > 100){
  timeline.push(
    // condition 5 playlist #4
    silence, prac_adapt5ABA, prac_audioDR5,
    silence, prac_recal5ABA, prac_audioDR5
);
} else if(randomint > 75){
  timeline.push(
    // condition 5 playlist #5
    silence, prac_recal5ABA, prac_audioDR5,
    silence, prac_adapt5ADA, prac_audioDR5,
);
} else if(randomint > 50){
  timeline.push(
    // condition 5 playlist #6
    silence, prac_recal5ABA, prac_audioDR5,
    silence, prac_adapt5ABA, prac_audioDR5,
);
} else if(randomint > 25){
  timeline.push(
    // condition 5 playlist #7
    silence, prac_recal5ADA, prac_audioDR5,
    silence, prac_adapt5ADA, prac_audioDR5,
);
} else if(randomint > 0){
  timeline.push(
    // condition 5 playlist #8
    silence, prac_recal5ADA, prac_audioDR5,
    silence, prac_adapt5ABA, prac_audioDR5,
);
}
}

// condition 6 //
// if condition 6, play these trials //
if(condition == 6){
randomint = Math.floor(Math.random()*200);
if(randomint > 175){
  timeline.push(
    // condition 6: practice playlist #1
    silence, prac_adapt6ABA, prac_audioDR6,
    silence, prac_recal6ADA, prac_audioDR6
  );
} else if(randomint > 150){
  timeline.push(
    // condition 6: practice playlist #2
    silence, prac_adapt6ADA, prac_audioDR6,
    silence, prac_recal6ADA, prac_audioDR6
  );
} else if(randomint > 125){
  timeline.push(
    // condition 6: practice playlist #3
    silence, prac_adapt6ADA, prac_audioDR6,
    silence, prac_recal6ABA, prac_audioDR6
  );
} else if(randomint > 100){
  timeline.push(
    // condition 6 playlist #4
    silence, prac_adapt6ABA, prac_audioDR6,
    silence, prac_recal6ABA, prac_audioDR6
);
} else if(randomint > 75){
  timeline.push(
    // condition 6 playlist #5
    silence, prac_recal6ADA, prac_audioDR6,
    silence, prac_adapt6ADA, prac_audioDR6,
);
} else if(randomint > 50){
  timeline.push(
    // condition 6 playlist #6
    silence, prac_recal6ADA, prac_audioDR6,
    silence, prac_adapt6ABA, prac_audioDR6,
);
} else if(randomint > 25){
  timeline.push(
    // condition 6 playlist #7
    silence, prac_recal6ABA, prac_audioDR6,
    silence, prac_adapt6ADA, prac_audioDR6,
);
} else if(randomint > 0){
  timeline.push(
    // condition 6 playlist #8
    silence, prac_recal6ABA, prac_audioDR6,
    silence, prac_adapt6ABA, prac_audioDR6,
);
}
}

timeline.push(begintest);

// MAIN TRIALS //
// RANDOMIZER, CREATES RANDOM INTEGER FROM 0-100 TO DECIDE WHICH PLAYLIST TO PLAY //
// CONDITION 4 //
// if condition 4, play these trials //
if(condition == 4){
randomint = Math.floor(Math.random()*120);

if(randomint > 115){
  timeline.push(
    // PLAYLIST # 1
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    halfway,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 110){
    timeline.push(
      // PLAYLIST # 2
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ABA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      silence, adapt4ADA, audioDR4,
      halfway,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ABA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4,
      silence, recal4ADA, audioDR4
    );
  } else if(randomint > 105){
      timeline.push(
        // PLAYLIST # 3
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, adapt4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        silence, recal4ABA, audioDR4,
        halfway,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, adapt4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4,
        silence, recal4ADA, audioDR4
      );
    } else if(randomint > 100){
        timeline.push(
          // PLAYLIST # 4
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, adapt4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          silence, recal4ABA, audioDR4,
          halfway,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, recal4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4,
          silence, adapt4ADA, audioDR4
        );
} else if(randomint > 95){
  timeline.push(
    // PLAYLIST # 5
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4
  );
} else if(randomint > 90){
  timeline.push(
    // PLAYLIST # 6
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 85){
  timeline.push(
    // PLAYLIST # 7
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 80){
  timeline.push(
    // PLAYLIST # 8
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4
  );
} else if(randomint > 75){
  timeline.push(
    // PLAYLIST # 9
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 70){
  timeline.push(
    // PLAYLIST # 10
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
  );
} else if(randomint > 65){
  timeline.push(
    // PLAYLIST # 11
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4
  );
} else if(randomint > 60){
  timeline.push(
    // PLAYLIST # 12
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    halfway,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4
  );

} else if(randomint > 55){
  timeline.push(
    // PLAYLIST # 13
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4
  );
} else if(randomint > 50){
  timeline.push(
    // PLAYLIST # 14
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    halfway,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
  );
} else if(randomint > 45){
  timeline.push(
    // PLAYLIST # 15
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
  );
} else if(randomint > 40){
  timeline.push(
    // PLAYLIST # 16
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4
  );
} else if(randomint > 35){
  timeline.push(
    // PLAYLIST # 17
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    halfway,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
  );
} else if(randomint > 30){
  timeline.push(
    // PLAYLIST # 18
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4
  );
} else if(randomint > 25){
  timeline.push(
    // PLAYLIST # 19
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 20){
  timeline.push(
    // PLAYLIST # 20
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    halfway,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4
);
} else if(randomint > 15){
  timeline.push(
    // PLAYLIST # 21
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    halfway,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4
);
} else if(randomint > 10){
  timeline.push(
    // PLAYLIST # 22
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4
  );
} else if(randomint > 5){
  timeline.push(
    // PLAYLIST # 23
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    halfway,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4
  );
} else if(randomint > 0){
  timeline.push(
    // PLAYLIST # 24
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ADA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    silence, recal4ABA, audioDR4,
    halfway,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ABA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4,
    silence, adapt4ADA, audioDR4
);
}
}


// CONDITION 5 //
// if condition 5, play these trials //
if(condition == 5){
randomint = Math.floor(Math.random()*120);

if(randomint > 115){
  timeline.push(
    // PLAYLIST # 1
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    halfway,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 110){
    timeline.push(
      // PLAYLIST # 2
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ABA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      silence, adapt5ADA, audioDR5,
      halfway,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ABA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5,
      silence, recal5ADA, audioDR5
    );
  } else if(randomint > 105){
      timeline.push(
        // PLAYLIST # 3
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, adapt5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        silence, recal5ABA, audioDR5,
        halfway,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, adapt5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5,
        silence, recal5ADA, audioDR5
      );
    } else if(randomint > 100){
        timeline.push(
          // PLAYLIST # 4
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, adapt5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          silence, recal5ABA, audioDR5,
          halfway,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, recal5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5,
          silence, adapt5ADA, audioDR5
        );
} else if(randomint > 95){
  timeline.push(
    // PLAYLIST # 5
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5
  );
} else if(randomint > 90){
  timeline.push(
    // PLAYLIST # 6
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 85){
  timeline.push(
    // PLAYLIST # 7
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 80){
  timeline.push(
    // PLAYLIST # 8
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5
  );
} else if(randomint > 75){
  timeline.push(
    // PLAYLIST # 9
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 70){
  timeline.push(
    // PLAYLIST # 10
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
  );
} else if(randomint > 65){
  timeline.push(
    // PLAYLIST # 11
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5
  );
} else if(randomint > 60){
  timeline.push(
    // PLAYLIST # 12
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    halfway,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5
  );

} else if(randomint > 55){
  timeline.push(
    // PLAYLIST # 13
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5
  );
} else if(randomint > 50){
  timeline.push(
    // PLAYLIST # 14
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    halfway,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
  );
} else if(randomint > 45){
  timeline.push(
    // PLAYLIST # 15
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
  );
} else if(randomint > 40){
  timeline.push(
    // PLAYLIST # 16
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5
  );
} else if(randomint > 35){
  timeline.push(
    // PLAYLIST # 17
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    halfway,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
  );
} else if(randomint > 30){
  timeline.push(
    // PLAYLIST # 18
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5
  );
} else if(randomint > 25){
  timeline.push(
    // PLAYLIST # 19
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 20){
  timeline.push(
    // PLAYLIST # 20
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    halfway,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5
);
} else if(randomint > 15){
  timeline.push(
    // PLAYLIST # 21
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    halfway,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5
);
} else if(randomint > 10){
  timeline.push(
    // PLAYLIST # 22
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5
  );
} else if(randomint > 5){
  timeline.push(
    // PLAYLIST # 23
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    halfway,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5
  );
} else if(randomint > 0){
  timeline.push(
    // PLAYLIST # 24
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ADA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    silence, recal5ABA, audioDR5,
    halfway,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ABA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5,
    silence, adapt5ADA, audioDR5
);
}
}


// CONDITION 6 //
// if condition 6, play these trials //
if(condition == 6){
randomint = Math.floor(Math.random()*120);

if(randomint > 115){
  timeline.push(
    // PLAYLIST # 1
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    halfway,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 110){
    timeline.push(
      // PLAYLIST # 2
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ABA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      silence, adapt6ADA, audioDR6,
      halfway,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ABA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6,
      silence, recal6ADA, audioDR6
    );
  } else if(randomint > 105){
      timeline.push(
        // PLAYLIST # 3
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, adapt6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        silence, recal6ABA, audioDR6,
        halfway,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, adapt6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6,
        silence, recal6ADA, audioDR6
      );
    } else if(randomint > 100){
        timeline.push(
          // PLAYLIST # 4
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, adapt6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          silence, recal6ABA, audioDR6,
          halfway,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, recal6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6,
          silence, adapt6ADA, audioDR6
        );
} else if(randomint > 95){
  timeline.push(
    // PLAYLIST # 5
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6
  );
} else if(randomint > 90){
  timeline.push(
    // PLAYLIST # 6
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 85){
  timeline.push(
    // PLAYLIST # 7
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 80){
  timeline.push(
    // PLAYLIST # 8
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6
  );
} else if(randomint > 75){
  timeline.push(
    // PLAYLIST # 9
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 70){
  timeline.push(
    // PLAYLIST # 10
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
  );
} else if(randomint > 65){
  timeline.push(
    // PLAYLIST # 11
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6
  );
} else if(randomint > 60){
  timeline.push(
    // PLAYLIST # 12
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    halfway,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6
  );

} else if(randomint > 55){
  timeline.push(
    // PLAYLIST # 13
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6
  );
} else if(randomint > 50){
  timeline.push(
    // PLAYLIST # 14
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    halfway,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
  );
} else if(randomint > 45){
  timeline.push(
    // PLAYLIST # 15
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
  );
} else if(randomint > 40){
  timeline.push(
    // PLAYLIST # 16
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6
  );
} else if(randomint > 35){
  timeline.push(
    // PLAYLIST # 17
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    halfway,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
  );
} else if(randomint > 30){
  timeline.push(
    // PLAYLIST # 18
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6
  );
} else if(randomint > 25){
  timeline.push(
    // PLAYLIST # 19
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 20){
  timeline.push(
    // PLAYLIST # 20
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    halfway,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6
);
} else if(randomint > 15){
  timeline.push(
    // PLAYLIST # 21
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    halfway,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6
);
} else if(randomint > 10){
  timeline.push(
    // PLAYLIST # 22
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6
  );
} else if(randomint > 5){
  timeline.push(
    // PLAYLIST # 23
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    halfway,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6
  );
} else if(randomint > 0){
  timeline.push(
    // PLAYLIST # 24
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ADA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    silence, recal6ABA, audioDR6,
    halfway,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ABA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6,
    silence, adapt6ADA, audioDR6
);
}
}


var end = {
    type: 'instructions',
    pages: [ '<h2>Study Complete</h2>' +
    '<p>Thank you for participating!</p>' +
    '<p>This study aims to investigate audiovisual processing in combination with motor information.' +
     ' In particular, we are interested in how an ambiguous auditory stimulus can be recalibrated by a non-ambiguous visual stimulus in conjunction with motor processing.' +
     ' For example, if you were presented with an ambiguous sound between /ABA/ and /ADA/ paired with your own articulations or a face saying /ABA/, then you have perceived that sound as more like /ABA/, thus "recalibrating" your perception of that ambiguous sound.' +
     ' Later, during the auditory-only trials, you should have tended to experience a bias to hear the ambiguous sound as /ABA/. </p>'],
    show_clickable_nav: true,
    button_label_next: "Next",
    allow_keys: false
}
timeline.push(end);

//IN TERMINAL: open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

      /* start the experiment */
    jsPsych.init({
        timeline: timeline, // plays timeline "trial"
        use_webaudio: false, // allows audio to play in browser
        show_preload_progress_bar: false, // hide preload progress bar,
        preload_video: ["video/VbA0.mp4", "video/VbA1.mp4", "video/VbA4.mp4", "video/VbA5.mp4", "video/VbA6.mp4", "video/VdA0.mp4", "video/VdA4.mp4", "video/VdA5.mp4", "video/VdA6.mp4", "video/VdA9.mp4"],
        preload_audio: ["audio/bd01.wav", "audio/bd04.wav", "audio/bd04_minus.wav", "audio/bd04_plus.wav", "audio/bd05.wav", "audio/bd05_minus.wav", "audio/bd05_plus.wav", "audio/bd06.wav", "audio/bd06_plus.wav", "audio/bd06_minus.wav", "audio/bd09.wav"],
                    exclusions: {
                        min_width: 800,
                        min_height: 600
                    },
        on_finish: function (data) {
          var resultJson = jsPsych.data.get().ignore('internal_node_id').ignore('time_elapsed'); // retrieves all data
          jatos.submitResultData(resultJson.csv(), jatos.startNextComponent); // ignore these columns when generating results
        },
        default_iti: 10
      });
    });
    </script>
  </html>
