var blur_count = 0; //number of times subject's focus leaves tab
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>MusicLang Experiment</h1>"; //to be prepended to preludes

var gen_inst = {
    type: 'instructions',
    pages: [
        header + '<h2>Dieses Experiment dauert 40 bis 60 Minuten und besteht aus verschiedenen Aufgaben. Viele Aufgaben beinhalten einen Audioteil. Um diese Aufgaben bearbeiten zu können, tragen Sie bitte ein Headset. Sie können zwischen den verschiedenen Aufgaben eine Pause machen. Um sicherzustellen, dass die Kopfhörer die Töne mit einer angenehmen Lautstärke wiedergeben, spielen Sie den nächsten Ton ab und korrigieren Sie die Kopfhörerlautstärke wenn nötig.</p><audio preload="auto" controls><source src="shared_assets/audio/sample.mp3" type="audio/mpeg">M</audio><p> ' +
		'Nachdem Sie dies getan haben und bereit sind, klicken Sie auf "Next“, um den Test zu starten.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};


var inst_met_rhy_for_germ = {
    type: 'instructions',
    pages: [
        header + '<h2>Aufgabe: Vergleich rhythmischer Phrasen</h2><p>Diese Aufgabe dauert ungefähr 10 Minuten. Wenn Sie bereit sind, klicken Sie auf "Next" und der Test beginnt sofort. Sie können den Test nicht unterbrechen. Der Test ist beendet, wenn der Audioclip zu Ende ist.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_rhy_for_germ = {
    type: 'binary-audio',
    json_label: 'MET_RHY_FOR_GERM',
    preamble: header + '<h2>Aufgabe: Vergleich rhythmischer Phrasen</h2>',
    example_preamble: 'Beispiele',
    question_preamble: 'Test',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Beispiel ',
    answer1: 'Ja',
    answer2: 'Nein',
    audio: 'shared_assets/audio/met-r-for-germ.mp3',
    // test_length: 15
    test_length: 608//603 + 5sec grace
};

var inst_met_mel_for_germ = {
    type: 'instructions',
    pages: [
        header + '<h2>Aufgabe: Vergleich melodischer Phrasen</h2><p>Diese Aufgabe dauert ungefähr 10 Minuten. Wenn Sie bereit sind, klicken Sie auf "Next" und der Test beginnt sofort. Sie können den Test nicht unterbrechen. Der ist beendet, wenn der Audioclip zu Ende ist.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_mel_for_germ = {
    type: 'binary-audio',
    json_label: 'MET_MEL_FOR_GERM',
    preamble: header + '<h2>Aufgabe: Vergleich melodischer Phrasen</h2>',
    example_preamble: 'Beispiele',
    question_preamble: 'Test',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Beispiel ',
    answer1: 'Ja',
    answer2: 'Nein',
    audio: 'shared_assets/audio/met-m-for-germ.mp3',
    // test_length: 15
    test_length: 617 //612 + 5sec grace
};

var inst_rpcv_for_germ = {
    type: 'instructions',
    pages: [
        header + '<h2>Aufgabe: Identifizieren Sie die schlechte Aussprache</h2><p>Diese Aufgabe dauert ca. 2 Minuten. Hören Sie sich die Aufnahme an und achten Sie auf die hervorgehobenen Wörter. Einige der hervorgehobenen Wörter werden falsch ausgesprochen. Grün steht für die richtige Aussprache. Wenn ein hervorgehobenes Wort falsch ausgesprochen wird, drücken Sie darauf, um es als falsch zu markieren. Wenn Sie bereit sind, klicken Sie auf “Next“.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var rpcv_for_germ = {
    type: 'passage-highlight',
    json_label: 'RPCV_FOR_GERM',
    preamble: header + '<h2>Aufgabe: Identifizieren Sie die schlechte Aussprache</h2>',
    audio: 'shared_assets/audio/rpcv-for-germ.mp3',
    allow_audio_control: false,
    // test_length: 15,
    test_length: 142 , //137 + 5sec grace
    default_correct: true,
    word_tag_char: '#',
    text: '<p>Mary is having a busy #week#. She is worried about her #three# year old son, Andrew, who is #sick#, so it was hard for her to keep #track# of her schedule. ' +
	'She almost forgot about the dinner tonight, even though she had written it down in red #pen# so she would remember. She doesn’t want to go to the dinner, while Andrew is at home alone, ' +
	'but she knows it is important because it is her #friend’s# birthday. She put the gift #bag# for her friend by the door so she would remember to bring it when she #leaves#. ' +
	'The babysitter should arrive at their house #soon#. </p><p>Mary feels Andrew’s #cheek#. He must have a #fever#, because it #felt# very warm. </p><p>“Come on, Andrew. #Sit# on this chair. ' +
	'The doctor said you have to take this #pill# once a day,” she says to her son. Before Andrew could #refuse#, Mary had put the medicine in his #mouth#. ' +
	'Mary went to get a cloth from the #messy# drawer under the #sink#. She #wet# the cloth in cold water just before putting it on Andrew\'s hot forehead and ran her fingers through his brown hair just as the doorbell rings. ' +
	'</p><p>“Hi, Sophie, how are you?” says Mary as she opens the door to the babysitter. </p><p>“I’m good, thanks, Mary. It’s been #raining# so I got some water and #dirt# on my shoes though. How’s Andrew?” asks Sophie. ' +
	'</p><p>“He’s not #feeling# well so I’m worried about him. He’s #sleeping# right now in his #bed#,” says Mary. </p><p>“Don’t worry, Mary. Andrew will be taken care of. He just needs some #rest#. ' +
	'I will make him #soup# when he wakes up,” says Sophie. </p><p>Mary #throws# the car keys into her purse and then #waves# goodbye to Sophie as she leaves the house. She puts her #leather# purse into the trunk of her car. ' +
	'She drives away to get #gas# before going to dinner. </p><p>Mary loves #pizza# and when she arrives at the restaurant, she is excited to see a large #green# sign on the window that #says# “Daniella’s Pizzeria.” ' +
	'She has heard that it is the #fourth# best Italian restaurant in the city, and that the pizza is also #cheap#. The restaurant is beautiful, and the #first# thing Mary #sees# is a big photo of the city of Rome on the walls. ' +
	'Mary enjoys a wonderful #meal# eating good #food# and catching up with her friends. The pizza was delicious, but the #best# part was the spiced apple pie. ' +
	'Mary only had a #sliver# of the pie, but could still taste the cinnamon and #cloves# on her tongue as she drove home to her son.</p>',
    text_language: 'english'
};

var inst_rpst_for_germ = {
    type: 'instructions',
    pages: [
        header + '<h2>Aufgabe: Identifizieren Sie die schlechte Aussprache</h2><p>Diese Aufgabe dauert ca. 2 Minuten. Hören Sie sich die Aufnahme an und achten Sie auf die hervorgehobenen Wörter. Einige der hervorgehobenen Wörter werden falsch ausgesprochen. Grün steht für die richtige Aussprache. Wenn ein hervorgehobenes Wort falsch ausgesprochen wird, drücken Sie darauf, um es als falsch zu markieren. Wenn Sie bereit sind, klicken Sie auf “Next“.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};


var rpst_for_germ = {
    type: 'passage-highlight',
    json_label: 'RPST_FOR_GERM',
    preamble: header + '<h2>Aufgabe: Identifizieren Sie die schlechte Aussprache</h2>',
    audio: 'shared_assets/audio/rpst-for-germ.mp3',
    allow_audio_control: false,
    // test_length: 15,
    test_length: 166 , //161 + 5sec grace
    default_correct: true,
    word_tag_char: '#',
    text: "<p>Amy was excited to finally visit her friend. They have both been very busy from the #increase# in their work hours, and there was a scheduling #conflict# the last time they tried to meet. John had needed more time to #perfect# his presentation for work, and Amy had a #deadline# to meet for her #project# as well. John was her oldest friend but it seems they live #separate# lives now. Amy could #recall# when she first met him. She was 8 years old, and her parents did not #permit# her to have candy at the class Christmas party. John, the new student in class, #secretly# offered to share his candy, and #together# they vowed to #rebel# against their parents and be friends forever.</p><p>Amy turned the corner and arrived at her friend’s apartment #complex#. As she neared the lobby doors, she heard a voice shout her name from above. She glanced up and there was John #waving# at her, looking as #excited# as she felt. Seconds later they were laughing and hugging in the building lobby, their time apart did not #affect# the strength of their friendship.</p><p>They finally settled down on John's couch with cups of tea in hand.</p></p>“So tell me about your new job!” said Amy, unable to #contain# her curiosity. To her, the fantastical world of #fashion# was filled with glamour and intrigue. Aware of Amy’s #romanticized# view, John rolled his eyes.</p><p>“I’m only the junior #manager#, so not much usually goes on. Although,” he paused dramatically for Amy’s #benefit#, “the #senior# manager was sick last week and the team wanted me to #present# the summer #proposal# in her place!”“That’s amazing! How did it go?” prompted Amy.</p><p>“Well it was great until this guy named Frank showed up.” John frowned. “ He walked in five #minutes# late, and from then on seemed to #object# to every proposal I made.</p><p>“For the #record#, he knew I worked with a team, but still talked as if I was the sole #creator# of the whole #presentation#, and responsible for all the ideas. As if I could #produce# that much #content# myself! What an #insult#, the way he would #address# me. Called me ‘Junior’. A co-worker on my team even came to my #defense#, ” said John.</p><p>“Frank doesn’t know what he’s talking about, you’re great at your job,” said Amy, in an effort to #console# her friend. “You’ve been promoted twice in less than two years!”</p><p>“Frank’s been with the company for years though,” sighed John. “The board can’t just #discount# what a senior #member# has to say.”</p><p>“Maybe Frank’s #jealous# of you. Maybe he’s #intimidated# by your great hair. Maybe,” Amy #wiggled# her eyebrows, “Frank has a crush on you.”</p><p>The two friends laughed until they were #gasping# for breath.</p>",
    text_language: 'english'
};

var lk_for_germ = {
    type: 'multi-choice',
    preamble: header + '<h2>Aufgabe: Lexikalisches Wissen</h2><p>Wählen Sie für jedes englische Wort die beste Definition aus.</p>',

    json_label: 'LK_FOR_GERM',
    questions: [{
            prompt: "to dig",
            options: ["kitzeln", "zwicken", "spielen", "graben"]
        },
        {
            prompt: "to drive",
            options: ["klatschen", "fliegen", "fahren", "vergessen"]
        },
        {
            prompt: "to shudder",
            options: ["verstecken", "überraschen", "zittern", "entkommen"]
        },
        {
            prompt: "to shun",
            options: ["meiden", "mieten", "lachen", "weinen"]
        },
        {
            prompt: "attic",
            options: ["die Hütte", "das Zelt", "der Schuppen", "der Dachboden"]
        },
        {
            prompt: "to draw",
            options: ["stilisieren", "weben", "zeichnen", "knüpfen"]
        },
        {
            prompt: "thunder",
            options: ["der Sonnenschein", "der Regen", "der Donner", "der Blitz"]
        },
        {
            prompt: "loneliness",
            options: ["die Einsamkeit", "die Besorgnis", "der Erfolg", "die Beliebtheit"]
        },
        {
            prompt: "to whistle",
            options: ["brüllen", "pfeifen", "singen", "sprechen"]
        },
        {
            prompt: "conceited",
            options: ["eifersüchtig", "exzentrisch", "eingebildet", "ehrgeizig"]
        },
        {
            prompt: "to enhance",
            options: ["verbessern", "ausstellen", "diskutieren", "erweitern"]
        },
        {
            prompt: "chiefly",
            options: ["ruhig", "hauptsächlich", "vollständig", "kurz"]
        },
        {
            prompt: "regardless",
            options: ["trotzdem", "glücklicherweise", "während", "solange"]
        },
        {
            prompt: "selfish",
            options: ["extrovertiert", "häßlich", "egoistisch", "glücklich"]
        },
        {
            prompt: "to shape",
            options: ["formen", "denken", "zuschnallen", "schärfen"]
        },
        {
            prompt: "to cough",
            options: ["husten", "stottern", "lächeln", "niesen"]
        },
        {
            prompt: "delay",
            options: ["der Schaden", "die Verzögerung", "die Tatsache", "das Geräusch"]
        },
        {
            prompt: "fast",
            options: ["winzig", "dankbar", "schnell", "schwierig"]
        },
        {
            prompt: "to gather",
            options: ["umarmen", "sammeln", "beißen", "stechen"]
        },
        {
            prompt: "scorching",
            options: ["brennend", "eisig", "schwitzig", "schmutzig"]
        }
    ]
};

var ppc_for_germ = {
    type: 'multi-choice',
    preamble: header + '<h2>Aufgabe: Leseverstehen</h2><h3>Anweisungen</h3><p>Lesen Sie die Textpassage und wählen Sie dann die beste Antwort für jede Frage aus. Sie dürfen während der Beantwortung der Fragen die Textpassage erneut lesen.</p>',
    json_label: 'PPC_FOR_GERM',
    passage: '<p>The car stopped and James opened his eyes. They were here! He had been asleep for the whole drive to the Great Lakes, where his family went every summer. He could hear his aunts, uncles, and cousins talking outside the car. James felt a thrill of excitement and shook himself awake.<p></p>He had acted like he didn’t care about the trip, but in truth it was his favourite thing of the year. James climbed out of his seat to look at the vast lake. It was even more beautiful than he thought it would be. The lake was calm and still like a mirror. He looked up and saw an eagle fly across the sky. It was going to be a good day.<p></p>James was in a great mood. Maybe he would play baseball with his cousins. He had brought his lucky bat with him. James was looking forward to showing off to his little cousin, Mikey. He also had a towel with him in case he wanted to go swimming. He could even just sit by the docks and work on his painting. When he finally unpacked all his clothes in his room, it was already lunch time.<p></p>The smell of ham cooking in the pan made him hungry. His mouth started to water, which made him realize his thirst. He went and got his cousins and took them to the kitchen to help serve lunch. The food was filling and soon they were full.</p>',
    passage_language: 'english',
    questions: [{
            prompt: "Was macht James auf dem Weg zu den großen Seen?",
            options: ["Er ist sehr aufgeregt mit seinen Verwandten auf dem Weg zu plaudern", "Er ist sehr aufgeregt, hört aber nur zu, wie seine Verwandten plauder", "Er schläft", "Er schaut aus dem Fenster"]
        },
        {
            prompt: "Wie oft besucht James die großen Seen?",
            options: ["Einmal in der Saison", "Einmal im Jahr", "Alle zwei Jahre", "Einmal in drei Jahren"]
        },
        {
            prompt: "Wie steht Jamens zu den großen Seen?",
            options: ["Er mag es nicht dorthin zu fahren, aber er ist trotzdem sehr glücklich", "Er mag es nicht dorthin zu fahren und es interessiert ihn nicht wirklich", "Er mag es dorthin zu fahren, aber er tut so, als würde er es nicht wollen", "Er fährt gern dorthin und ist sehr glücklich"]
        },
        {
            prompt: "Was ist James erster Eindruck vom See, nachdem er aus dem Auto ausgestiegen ist?",
            options: ["Der See ist schön, aber nicht so schön, wie er sich ihn vorgestellt hat", "Der See ist wunderschön, jenseits seiner ursprünglichen Vorstellungskraft", "Der See ist nicht schön. Der See, den er sich vorgestellt hat, war viel schöner", "Der See ist nicht schön und glatt wie ein Spiegel"]
        },
        {
            prompt: "Was möchte James Mikey zeigen?",
            options: ["Seinen Glücksschläger", "Seinen Baseball", "Seine Schwimmtechnik", "Seine Fähigkeiten im Baseball"]
        },
        {
            prompt: "Wie fühlt sich James als er seine Kleidung aus seinem Gepäck holt?",
            options: ["Er kann es kaum erwarten zu spielen", "Er möchte am Steg sitzen und malen", "Er hat Hunger und Durst", "Er ist zu müde, um einzuschlafen"]
        },
        {
            prompt: "Was hat James vor dem Mittagessen gemacht?",
            options: ["Er ist schwimmen gegangen", "Mikey und James sind Baseball spielen gegangen", "Er hat am See gemalt", "Er hat seine Kleidung ausgepackt"]
        },
        {
            prompt: "Welche der folgenden Aussagen ist korrekt?",
            options: ["Als James an den Großen Seen ankam und hörte, wie seine Verwandten vor dem Auto redeten, war er verärgert", "Als er im Auto saß, sah er einen Adler am Himmel und dachte, dass es ein guter Tag werden würde", "Durch den Geruch des Essens fühlte er sich hungrig und sein Mund begann zu wässern, was ihn durstig machte", "Sie halfen nach dem Mittagessen das Geschirr abzuwaschen"]
        },
        {
            prompt: "Welche der folgenden Aussagen kann nicht direkt aus der Textpassage erschlossen werden?",
            options: ["James fährt gerne zu den Großen Seen, aber er tut so, als würde er sich nicht für die Reise interessieren, weil er nicht gern mit seinen Verwandten fährt", "James hat ein Handtuch zum Schwimmen mitgebracht", "Die Reise und das Packen des Gepäcks ließen James hungrig und durstig werden", "James war schon mehr als einmal an den Großen Seen"]
        },
        {
            prompt: "Welche der folgenden Dinge kann James unmöglich als nächstes tun?",
            options: ["Sich an den Steg setzen, um den Adler zu beobachten", "In sein Zimmer zurückkehren, um seine Kleidung auszupacken", "Mikey zeigen, wie man Baseball spielt", "Zum See laufen, um zu schwimmen"]
        }
    ]
};


jatos.onLoad(function() {
    var counterBalance1 = {
        timeline: [gen_inst, inst_met_rhy_for_germ, met_rhy_for_germ, inst_met_mel_for_germ, met_mel_for_germ, inst_rpcv_for_germ, rpcv_for_germ, inst_rpst_for_germ, rpst_for_germ, lk_for_germ, ppc_for_germ],
        conditional_function: function(){
            if(jatos.studyResultId % 2 == 1){
                // console.log("odd");
                return true;
            }else{
                return false;
            }
        }
    };

    var counterBalance2 = {
        timeline: [gen_inst,inst_met_mel_for_germ, met_mel_for_germ, inst_met_rhy_for_germ, met_rhy_for_germ, inst_rpst_for_germ, rpst_for_germ,inst_rpst_for_germ, rpcv_for_germ, lk_for_germ, ppc_for_germ],
        conditional_function: function(){
            if(jatos.studyResultId % 2 == 0){
                // console.log("odd");
                return true;
            }else{
                return false;
            }

        }
    };

    jsPsych.init({
        timeline: [counterBalance1, counterBalance2],
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
            var results = resultsRaw.ignore('internal_node_id').ignore('time_elapsed').ignore();
            var resultsCSV = results.csv();
            jatos.submitResultData(resultsCSV, jatos.startNextComponent);
        }
    })
});
