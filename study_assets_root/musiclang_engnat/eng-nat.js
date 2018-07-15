var blur_count = 0; //number of times subject's focus leaves tab
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"/study_assets/musiclang_engnat/shared_assets/img/langdev-logo.jpg\"</img><h1>MusicLang Experiment</h1>"; //to be prepended to preludes

var gen_inst = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2><p>This study will take 40-60 minutes and involves several different tasks. Many of the tasks will have an audio clip. To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly. When you have adjusted your headphones and are ready to begin, press Next to begin the study.</p><audio controls><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

// var autoplay_inst = {
//     type: 'instructions',
//     pages: [
//         header + '<h2>Audio Check</h2><p>If you can currently hear an audio clip, scroll to the bottom of the page and press Next. If you cannot currently hear an audio clip, your web browser may be blocking auto-playing audio. Please see the instructions below to enable auto-playing audio and do not press Next until you can hear the audio clip.</p> <h3>Google Chrome, Mozille Firefox, or Microsoft Edge</h3><p>Right click the current tab (LangDev MusicLang at the top of your browser) and press "Unmute Site". You should now hear audio and continue.</p><h3>Safari</h3><p>On the current tab (LangDev MusicLang at the top of your browser), there will be a sound icon to its right. Press the sound icon to unmute. You should now hear audio and continue.</p><audio preload="auto" autoplay loop><source src="sample.mp3" type="audio/mpeg"></audio>'
//     ],
//     show_clickable_nav: true,
//     button_label_next: 'Next',
//     allow_keys: false
// };

