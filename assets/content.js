/* Content data: edit this file to change the exercises, captions and checklist.
   Every text is an {en, zh} pair. */
window.RP_CONTENT=(function(){
var FN={bg:{en:'Background',zh:'背景',k:'sky'},prob:{en:'Problem',zh:'问题',k:'violet'},gap:{en:'Gap',zh:'研究空白',k:'amber'},aim:{en:'Aim',zh:'目的',k:'coral'},value:{en:'Value',zh:'价值',k:'teal'},road:{en:'Roadmap',zh:'文章结构',k:'oat'}};
var SENT=[
 {en:'Low-altitude delivery drones are moving from pilot schemes to daily operations in several large cities.',zh:'在多个大城市，低空配送无人机正从试点走向日常运营。',a:'bg',why:{en:'Opens wide with a broad topic that everyone in the field already accepts.',zh:'从宽处开篇：领域内每个人都认可的大背景。'}},
 {en:'As volumes grow, take-off and landing points are where queues form first.',zh:'随着业务量增长，起降点最先出现排队。',a:'prob',why:{en:'Narrows to a specific problem and shows why it matters.',zh:'收窄到一个具体问题，并说明它为什么重要。'}},
 {en:'Existing forecasting work focuses on air corridors, and few studies look at landing points themselves.',zh:'现有预测研究多聚焦空中走廊，很少研究起降点本身。',a:'gap',why:{en:'Names what earlier work has not done.',zh:'指出前人没有做到的事。'}},
 {en:'Here we predict queue length at landing points from arrival records collected over twelve weeks.',zh:'本文基于十二周的到达记录预测起降点的排队长度。',a:'aim',why:{en:'States what this paper does.',zh:'说明本文做了什么。'}},
 {en:'Forecasts at this level would let operators stagger dispatch before a queue builds.',zh:'这一层面的预测可让运营方在排队形成前错峰派单。',a:'value',why:{en:'Says who benefits and how.',zh:'说明谁会受益、怎样受益。'}},
 {en:'Section 2 reviews related work and Section 3 describes the data.',zh:'第2节回顾相关研究，第3节介绍数据。',a:'road',why:{en:'Tells the reader how the paper is organised.',zh:'告诉读者全文如何组织。'}}];
var TENSES=[
 {v:'formed',hear:{en:'Reader hears: this is what the study found.',zh:'读者听到的是：这是本研究的发现。'},note:{en:'Past tense reports an event. The reader sees your result and judges the evidence.',zh:'过去时在报告一件发生过的事。读者看到的是你的结果，并据此评判证据。'}},
 {v:'form',hear:{en:'Reader hears: everyone already knows this.',zh:'读者听到的是：这是人人都知道的事。'},note:{en:'Present tense reads as an established fact. If it is your one new result, it overclaims.',zh:'现在时读起来像公认事实。如果它只是你的一个新结果，就说过头了。'}},
 {v:'may form',hear:{en:'Reader hears: this is a possibility.',zh:'读者听到的是：这只是一种可能。'},note:{en:'A modal verb signals a hypothesis. Right when the data point that way but do not settle it.',zh:'情态动词表示推测。数据倾向于此但不足以定论时，这样写才恰当。'}}];
var CHECK=[
 {en:'I know which genre I am writing and have a recent model of it.',zh:'我清楚自己在写哪种文体，并且手上有一篇近期范文。'},
 {en:'I have checked what a reader outside my sub-field can be assumed to know.',zh:'我想过子领域之外的读者大概知道什么。'},
 {en:'Every figure and table has a reason to sit where it sits.',zh:'每张图表放在那里都有理由。'},
 {en:'Each paragraph has a job I can name in a few words.',zh:'每一段的功能，我都能用几个词说出来。'},
 {en:'Each sentence fits its paragraph and follows from the one before.',zh:'每句话都契合所在段落，并且自然承接上一句。'},
 {en:'Where a reader might ask “so what?”, I have said what the data show.',zh:'读者可能问“所以呢”的地方，我已说明数据意味着什么。'},
 {en:'My verb tenses match the status of each claim.',zh:'我的动词时态与每个论断的地位相符。'},
 {en:'My title predicts the content, and subheadings summarise their sections.',zh:'标题能预示内容，小标题能概括各节。'}];

var CAP=[
 {n:{en:'Background',zh:'背景'},t:{en:'Drones go daily',zh:'无人机进入日常'}},
 {n:{en:'Problem',zh:'问题'},t:{en:'Queues form at the pads',zh:'起降点先排队'}},
 {n:{en:'Gap',zh:'研究空白'},t:{en:'Few study the pads',zh:'鲜有人研究起降点'}},
 {n:{en:'Aim',zh:'目的'},t:{en:'We forecast queue length',zh:'本文预测排队长度'}},
 {n:{en:'Value',zh:'价值'},t:{en:'Dispatch can be staggered',zh:'可以错峰派单'}},
 {n:{en:'Roadmap',zh:'文章结构'},t:{en:'Where each section goes',zh:'各节内容安排'}}];
var HG=[
 {k:'title',c:'coral',rows:[3],n:{en:'Title',zh:'标题'}},
 {k:'abstract',c:'teal',rows:[5],n:{en:'Abstract',zh:'摘要'}},
 {k:'intro',c:'sky',rows:[11,9,7],n:{en:'Introduction',zh:'引言'}},
 {k:'methods',c:'oat',rows:[5,4],n:{en:'Methods',zh:'方法'}},
 {k:'results',c:'green',rows:[3,2],n:{en:'Results',zh:'结果'}},
 {k:'disc',c:'violet',rows:[4,6,8],n:{en:'Discussion',zh:'讨论'}},
 {k:'concl',c:'amber',rows:[10],n:{en:'Conclusion',zh:'结论'}}];
var LOOP=[{k:'sky',n:{en:'1 MODEL',zh:'1 建模'}},{k:'violet',n:{en:'2 MINE',zh:'2 挖词'}},{k:'coral',n:{en:'3 MASTER',zh:'3 掌握'}},{k:'green',n:{en:'4 UPDATE',zh:'4 更新'}}];

return {FN:FN,SENT:SENT,TENSES:TENSES,CHECK:CHECK,CAP:CAP,HG:HG,LOOP:LOOP};
})();
