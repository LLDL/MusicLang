var blur_count = 0; //number of times subject's focus leaves tab
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>Towel Experiment</h1>"; //to be prepended to preludes

var familiarity_rating_page_1 = {
    type: 'multi-choice',
    preamble: header + '<h2>任务1: 量词熟悉度 评分</h2>',
    json_label: 'familiarity_rating-1',
    passage: '<p>请想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 经常听到或者使用以下的 常听到或者使用以下的 常听到或者使用以下的 汉语 量词。 请根据你 对以下量 词的熟悉程度 对其从 1-5进行评分：1代表 “我从 来没有听 过或使用 过这 个量 词”，2代表 “我很少听到或使用 我很少听到或使用 这个量 词”，3代表我有些 时候会听到或使用 这个量 词，4代表我 经常听到 常听到 或使用 这个量 词，5代表我每天都会听到或使用 代表我每天都会听到或使用 这个量 词</p>',
    passage_language: 'english',
    horizontal: true,
    questions: [
        {
            prompt: "一盏",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一个",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一堂",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一杯",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一堵",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一瓶",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一束",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一条",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一封",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一张",
            options: ["1", "2", "3", "4", "5"]
        },
    ]
};

var familiarity_rating_page_2 = {
    type: 'multi-choice',
    preamble: header + '<h2>任务1: 量词熟悉度 评分</h2>',
    json_label: 'familiarity_rating-2',
    passage: '<p>请想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 经常听到或者使用以下的 常听到或者使用以下的 常听到或者使用以下的 汉语 量词。 请根据你 对以下量 词的熟悉程度 对其从 1-5进行评分：1代表 “我从 来没有听 过或使用 过这 个量 词”，2代表 “我很少听到或使用 我很少听到或使用 这个量 词”，3代表我有些 时候会听到或使用 这个量 词，4代表我 经常听到 常听到 或使用 这个量 词，5代表我每天都会听到或使用 代表我每天都会听到或使用 这个量 词</p>',
    passage_language: 'english',
    horizontal: true,
    questions: [
        {
            prompt: "一幅",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一包",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一滴",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一双",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一朵",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一头",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一页",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一些",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一站",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一群",
            options: ["1", "2", "3", "4", "5"]
        },
    ],
};

var familiarity_rating_page_3 = {
    type: 'multi-choice',
    preamble: header + '<h2>任务1: 量词熟悉度 评分</h2>',
    json_label: 'familiarity_rating-3',
    passage: '<p>请想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 想一在日常生活中你有多 经常听到或者使用以下的 常听到或者使用以下的 常听到或者使用以下的 汉语 量词。 请根据你 对以下量 词的熟悉程度 对其从 1-5进行评分：1代表 “我从 来没有听 过或使用 过这 个量 词”，2代表 “我很少听到或使用 我很少听到或使用 这个量 词”，3代表我有些 时候会听到或使用 这个量 词，4代表我 经常听到 常听到 或使用 这个量 词，5代表我每天都会听到或使用 代表我每天都会听到或使用 这个量 词</p>',
    passage_language: 'english',
    horizontal: true,
    questions: [
        {
            prompt: "一盅",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一件",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一缕",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一粒",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一杆",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一把",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一匹",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一场",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一桶",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            prompt: "一口",
            options: ["1", "2", "3", "4", "5"]
        },
    ]
};

var noun_classifier_grammaticality = {
    type: 'list-of-answers',
    preamble: header + '<h2>任务2: 数量 结构合法 性测试</h2><p>请思考以下量 词后面通常可以接哪些名 后面通常可以接哪些名 词，例如量 词“扇”后可接 “门”,“窗”（“一扇 门”，“一扇窗 ”）。 请输 入你 脑海里面想到的第 一个名 词，第二个名 词，第三个名 词…. <b>直</b>到你不能再想出任何可 到你不能再想出任何可 到你不能再想出任何可 以接在 该量词后面的名 词为 止。所填名 词应 越短好 越短好 ，例如 ，一 座<b>“山”</b>。</p>',
    json_label: 'noun_classifier_grammaticality',
    button_label: 'Continue',
    max_response_count: 7,
    min_response_count: 1,
    prompt_label: '量词',
    answer_label: '名词',
    response_preambles: [
        "第一个出现在脑海中的名词",
        "第二个出现在脑海中的名词",
        "第三个出现在脑海中的名词",
        "第四个出现在脑海中的名词",
        "第五个出现在脑海中的名词",
        "第六个出现在脑海中的名词",
        "第七个出现在脑海中的名词",
    ],
    prompts: [
        "一盏",
        "一个",
        "一堂",
        "一杯",
        "一堵",
        "一瓶",
        "一束",
        "一条",
        "一封",
        "一张",
        "一幅",
        "一包",
        "一滴",
        "一双",
        "一朵",
        "一头",
        "一页",
        "一些",
        "一站",
        "一群",
        "一盅",
        "一件",
        "一缕",
        "一粒",
        "一杆",
        "一把",
        "一匹",
        "一场",
        "一桶",
        "一口",
    ]
};

// prompts: {
//     type: jsPsych.plugins.parameterType.STRING,
//     pretty_name: 'Prompts',
//     default: undefined,
//     array: true,
//     description: 'The prompts that will be associated with a group of responses.'
// },



// var counterBalance1 = {
//     timeline: [familiarity_rating_page_1, familiarity_rating_page_2, familiarity_rating_page_3],
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 0;
//     }
// };

// var counterBalance2 = {
//     timeline: [familiarity_rating_page_1, familiarity_rating_page_3, familiarity_rating_page_2], 
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 1;
//     }
// };

// var counterBalance3 = {
//     timeline: [familiarity_rating_page_2, familiarity_rating_page_1, familiarity_rating_page_3], 
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 2;
//     }
// };

// var counterBalance4 = {
//     timeline: [familiarity_rating_page_2, familiarity_rating_page_3, familiarity_rating_page_1],
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 3;
//     }
// };

// var counterBalance5 = {
//     timeline: [familiarity_rating_page_3, familiarity_rating_page_2, familiarity_rating_page_1], 
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 4;
//     }
// };

// var counterBalance6 = {
//     timeline: [familiarity_rating_page_3, familiarity_rating_page_1, familiarity_rating_page_2], 
//     conditional_function: function(){
//         var currID = window.location.href.split('=');
//         return currID[currID.length-1] % 6 == 5;
//     }
// };

jatos.onLoad(
    jsPsych.init({
        // timeline: [counterBalance1, counterBalance2, counterBalance3, counterBalance4, counterBalance5, counterBalance6],
        // timeline: [familiarity_rating_page_1, familiarity_rating_page_2, familiarity_rating_page_3, noun_classifier_grammaticality],
        timeline: [noun_classifier_grammaticality],
        exclusions: {
            min_width: 800,
            min_height: 600
        },
        //Checks how many times user left if it's more than 10, triggers invalid flag
        on_interaction_data_update: function (data) {
            if (data.event == "blur") {
                console.log(data);
                blur_count++;
                if (blur_count > 10) {
                    likely_invalid = true;
                }
            };
        },
        on_finish: function (data) {
            var studyID = jatos.studyResultId;
            if(likely_invalid){
                studyID += ' - invalid result'
            }
            jsPsych.data.addProperties({subject : studyID});
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed').ignore('trial_type').ignore('trial_index');
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
        }
    })
);