var inst_met_rhy_ma = {
    type: 'instructions',
    pages: [
        header + '<h2>Task: Rhythm</h2><p>This task will take about 10 minutes. When you are ready, press Next and the test will immediately start. You will not be able to pause the test, and the test will end immediately at the end of the audio clip.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_rhy_ma = {
    type: 'binary-audio',
    json_label: 'MET_RHY_MA',
    preamble: header + '<h2>Task: Rhythm</h2>',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Example ',
    example_num_type: 'alphabetic',
    audio: '/study_assets/musiclang_engnat/shared_assets/audio/met-rhy-ma.mp3',
    test_length: 15 //611:length+15:grace
};

var inst_met_mel_ma = {
    type: 'instructions',
    pages: [
        header + '<h2>Task: Melody</h2><p>This task will take about 10 minutes. When you are ready, press Next and the test will immediately start. You will not be able to pause the test, and the test will end immediately at the end of the audio clip.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var met_mel_ma = {
    type: 'binary-audio',
    json_label: 'MET_MEL_MA',
    preamble: header + '<h2>Task: Melody</h2>',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Example ',
    example_num_type: 'alphabetic',
    audio: '/study_assets/musiclang_engnat/shared_assets/audio/met-mel-ma.mp3',
    test_length: 15 //617:length+15:grace 
};

var inst_rpcv_ma = {
    type: 'instructions',
    pages: [
        header + '<h2>Task: Mispronunciation</h2> <p>This task will take about 2 minutes. Listen to the recording and pay attention to the highlighted words. Some of the highlighted words will be mispronounced. Green denotes correct pronunciation. If a highlighted word is mispronounced, press it to mark it incorrect, denoted by red. When you are ready for the test, press Next.'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};

var rpcv_ma = {
    type: 'passage-highlight',
    json_label: 'RPCV_MA',
    preamble: header + '<h2>Task: Mispronunciation</h2>',
    audio: '/study_assets/musiclang_engnat/shared_assets/audio/rpcv-ma.mp3',
    allow_audio_control: false,
    test_length: 15, //617:length+15:grace
    default_correct: true,
    word_tag_char: '#',
    text: '<p>jiào 教 shì 室 wài 外 de 的 tiān 天 kōng 空 wū 乌 yún 云 mì 密 #bù 布#， jiào 教 shì 室 lǐ 里 #qì 气# fēn 氛 chén 沉 #mèn 闷#， kě 可 yǐ 以 tīng 听 dào 到 yuǎn 远 chù 处 #há 蛤# má 蟆 de 的 jiào 叫 shēng 声。 jí 吉 mǐ 米 zhèng 正 zài 在 shàng 上 #shù 数# xué 学 kè 课。 tā 他 jì 记 dé 得 lǎo 老 shī 师 #jiǎng 讲# guò 过 zhè 这 dào 道 tí 题， dàn 但 tā 他 hái 还 shì 是 dá 答 #cuò 错# le 了。 jí 吉 mǐ 米 jué 觉 de 得 zì 自 jǐ 己 #què 确# shí 实 xū 需 yào 要 hǎo 好 hǎo 好 yòng 用 gōng 功 le 了。 shì 事 shí 实 shàng 上， tā 他 méi 没 yǒu 有 #duì 对# zì 自 jǐ 己 de 的 wèi 未 lái 来 yǒu 有 guò 过 #shēn 深# rù 入 de 的 sī 思 kǎo 考。 </p><p>#zhī 之# hòu 后 shì 是 hàn 汉 yǔ 语 kè 课。 tā 他 kāi 开 shǐ 始 kǎo 考 lǜ 虑 jīn 今 tiān 天 de 的 wǔ 午 fàn 饭 yào 要 #chī 吃# shén 什 me 么。 tā 他 de 的 lǎo 老 shī 师 zài 在 hēi 黑 bǎn 板 shàng 上 #xiě 写# zì 字， “ ‘ dàn 蛋’ zì 字 de 的 xià 下 bàn 半 bù 部 fen 分 shì 是 zhī 只‘ #chóng 虫#’ 。 ” tā 她 xiàng 向 dà 大 jiā 家 shuō 说。 jí 吉 mǐ 米 hū 忽 #rán 然# xiǎng 想 dào 到 hǎo 好 #jiǔ 久# méi 没 cháng 尝 dàn 蛋 chǎo 炒 fàn 饭 le 了。 tā 他 #jué 决# dìng 定 huí 回 jiā 家 hòu 后 zuò 做。 </p><p>#zhōng 终# yú 于 fàng 放 xué 学 le 了， jí 吉 mǐ 米 qí 骑 #chē 车# huí 回 jiā 家。 #lù 路# shàng 上 kāi 开 shǐ 始 xià 下 qǐ 起 #yǔ 雨# lái 来。 tā 他 qí 骑 de 得 #fēi 飞# kuài 快， yì 一 huì 会 er 儿 jiù 就 dào 到 jiā 家 le 了。 jí 吉 mǐ 米 dǎ 打 kāi 开 jiā 家 mén 门， jìn 进 wū 屋 #xǐ 洗# le 了 gè 个 zǎo 澡。 tā 他 dǎ 打 kāi 开 bīng 冰 #xiāng 箱#， kàn 看 dào 到 lǐ 里 miàn 面 yǒu 有 jǐ 几 #zhǒng 种# shū 蔬 cài 菜。 tā 他 qǔ 取 chū 出 yì 一 xiē 些 ná 拿 dào 到 àn 案 #bǎn 板# shàng 上， zhǔn 准 bèi 备 hé 和 mǐ 米 fàn 饭 yì 一 qǐ 起 chǎo 炒。 </p><p>tā 他 hái 还 zài 在 děng 等 mǐ 米 fàn 饭 #zhǔ 煮# shú 熟。 jí 吉 mǐ 米 #zhǎo 找# chū 出 tā 他 de 的 hóng 红 #sè 色# bǐ 笔 jì 记 běn 本， lǐ 里 miàn 面 jì 记 le 了 tā 他 yào 要 zuò 做 de 的 shì 事。 tā 他 jì 计 huà 划 xià 下 #wǔ 午# qù 去 yí 一 tàng 趟 #yín 银# háng 行， rán 然 hòu 后 dǎ 打 #sǎo 扫# yí 一 xià 下 fáng 房 jiān 间。 </p><p> mǐ 米 fàn 饭 zǒng 总 #suàn 算# shú 熟 le 了， tā 他 hěn 很 kuài 快 chǎo 炒 hǎo 好 le 了 fàn 饭， bìng 并 gěi 给 zì 自 jǐ 己 dào 倒 le 了 yī 一 bēi 杯 #níng 柠# méng 檬 shuǐ 水。 jīn 今 tiān 天 wǎn 晚 shàng 上 tā 他 de 的 fù 父 mǔ 母 yào 要 #jiē 接# dài 待 yì 一 xiē 些 kè 客 rén 人， ràng 让 jí 吉 mǐ 米 yě 也 guò 过 qù 去。 jí 吉 mǐ 米 gǎn 感 dào 到 tóu 头 #téng 疼#， yīn 因 wèi 为 tā 他 de 的 fù 父 mǔ 母 duō 多 #cì 次# xiǎng 想 gěi 给 tā 他 jiè 介 shào 绍 #nǚ 女# péng 朋 yǒu 友。 tā 他 jué 觉 de 得 zì 自 jǐ 己 yí 一 gè 个 rén 人 yě 也 tǐng 挺 kuài 快 #lè 乐# de 的， yě 也 jīng 经 cháng 常 #tóng 同# péng 朋 yǒu 友 yì 一 qǐ 起 chū 出 qù 去。 tā 他 hěn 很 xiǎng 享 #shòu 受# mù 目 qián 前 de 的 shēng 生 huó 活， bù 不 xī 希 wàng 望 yǒu 有 suǒ 所 #gǎi 改# biàn 变。 </p>',
    text_language: 'mandarin'
};

var inst_rpst_ma = {
    type: 'instructions',
    pages: [
        header + '<h2>Task: Mispronunciation</h2> <p>This task will take about 2 minutes. Listen to the recording and pay attention to the highlighted words. Some of the highlighted words will be mispronounced. Green denotes correct pronunciation. If a highlighted word is mispronounced, press it to mark it incorrect, denoted by red. When you are ready for the test, press Next.'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
};


var rpst_ma = {
    type: 'passage-highlight',
    json_label: 'RPST_MA',
    preamble: header + '<h2>Task: Mispronunciation</h2>',
    audio: '/study_assets/musiclang_engnat/shared_assets/audio/rpst-ma.mp3',
    allow_audio_control: false,
    test_length: 15, //617:length+15:grace
    default_correct: true,
    word_tag_char: '#',
    text: '<p>yuē 约 hàn 翰 de 的 gē 哥 ge 哥 #qiāo 敲# mén 门 ：“ yuē 约 hàn 翰， rú 如 #guǒ 果# nǐ 你 jīn 今 tiān 天 xiǎng 想 ràng 让 wǒ 我 bāng 帮 nǐ 你 de 的 huà 话， nǐ 你 zuì 最 hǎo 好 #xǐng 醒# lái 来 ！” </p><p>yuē 约 hàn 翰 #tǎng 躺# zài 在 tā 他 de 的 chuáng 床 shàng 上 fān 翻 lái 来 #fù 覆# qù 去。 jīn 今 tiān 天， tā 他 yào 要 #bān 搬# qù 去 tā 他 gē 哥 ge 哥 de 的 xīn 新 gōng 公 #yù 寓#， bìng 并 qiě 且 bú 不 lùn 论 tā 他 shì 是 fǒu 否 xiǎng 想 #qǐ 起# chuáng 床， wèi 为 dé 得 dào 到 gē 哥 ge 哥 de 的 bāng 帮 #zhù 助# tā 他 yě 也 bì 必 xū 须 děi 得 qǐ 起。 yuē 约 hàn 翰 cóng 从 chuáng 床 shàng 上 xià 下 lái 来 bìng 并 qiě 且 #chuān 穿# shàng 上 yī 衣 fu 服。 </p><p>yī 一 xiǎo 小 shí 时 #hòu 后#， tā 他 men 们 dào 到 #dá 达# le 了 tā 他 de 的 xīn 新 jiā 家。 gōng 公 yù 寓 shí 十 fēn 分 #xiàng 像# tā 他 xiàn 现 zài 在 zhù 住 de 的 dì 地 fāng 方， dàn 但 yǒu 有 xiē 些 dì 地 fāng 方 bù 不 #tóng 同#。 qiáng 墙 shì 是 #bái 白# de 的， yuē 约 hàn 翰 kě 可 yǐ 以 zài 在 chuāng 窗 #wài 外# kàn 看 dào 到 yī 一 kē 棵 #shù 树#。 chú 厨 fáng 房 lǐ 里 hái 还 yǒu 有 xiē 些 #jiāng 姜# de 的 wèi 味 dào 道。 yuē 约 hàn 翰 yǒu 有 diǎn 点 hài 害 #pà 怕# bú 不 guò 过 réng 仍 rán 然 shí 十 fēn 分 jī 激 #dòng 动#。 </p><p>yuē 约 hàn 翰 #huán 环# gù 顾 sì 四 zhōu 周 zài 在 kǎo 考 lǜ 虑 cóng 从 hé 何 #chù 处# xià 下 shǒu 手。 chú 除 le 了 tā 他 nà 那 chéng 成 #duī 堆# de 的 xiāng 箱 zǐ 子 hé 和 #sǎn 散# luò 落 de 的 jiā 家 jù 具， wò 卧 shì 室 shì 是 #kōng 空# de 的。 tā 他 men 们 de 的 zhěng 整 lǐ 理 guò 过 #chéng 程# shí 十 fēn 分 huǎn 缓 #màn 慢#。 </p><p>“ hǎo 好。 ” tā 他 duì 对 tā 他 gē 哥 ge 哥 shuō 说， “ shì 事 #xiān 先#， wǒ 我 men 们 #xū 需# yào 要 yì 一 xiē 些 gōng 工 jù 具 lái 来 #ān 安# zhuāng 装 wǒ 我 men 们 de 的 jiā 家 jù 具， wǒ 我 yǒu 有 gōng 工 jù 具 #xiāng 箱# dàn 但 shì 是 yǒu 有 xiē 些 dōng 东 xī 西 diū 丢 #shī 失# le 了。 wǒ 我 méi 没 yǒu 有 #chuí 锤# zi 子 bìng 并 #qiě 且# wǒ 我 de 的 dīng 钉 zi 子 dōu 都 yòu 又 #duǎn 短# yòu 又 xiǎo 小。 ” “ nǐ 你 qù 去 #diàn 店# lǐ 里 #zhǎo 找# yī 一 xià 下 wǒ 我 yào 要 de 的 dōng 东 xi 西。 #mǎi 买# zhī 之 qián 前 xiān 先 kàn 看 kan 看 jià 价 #gé 格#。 wǒ 我 kě 可 bù 不 xiǎng 想 huā 花 tài 太 duō 多 #qián 钱#。 wǒ 我 #dāi 呆# zài 在 zhè 这 lǐ 里 #chāi 拆# xiāng 箱 zǐ 子。 ” </p>',
    text_language: 'mandarin'
};

var lk_ma = {
    type: 'multi-choice',
    preamble: header + '<h2>Task: Lexical Knowledge</h2><h3>Instructions</h3><p>For each Mandarin word provided, select the best definition.</p>',
    
    json_label: 'LK_MA',
    questions: [{
            prompt: "词典 cí diǎn",
            options: ["atlas", "encyclopedia", "dictionary", "phone book"]
        },
        {
            prompt: "请假 qǐng jià",
            options: ["to ask for a favour", "to beg", "to clean", "to request time off"]
        },
        {
            prompt: "新鲜 xīn xiān",
            options: ["sacred", "fresh", "unusual", "raw"]
        },
        {
            prompt: "满意 mǎn yì",
            options: ["hungry", "delighted", "frustrated", "satisfied"]
        },
        {
            prompt: "重要 zhòng yào",
            options: ["important", "medicinal", "wanted", "diverse"]
        },
        {
            prompt: "故意 gù yì",
            options: ["by coincidence", "with bad intentions", "on purpose", "in the process of"]
        },
        {
            prompt: "表示 biǎo shì",
            options: ["to indicate", "to perform", "to fill out a form", "to memorize"]
        },
        {
            prompt: "礼貌 lǐ mào",
            options: ["traditions", "helmet", "manners", "uniform"]
        },
        {
            prompt: "误会 wù huì",
            options: ["misunderstanding", "dinner party", "conference", "decision"]
        },
        {
            prompt: "降低 jiàng dī",
            options: ["to drizzle", "to melt", "to lower", "to obstruct"]
        },
        {
            prompt: "除非 chú fēi",
            options: ["therefore", "unless", "furthermore", "however"]
        },
        {
            prompt: "想象 xiǎng xiàng",
            options: ["to wonder", "to imagine", "to dream (of)", "to think alike"]
        },
        {
            prompt: "资料 zī liào",
            options: ["leisure time", "survey", "information", "office"]
        },
        {
            prompt: "尽量 jǐn liàng",
            options: ["rapidly", "exceeding expectations", "as much as possible", "more than enough"]
        },
        {
            prompt: "陆续 lù xù",
            options: ["successively", "easily", "seldom", "during"]
        },
        {
            prompt: "嫉妒 jí dù",
            options: ["to be jealous", "to argue", "to be frustrated", "to feel betrayed"]
        },
        {
            prompt: "期望 qī wàng",
            options: ["to be impatient", "to master", "to hope", "to be innocent"]
        },
        {
            prompt: "欺负 īq fu",
            options: ["to repaint", "to bully", "to be disowned", "to be playful"]
        },
        {
            prompt: "搭档 ād dàng",
            options: ["to be present", "to pretend", "to organize", "to cooperate"]
        },
        {
            prompt: "能力 néng lì",
            options: ["variability", "brightness", "capability", "amount"]
        }
    ]
};

var ppc_ma = {
    type: 'multi-choice',
    preamble: header + '<h2>TASK: Reading Comprehension</h2><h3>Instructions</h3><p>Read the passage, then carefully choose the best answer for each question. You are allowed to look back at the passage while answering these questions.</p>',
    json_label: 'PPC_MA',
    passage: '<p> yí 一 gè 个 nián 年 qīng 轻 de 的 nán 男 hái 孩 zài 在 hé 河 xī 西 de 的 dì 地 yù 域 zhōng 中 wán 玩 。zhè 这 shì 是 zài 在 qiú 求 le 了 hěn 很 duō 多 cì 次 zhī 之 hòu 后 ，tā 他 de 的 fù 父 mǔ 母 cái 才 zhōng 终 yú 于 ràng 让 tā 他 dú 独 zì 自 chū 出 qù 去 wán 玩 。 tā 他 men 们 shuō 说 tā 他 tài 太 xiǎo 小 le 了 ，bìng 并 qiě 且 tā 他 men 们 bù 不 xiǎng 想 ràng 让 tā 他 dú 独 zì 自 qù 去 wài 外 miàn 面 ， yīn 因 wèi 为 nà 那 tài 太 wēi 危 xiǎn 险 le 了 。dàn 但 shì 是 ，tā 他 men 们 cuò 错 le 了 。tā 他 yǐ 已 jīng 经 qī 七 suì 岁 le 了 ， bìng 并 qiě 且 yǒu 有 néng 能 lì 力 zhào 照 gù 顾 hǎo 好 zì 自 jǐ 己 。</p><p> tā 他 men 们 gěi 给 tā 他 yí 一 gè 个 shǒu 手 jī 机 bìng 并 qiě 且 gào 告 sù 诉 tā 他 bié 别 hé 和 mò 陌 shēng 生 rén 人 shuō 说 huà 话 。zhè 这 xiē 些 tā 他 běn 本 lái 来 jiù 就 zhī 知 dào 道 。zhēn 真 shí 实 qíng 情 kuàng 况 shì 是 fù 父 mǔ 母 yǐ 以 wéi 为 tā 他 zài 在 wài 外 miàn 面 hé 和 péng 朋 yǒu 友 wán 玩 de 的 shí 时 hòu 候 ，tā 他 dōu 都 shì 是 zì 自 jǐ 己 yí 一 gè 个 rén 人 zài 在 wán 玩 。 nán 男 hái 孩 zǒu 走 xiàng 向 tā 他 zài 在 gōng 公 yuán 园 lǐ 里 zuì 最 xǐ 喜 huān 欢 de 的 yī 一 kē 棵 shù 树 ，nà 那 lǐ 里 rén 人 hěn 很 shǎo 少 dàn 但 yǒu 有 shàng 上 qiān 千 de 的 chóng 虫 zi 子 。tā 他 ná 拿 chū 出 le 了 tā 他 de 的 fàng 放 dà 大 jìng 镜 。</p><p> bàn 半 gè 个 xiǎo 小 shí 时 guò 过 qù 去 le 了 ，tā 他 hái 还 zài 在 kuài 快 lè 乐 de 地 guān 观 chá 察 chóng 虫 zi 子 。tū 突 rán 然 jiān 间 ，tā 他 tīng 听 dào 到 yǒu 有 rén 人 hǎn 喊 jiào 叫 ，tā 他 zhuǎn 转 guò 过 tóu 头 qù 去 。yí 一 gè 个 zú 足 qiú 球 cháo 朝 tā 他 de 的 liǎn 脸 shàng 上 fēi 飞 lái 来 。tā 他 rěn 忍 shòu 受 zhe 着 liǎn 脸 shàng 上 de 的 téng 疼 tòng 痛 zǒu 走 huí 回 jiā 家 。</p>',
    passage_language: 'mandarin',
    questions: [{
            prompt: "How old is the boy in the story?",
            options: [
                "Under five", "Seven", "Ten", "Twelve"]
        },
        {
            prompt: "Why don't the boy’s parents want him to play outside alone?",
            options: ["Because they are concerned about the boy’s health", "Because they are worried it is dangerous outside", "Because of the boy’s mental problem", "Because they want the boy to stay at home and keep them company"]
        },
        {
            prompt: "What did the boy’s parents not know about him?",
            options: ["That he usually only plays in the safe areas", "That he goes out and plays alone sometimes", "That he plays outside only a short amount of time", "That he plays with his friends"]
        },
        {
            prompt: "Which of the following statements is correct?",
            options: ["The boy has a favorite tree in the park and he usually plays football nearby.", "The boy got hurt when playing the football.", "The boy hates football because he’s bad at it", "The shouting he heard was probably to warn him of the football."]
        },
        {
            prompt: "What did the boy’s parents tell him that he already knew?",
            options: ["How to use a cellphone", "To be careful with a cellphone", "How to talk to strangers", "Not to talk to strangers"]
        },
        {
            prompt: "What do the boy and his parents disagree on?",
            options: ["How well he can take care of himself", "How old he is", "How much he likes to play outside", "How good at soccer he is"]
        },
        {
            prompt: "At the start of the story where was the boy playing?",
            options: ["East of the river",
                "West of the river",
                "North of the river",
                "South of the river"
            ]
        },
        {
            prompt: "What does the boy think about his parents?",
            options: [
                "He thinks they are happy",
                "He thinks they are mean",
                "He thinks they are clingy",
                "He thinks they are wrong"
            ]
        },
        {
            prompt: "What does the boy like to do at his favourite tree?",
            options: [
                "He likes to look at butterflies",
                "He likes to look at bugs",
                "He likes to take a nap",
                "He likes to take pictures"
            ]
        },
        {
            prompt: "Why does the boy’s face hurt?",
            options: [
                "He walked into a tree",
                "He slipped and fell",
                "A soccer ball hit him",
                "A frisbee hit him"
            ]
        }
    ]
};

var counterBalance1 = {
    timeline: [gen_inst, inst_met_rhy_ma, met_rhy_ma, inst_met_mel_ma, met_mel_ma, inst_rpcv_ma, rpcv_ma, inst_rpst_ma, rpst_ma, lk_ma, ppc_ma],
    conditional_function: function(){
        var currID = window.location.href.split('=');
        if(currID[currID.length-1] % 2 == 1){
            // console.log("true");
            return true;
        }else{
            return false;
        }
    }
};

var counterBalance2 = {
    timeline: [gen_inst, inst_met_mel_ma, met_mel_ma, inst_met_rhy_ma, met_rhy_ma, inst_rpst_ma, rpst_ma, inst_rpcv_ma, rpcv_ma, lk_ma, ppc_ma], 
    conditional_function: function(){
        var currID = window.location.href.split('=');
        if(currID[currID.length-1] % 2 == 0){
            // console.log("true"); 
            return true;
        }else{
            return false;
        }
    }
};

jatos.onLoad(
    jsPsych.init({
        //Questionaire:
         timeline: [counterBalance1, counterBalance2],
        //test timeline:
        // timeline: [rpcv_ma, rpst_ma],
        
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
            var studyID = jatos.studyResultId;
            if(likely_invalid){
                studyID += ' - invalid result'
            }
            resultsJSON = '"' + studyID + '": ' + resultsJSON;
            jatos.submitResultData(resultsJSON, jatos.startNextComponent);
        }
    })
);