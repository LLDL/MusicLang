//var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"/study_assets/musiclang_mannat/shared_assets/img/langdev-logo.jpg\"</img><h1>MusicLang Experiment</h1>"; //to be prepended to preludes

var inst_met_rhy_en = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2> TODO: SWITCH TO MANDARIN. Please wear headphones for the duration of this experiment. When you are ready, press Next and the test will immediately start. You will not be able to pause the test, and the test will end immediately at the end of the audio clip. To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_rhy_en = {
    type: 'binary-audio',
    json_label: 'MET_RHY_EN',
    preamble: header + '<h2>音乐之耳测试: 节奏顺序比较</h2>',
    example_preamble: '例子',
    question_preamble: '测试',
    example_count: '2',
    question_count: '52',
    example_num_prefix: '例子 ',
    answer1: '是',
    answer2: '否',
    audio: '/study_assets/musiclang_mannat/shared_assets/audio/met-rhy-en.mp3',
    test_length: 20 //611:length+15:grace
};

var inst_met_mel_en = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2> TODO: SWITCH TO MANDARIN. Please wear headphones for the duration of this experiment.  When you are ready, press Next and the test will immediately start. You will not be able to pause the test, and the test will end immediately at the end of the audio clip. To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_mel_en = {
    type: 'binary-audio',
    json_label: 'MET_MEL_EN',
    preamble: header + '<h2>音乐之耳测试: 旋律顺序比较</h2>',
    example_preamble: '例子',
    question_preamble: '测试',
    example_count: '2',
    question_count: '52',
    example_num_prefix: '例子 ',
    answer1: '是',
    answer2: '否',
    audio: '/study_assets/musiclang_mannat/shared_assets/audio/met-mel-en.mp3',
    test_length: 20 //617:length+15:grace 
};

var rpcv_en = {
    type: 'passage-highlight',
    json_label: 'RPCV_EN',
    preamble: header + '<h2>RPCV</h2> 在听录音之前请先阅读一遍文章。然后听录音并注意带有阴影的单词。如听到错读请圈出来。',
    audio: '/study_assets/musiclang_mannat/shared_assets/audio/rpcv-en.mp3',
    allow_audio_control: false,
    test_length: 10, //617:length+15:grace
    default_correct: true,
    word_tag_char1: '#',
    word_tag_char2: '@',
    text: '<p>Mary is having a busy #@week#. She is worried about her son, Andrew, who is #@sick#, so it was hard for her to keep #@track# of her schedule. She almost forgot about the #@special# dinner tonight, even though she had #@written# it down in red #@pen# so she would remember. She doesn’t want to go to the dinner with Andrew at home, but she knows it is #@important# because it is her friend’s birthday. The #@babysitter# should arrive at their house #@soon#. </p><p>Mary feels Andrew’s cheek. He must have a fever, because it felt very warm. </p><p>“Come on, Andrew. The doctor said you have to take this #@pill# once a day,” she says to her son. </p><p>Before Andrew could #@argue#, Mary had put the medicine in his #@mouth#. Mary put a cool #@towel# on Andrew’s hot #@forehead# and runs her fingers through his #@silky# brown hair just as the #@doorbell# rings. </p><p>“Hi, Sophie, how are you?” says Mary as she #@opens# the door to the babysitter. </p><p>“I’m #@fine#, thanks, Mary. It’s been #@raining# so I got some #@mud# on my shoes though. How’s Andrew?” asks Sophie. </p><p>“He’s not #@feeling# well so I’m worried about him. He’s #@sleeping# right now,” says Mary. </p><p>“Don’t worry, Mary. Andrew is #@safe# with me,” says Sophie. Mary #@waves# goodbye to Sophie as she leaves the house. She #@throws# her #@leather# purse onto the front #@seat# of her #@car# and drives away. </p><p> Mary loves #@pizza# and when she arrives at the restaurant, she is #@excited# to see a large sign on the #@roof# that says “Daniella’s Pizzeria.” The restaurant is beautiful, and the #@first# thing Mary sees is a big #@painting# on the walls. Mary enjoys a wonderful #@meal# with her friends. The pizza was #@delicious#, but the best part was the #@spiced# apple pie. Mary could still #@taste# the #@cinnamon# and #@cloves# on her tongue as she #@drove# home to her son.</p>',
    text_language: 'english'
};

