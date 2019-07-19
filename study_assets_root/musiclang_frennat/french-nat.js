var blur_count = 0; //number of times subject's focus leaves tab
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"shared_assets/img/langdev-logo.jpg\"</img><h1>MusicLang Experiment</h1>"; //to be prepended to preludes

var gen_inst = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2><p>Cette expérience durera 40 à 60 minutes et contient différentes tâches. De nombreuses tâches incluent une partie auditive. Merci de porter un casque ou des écouteurs pour les faire. Vous pouvez vous reposer entre différentes tâches. Pour vous assurer que le casque reproduit un son au bon niveau, jouez le morceau suivant en ajustant le volume du casque.</p><audio preload="auto" controls><source src="shared_assets/audio/sample.mp3" type="audio/mpeg">M</audio><p> ' + 
		'Dès que le volume est ajusté et que vous est prêt, cliquez sur "Next" pour lancer la phase de test.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};


var inst_met_rhy_for_fren = {
    type: 'instructions',
    pages: [
        header + '<h2>Tâche:Comparaison de rythme</h2><p>Cette tâche durera environ 10 minutes. Lorsque vous êtes prêt, cliquez sur "Next" et le test commencera immédiatement. Vous ne pourrez pas mettre le test en pause et celui-ci se terminera immédiatement à la fin de l’extrait audio.</p>' 
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_rhy_for_fren = {
    type: 'binary-audio',
    json_label: 'MET_RHY_FOR_FREN',
    preamble: header + '<h2>Tâche:Comparaison de rythme</h2>',
    example_preamble: 'Exemples',
    question_preamble: 'Test',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Exemple ',
    answer1: 'Oui',
    answer2: 'Non',
    audio: 'shared_assets/audio/met-r-for-fren.mp3',
    // test_length: 15
    test_length: 608//603 + 5sec grace
};

var inst_met_mel_for_fren = {
    type: 'instructions',
    pages: [
        header + '<h2>Tâche：Comparaison de mélodies</h2><p>Cette tâche durera environ 10 minutes. Lorsque vous êtes prêt, cliquez sur "Next" et le test commencera immédiatement. Vous ne pourrez pas mettre le test en pause et celui-ci se terminera immédiatement à la fin de l’extrait audio.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_mel_for_fren = {
    type: 'binary-audio',
    json_label: 'MET_MEL_FOR_FREN',
    preamble: header + '<h2>Tâche：Comparaison de mélodies</h2>',
    example_preamble: 'Exemples',
    question_preamble: 'Test',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Exemple ',
    answer1: 'Oui',
    answer2: 'Non',
    audio: 'shared_assets/audio/met-m-for-fren.mp3',
    // test_length: 15
    test_length: 617 //612 + 5sec grace
};

var inst_rpcv_for_fren = {
    type: 'instructions',
    pages: [
        header + '<h2>Tâche：Jugez la mauvaise prononciation</h2><p>Cette tâche durera environ 2 minutes. Écoutez l\'enregistrement et faites attention aux mots surlignés. Certains mots surlignés seront mal prononcés. La couleur verte indique que la prononciation est correcte. Si un mot surligné est mal prononcé, cliquez là-dessus pour le marquer comme incorrect, indiqué par un changement de la couleur à rouge. Lorsque vous êtes prêt pour le test, cliquez sur “Next".</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var rpcv_for_fren = {
    type: 'passage-highlight',
    json_label: 'RPCV_FOR_FREN',
    preamble: header + '<h2>Tâche：Juger la mauvaise prononciation</h2>',
    audio: 'shared_assets/audio/rpcv-for-fren.mp3',
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

var inst_rpst_for_fren = {
    type: 'instructions',
    pages: [
        header + '<h2>Tâche：Jugez la mauvaise prononciation</h2><p>Cette tâche durera environ 2 minutes. Écoutez l\'enregistrement et faites attention aux mots surlignés. Certains mots surlignés seront mal prononcés. La couleur verte indique que la prononciation est correcte. Si un mot surligné est mal prononcé, cliquez là-dessus pour le marquer comme incorrect, indiqué par un changement de la couleur à rouge. Lorsque vous êtes prêt pour le test, cliquez sur “Next”.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};


var rpst_for_fren = {
    type: 'passage-highlight',
    json_label: 'RPST_FOR_FREN',
    preamble: header + '<h2>Tâche：Juger la mauvaise prononciation</h2>',
    audio: 'shared_assets/audio/rpst-for-fren.mp3',
    allow_audio_control: false,
    // test_length: 15, 
    test_length: 166 , //161 + 5sec grace
    default_correct: true,
    word_tag_char: '#',
    text: "<p>Amy was excited to finally visit her friend. They have both been very busy from the #increase# in their work hours, and there was a scheduling #conflict# the last time they tried to meet. John had needed more time to #perfect# his presentation for work, and Amy had a #deadline# to meet for her #project# as well. John was her oldest friend but it seems they live #separate# lives now. Amy could #recall# when she first met him. She was 8 years old, and her parents did not #permit# her to have candy at the class Christmas party. John, the new student in class, #secretly# offered to share his candy, and #together# they vowed to #rebel# against their parents and be friends forever.</p><p>Amy turned the corner and arrived at her friend’s apartment #complex#. As she neared the lobby doors, she heard a voice shout her name from above. She glanced up and there was John #waving# at her, looking as #excited# as she felt. Seconds later they were laughing and hugging in the building lobby, their time apart did not #affect# the strength of their friendship.</p><p>They finally settled down on John's couch with cups of tea in hand.</p></p>“So tell me about your new job!” said Amy, unable to #contain# her curiosity. To her, the fantastical world of #fashion# was filled with glamour and intrigue. Aware of Amy’s #romanticized# view, John rolled his eyes.</p><p>“I’m only the junior #manager#, so not much usually goes on. Although,” he paused dramatically for Amy’s #benefit#, “the #senior# manager was sick last week and the team wanted me to #present# the summer #proposal# in her place!”“That’s amazing! How did it go?” prompted Amy.</p><p>“Well it was great until this guy named Frank showed up.” John frowned. “ He walked in five #minutes# late, and from then on seemed to #object# to every proposal I made.</p><p>“For the #record#, he knew I worked with a team, but still talked as if I was the sole #creator# of the whole #presentation#, and responsible for all the ideas. As if I could #produce# that much #content# myself! What an #insult#, the way he would #address# me. Called me ‘Junior’. A co-worker on my team even came to my #defense#, ” said John.</p><p>“Frank doesn’t know what he’s talking about, you’re great at your job,” said Amy, in an effort to #console# her friend. “You’ve been promoted twice in less than two years!”</p><p>“Frank’s been with the company for years though,” sighed John. “The board can’t just #discount# what a senior #member# has to say.”</p><p>“Maybe Frank’s #jealous# of you. Maybe he’s #intimidated# by your great hair. Maybe,” Amy #wiggled# her eyebrows, “Frank has a crush on you.”</p><p>The two friends laughed until they were #gasping# for breath.</p>",
    text_language: 'english'
};

var lk_for_fren = {
    type: 'multi-choice',
    preamble: header + '<h2>Connaissance lexicale</h2><p>Pour chaque mot en anglais, sélectionnez la meilleure translation.</p>',

    json_label: 'LK_FOR_FREN',
    questions: [{
            prompt: "to tickle",
            options: ["chatouiller", "pincer", "jouer", "traîner"]
        },
        {
            prompt: "to forget",
            options: ["applaudir", "voler", "conduire", "oublier"]
        },
        {
            prompt: "to shudder",
            options: ["caher", "étonner", "frémir", "échapper"]
        },
        {
            prompt: "to shun",
            options: ["réjeter", "embaucher", "rire", "pleurer"]
        },
        {
            prompt: "attic",
            options: ["la cabine", "la tente", "l'hangar", "le grenier"]
        },
        {
            prompt: "to weave",
            options: ["styliser", "tisser", "peindre", "nouer"]
        },
        {
            prompt: "thunder",
            options: ["l'ensoleillement", "la pluie", "le tonnerre", "la neige"]
        },
        {
            prompt: "loneliness",
            options: ["la solitude", "l’anxiété", "le succès", "la popularité"]
        },
        {
            prompt: "to whimper",
            options: ["crier", "gémir", "chanter", "parler"]
        },
        {
            prompt: "conceited",
            options: ["jaloux", "excentrique", "vaniteux", "ambitieux"]
        },
        {
            prompt: "to enhance",
            options: ["améliorer", "exposer", "débater", "agrandir"]
        },
        {
            prompt: "chiefly",
            options: ["tranquillement", "principalement", "complètement", "brièvement"]
        },
        {
            prompt: "regardless",
            options: ["indépendamment", "mais", "tandis que", "tant que"]
        },
        {
            prompt: "selfish",
            options: ["extroverti", "vilain", "égoïste", "heureux"]
        },
        {
            prompt: "to sharpen",
            options: ["modeler", "penser", "boucler", "aiguiser"]
        },
        {
            prompt: "to stutter",
            options: ["bégayer", "sourir", "tousser", "éternuer"]
        },
        {
            prompt: "lie",
            options: ["le dommage", "le mensonge", "le fait", "le son"]
        },
        {
            prompt: "overwhelming",
            options: ["minuscule", "reconnaissant", "accablant", "difficile"]
        },
        {
            prompt: "to sting",
            options: ["étreindre", "cueillir", "mordre", "piquer"]
        },
        {
            prompt: "scorching",
            options: ["brûlant", "glacial", "moite", "sale"]
        }
    ]
};

var ppc_for_fren = {
    type: 'multi-choice',
    preamble: header + '<h2>Compréhension écrite</h2><h3>Instructions</h3><p>Lisez le passage, puis choisissez la meilleure réponse pour chaque question.</p>',
    json_label: 'PPC_FOR_FREN',
    passage: '<p>The car stopped and James opened his eyes. They were here! He had been asleep for the whole drive to the Great Lakes, where his family went every summer. He could hear his aunts, uncles, and cousins talking outside the car. James felt a thrill of excitement and shook himself awake.<p></p>He had acted like he didn’t care about the trip, but in truth it was his favourite thing of the year. James climbed out of his seat to look at the vast lake. It was even more beautiful than he thought it would be. The lake was calm and still like a mirror. He looked up and saw an eagle fly across the sky. It was going to be a good day.<p></p>James was in a great mood. Maybe he would play baseball with his cousins. He had brought his lucky bat with him. James was looking forward to showing off to his little cousin, Mikey. He also had a towel with him in case he wanted to go swimming. He could even just sit by the docks and work on his painting. When he finally unpacked all his clothes in his room, it was already lunch time.<p></p>The smell of ham cooking in the pan made him hungry. His mouth started to water, which made him realize his thirst. He went and got his cousins and took them to the kitchen to help serve lunch. The food was filling and soon they were full.</p>',
    passage_language: 'english',
    questions: [{
            prompt: "Que fait James sur son chemin vers les Grands Lacs?",
            options: ["Il est ravi de parler avec les membres de sa famille en chemin", "Il est très excité mais seulement écouter sa famille bavarder", "Il dort", "Il regarde par la fenêtre"]
        },
        {
            prompt: "À quelle fréquence James se rend-il aux Grands Lacs?",
            options: ["Une fois par saison", "Une fois par an", "Tous les deux ans", "Une fois en 3 ans"]
        },
        {
            prompt: "Quelle est l’attitude de James envers les Grands Lacs?",
            options: ["Il n'aime pas y aller mais il est quand même très heureux", "Il n'aime pas y aller et il ne s'en soucie pas vraiment", "Il aime y aller mais il se comporte comme si il ne le veut pas", "Il aime y aller et il est très content"]
        },
        {
            prompt: "Quelle est la première impression de James du lac, après être sorti de la voiture?",
            options: ["Le lac est beau, mais pas aussi beau qu'il l'avait imaginé", "Le lac est magnifique au-delà de son impression original", "Le lac n'est pas beau. Le lac qu'il a imaginé était beaucoup plus beau", "Le lac n'est pas beau et calme comme un miroir"]
        },
        {
            prompt: "Qu'est-ce que James veut montrer à Mikey?",
            options: ["Sa batte chanceuse", "Son base-ball", "Sa technique de natation", "Ses compétences en base-ball"]
        },
        {
            prompt: "Que ressent James quand il sort ses vêtements de son bagage?",
            options: ["Il a hâte de jouer", "Il veut s'asseoir sur le quai pour peindre", "Il a faim et soif", "Il est trop fatigué pour s'endormir"]
        },
        {
            prompt: "Qu'est-ce que James a fait avant le déjeuner?",
            options: ["Il est allé nager", "Mikey et James sont allés jouer au baseball", "Il a peint au lac", "Il a défait tous ses vêtements"]
        },
        {
            prompt: "Laquelle des affirmations suivantes est correcte?",
            options: ["James est arrivé aux Grands Lacs et après avoir entendu sa famille parler à l'extérieur de la voiture, il s’est senti ennuyé", "Il était dans la voiture quand il a vu un aigle survoler le ciel et il a pensé que ce serait une bonne journée", "L'odeur de nourriture lui donna faim et lui fut venir l’eau à la bouche, ce qui lui donna soif", "Ils ont aidé à nettoyer la vaisselle après avoir déjeuné"]
        },
        {
            prompt: "Laquelle des affirmations suivantes ne peut pas être déduite directement de l'article?",
            options: ["James aime aller dans les Grands Lacs, mais il se comporte comme si il s’en fichait parce qu’il n’aime pas y aller avec sa famille", "James a apporté une serviette de plage", "La fatigue du voyage et de faire ses bagages ont donné à James une sensation de faim et de soif", "James est allé plusieurs fois dans les Grands Lacs"]
        },
        {
            prompt: "Lequel des suivants est impossible pour James à faire ensuite?",
            options: ["S'assoir sur le quai pour observer l'aigle", "Retourner dans la chambre pour sortir tous ses vêtements de sa valise", "Montrer à Mikey comment jouer au baseball", "Aller au lac pour nager"]
        }
    ]
};


jatos.onLoad(function() {
    var counterBalance1 = {
        timeline: [gen_inst, inst_met_rhy_for_fren, met_rhy_for_fren, inst_met_mel_for_fren, met_mel_for_fren, inst_rpcv_for_fren, rpcv_for_fren,inst_rpst_for_fren, rpst_for_fren, lk_for_fren, ppc_for_fren],
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
        timeline: [gen_inst,inst_met_mel_for_fren, met_mel_for_fren, inst_met_rhy_for_fren, met_rhy_for_fren, inst_rpst_for_fren, rpst_for_fren,inst_rpst_for_fren, rpcv_for_fren, lk_for_fren, ppc_for_fren], 
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