var rpst_en = {
    type: 'passage-highlight',
    json_label: 'RPST_EN',
    preamble: header + '<h2>RPST</h2>在听录音前请先阅读一遍文章。这篇文章需要翻页。然后听录音，并注意带有阴影 的单词。如听到错读，请圈出来。',
    audio: '/study_assets/musiclang_mannat/shared_assets/audio/rpst-en.mp3',
    allow_audio_control: false,
    test_length: 10, //617:length+15:grace
    default_correct: true,
    word_tag_char1: '#',
    word_tag_char2: '@',
    text: "<p>Amy was excited to finally visit her friend. They have both been very busy from the #@increase# in their work hours, and there was a scheduling #@conflict# the last time they tried to meet. John had needed more time to #@perfect# his presentation for work, and Amy had a #@deadline# to meet for her #@project# as well. John was her oldest friend but it seems they live #@separate# lives now. Amy could #@recall# when she first met him. She was 8 years old, and her parents did not #@permit# her to have candy at the class Christmas party. John, the new student in class, #@secretly# offered to share his candy, and #@together# they vowed to #@rebel# against their parents and be friends forever.</p><p>Amy turned the corner and arrived at her friend’s apartment #@complex#. As she neared the lobby doors, she heard a voice shout her name from above. She glanced up and there was John #@waving# at her, looking as #@excited# as she felt. Seconds later they were laughing and hugging in the building lobby, their time apart did not #@affect# the strength of their friendship.</p><p>They finally settled down on John's couch with cups of tea in hand.</p></p>“So tell me about your new job!” said Amy, unable to #@contain# her curiosity. To her, the fantastical world of #@fashion# was filled with glamour and intrigue. Aware of Amy’s #@romanticized# view, John rolled his eyes.</p><p>“I’m only the junior #@manager#, so not much usually goes on. Although,” he paused dramatically for Amy’s #@benefit#, “the #@senior# manager was sick last week and the team wanted me to #@present# the summer #@proposal# in her place!”“That’s amazing! How did it go?” prompted Amy.</p><p>“Well it was great until this guy named Frank showed up.” John frowned. “ He walked in five #@minutes# late, and from then on seemed to #@object# to every proposal I made.</p><p>“For the #@record#, he knew I worked with a team, but still talked as if I was the sole #@creator# of the whole #@presentation#, and responsible for all the ideas. As if I could #@produce# that much #@content# myself! What an #@insult#, the way he would #@address# me. Called me ‘Junior’. A co-worker on my team even came to my #@defense#, ” said John.</p><p>“Frank doesn’t know what he’s talking about, you’re great at your job,” said Amy, in an effort to #@console# her friend. “You’ve been promoted twice in less than two years!”“Frank’s been with the company for years though,” sighed John. “The board can’t just #@discount# what a senior #@member# has to say.”</p><p>“Maybe Frank’s just #@jealous# of you. Maybe he’s #@intimidated# by your great hair. Maybe,” Amy #@wiggled# her eyebrows, “Frank has a crush on you.”</p><p>The two friends laughed until they were #@gasping# for breath.</p>",
    text_language: 'english'
};

var lk_en = {
    type: 'multi-choice',
    preamble: header + '<h2>Lexical Knowledge</h2><h3>Instructions</h3>请圈出下列最符合英文的一个定义。',

    json_label: 'LK_EN',
    questions: [{
            prompt: "fundamental",
            options: ["负责的", "基础的", "金融的", "虚拟的"]
        },
        {
            prompt: "to deteriorate",
            options: ["放大", "恶化", "追加", "毁灭"]
        },
        {
            prompt: "to enhance",
            options: ["优化", "暴露", "争论", "扩大"]
        },
        {
            prompt: "chiefly",
            options: ["平静地", "主要地", "完全地", "简短地"]
        },
        {
            prompt: "principle",
            options: ["原则", "科目", "原始", "响应"]
        },
        {
            prompt: "discourteous",
            options: ["变更的", "无意义的", "卷曲的", "失礼的"]
        },
        {
            prompt: "essential",
            options: ["感性的", "流利的", "必要的", "精确的"]
        },
        {
            prompt: "proficiency",
            options: ["精通", "战术", "零件", "协会"]
        },
        {
            prompt: "deceptive",
            options: ["嘈杂的", "惊人的", "失望的", "虚假的"]
        },
        {
            prompt: "external",
            options: ["额外的", "外部的", "极端的", "广大的"]
        },
        {
            prompt: "overview",
            options: ["分析", "概要", "景色", "俯瞰"]
        },
        {
            prompt: "mediocre",
            options: ["深刻的", "医药的", "平庸的", "有望的"]
        },
        {
            prompt: "implicit",
            options: ["重大的", "明显的", "含蓄的", "不礼貌的"]
        },
        {
            prompt: "remarkable",
            options: ["标注", "卓越的", "愉快的", "记录"]
        },
        {
            prompt: "vigorous",
            options: ["强劲的", "响亮的", "可疑的", "累人的"]
        },
        {
            prompt: "site",
            options: ["视力", "地点", "生涯", "参考"]
        },
        {
            prompt: "mandatory",
            options: ["全面的", "不必要的", "独家的", "强制性的"]
        },
        {
            prompt: "adjacent",
            options: ["紧邻的", "遥远的", "下面的", "另外的"]
        },
        {
            prompt: "contemporary",
            options: ["短暂的", "现代的", "合拍的", "思考的"]
        },
        {
            prompt: "objective",
            options: ["目的", "反对", "方面", "典故"]
        }
    ]
};

var ppc_en = {
    type: 'multi-choice',
    preamble: header + '<h2>Productive Phonology Comprehension</h2><h3>Instructions</h3>每个问题只有一个正确答案请选择最恰当的选项。答题过程中你可以回过头去重新阅读那篇文章。',
    json_label: 'PPC_EN',
    passage: '<p>The car stopped and James opened his eyes. They were here! He had been asleep for the whole drive to the Great Lakes, where his family went every summer. He could hear his aunts, uncles, and cousins talking outside the car. James felt a thrill of excitement and shook himself awake.<p></p>He had acted like he didn’t care about the trip, but in truth it was his favourite thing of the year. James climbed out of his seat to look at the vast lake. It was even more beautiful than he thought it would be. The lake was calm and still like a mirror. He looked up and saw an eagle fly across the sky. It was going to be a good day.<p></p>James was in a great mood. Maybe he would play baseball with his cousins. He had brought his lucky bat with him. James was looking forward to showing off to his little cousin, Mikey. He also had a towel with him in case he wanted to go swimming. He could even just sit by the docks and work on his painting. When he finally unpacked all his clothes in his room, it was already lunch time.<p></p>The smell of ham cooking in the pan made him hungry. His mouth started to water, which made him realize his thirst. He went and got his cousins and took them to the kitchen to help serve lunch. The food was filling and soon they were full.</p>',
    passage_language: 'english',
    questions: [{
            prompt: "在前往五大湖的途中, James 在做什么",
            options: ["他很兴奋一路上和他的亲戚们聊天", "他很兴奋但只是听他的亲戚们聊天", "他睡着了", "他在看窗外风景"]
        },
        {
            prompt: "James 多久去一次五大湖",
            options: ["一个季节一次", "一年一次", "两年一次", "三年一次"]
        },
        {
            prompt: "James 对去五大湖抱以怎样的态度",
            options: ["他不喜欢去但还是表现得很高兴", "他不喜欢去表现得也很冷淡", "他很喜欢去但表现得很冷淡", "他很喜欢去 表现得也很高兴"]
        },
        {
            prompt: "James 下车后看到湖的想法如何",
            options: ["湖很漂亮但没有他原先想像的那样美", "湖很漂亮甚至超出他原先的想像", "湖不漂亮他想像的湖要美得多", "湖不漂亮平静得像一面镜子"]
        },
        {
            prompt: "James 想要向 Mikey 展示什么",
            options: ["他的幸运球棒", "他的棒球", "他的游泳技术", "他的棒球球技"]
        },
        {
            prompt: "当 James 将他的衣服从行李中全部取出后他感觉如何",
            options: ["他已经迫不及待要去玩了", "他想去坐在码头画画", "他感到又饿又渴", "他累得睡着了"]
        },
        {
            prompt: "James 吃午饭前做了什么",
            options: ["他去游泳了", "他和 Mikey 去打棒球了", "他在湖边画画了", "他收拾了他的衣服"]
        },
        {
            prompt: "以下的陈述哪一项是正确的",
            options: ["James 到达五大湖时车外亲戚们的吵闹声使他感到烦躁", "他在车上看到天空飞过一只鹰觉得今天会是一个好天气", "食物的香味使他感到饿了流口水又使他感到自己渴了", "他们吃饱了午饭以后帮忙收拾了餐具"]
        },
        {
            prompt: "以下的陈述哪一项不能从短文中直接得出",
            options: ["James 很喜欢去五大湖但他表现得很冷淡其实是因为他不喜欢和他的亲戚们一起去", "James 带了毛巾是为了游泳去的时候用", "旅途的劳累和收拾行李使得 James 感到又饿又渴", "James 去过五大湖不止一次"]
        },
        {
            prompt: "以下哪一项是 James 接下来最不可能去做的事情",
            options: ["坐在码头观察老鹰", "回房间打开行李取出衣服", "向 Mikey 介绍如何能打好棒球", "去湖里游泳"]
        }
    ]
};

var counterBalance1 = {
    timeline: [inst_met_rhy_en, met_rhy_en, inst_met_mel_en, met_mel_en, rpcv_en, rpst_en, lk_en, ppc_en], 
    conditional_function: function(){
        console.log("in counterbalance1");
        var currID = window.location.href.split('=');
        if(currID[currID.length-1] % 2 == 1){
            console.log("true");
            return true;
        }else{
            return false;
        }
    }
};

var counterBalance2 = {
    timeline: [inst_met_mel_en, met_mel_en, inst_met_rhy_en, met_rhy_en, rpst_en, rpcv_en, lk_en, ppc_en], 
    conditional_function: function(){
        console.log("in counterbalance2");
        var currID = window.location.href.split('=');
        if(currID[currID.length-1] % 2 == 0){
            console.log("true"); 
            return true;
        }else{
            return false;
        }
    }
};

jatos.onLoad(
    jsPsych.init({
        //Questionaire:
        //production timeline:
        // timeline: [counterBalance1, counterBalance2],
        //test timeline:
        timeline: [rpcv_en, rpst_en],
        show_progress_bar: true,
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
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id');
            var resultsJSON = results.json();
            resultsJSON = '"' + jatos.studyResultId + '": ' + resultsJSON;
            jatos.submitResultData(resultsJSON, jatos.startNextComponent);
        }
    })
);