//アナログデータ
//var word = ['abandon', 'admire', 'attach', 'beast', 'bully', 'cancer', 'chore', 'compliment', 'comprehend', 'compromise', 'confidence', 'crowd', 'dedecate', 'desperate', 'discourage', 'distinguish', 'elaborate', 'endure', 'enhance', 'epidemic', 'era', 'establish', 'faith', 'fame', 'famine', 'gravity', 'harvest', 'heal', 'heritage', 'hesitate', 'impose', 'indispensable', 'ingredient', 'invent', 'invite', 'neglect', 'nutrition', 'outcome', 'parliament', 'pity', 'primitive', 'proverb', 'radical', 'refuse', 'reinforce', 'settle', 'shame', 'substitute', 'temptation', 'wheat', 'praise', 'burst', 'exclaim', 'compel', 'portray', 'drag', 'recall', 'be short of', 'be nothing short of', 'decision', 'meditation', 'crucial', 'reputation', 'shrink', 'ladder', 'resolve', 'triumph', 'grave', 'diet', 'fundamental', 'crop', 'prior', 'overall', 'fix-up', 'virtually', 'figure out', 'a great deal of', 'negotiate', 'handful', 'absorb', 'elaborate on', 'barely', 'outcome', 'civil', 'cast out', 'cast', 'shed', 'hang', 'brief', 'seldom', 'scarce'] ;
//var meaning= ['を諦める、を見捨てる', 'に敬服する、を称賛する、に感心する', 'を付ける、を添付する、に愛着を感じさせる', '動物、獣', 'いじめっ子、いじめる', 'がん', '雑用、退屈な仕事、日常の雑事', '賛辞、お世辞', 'をしっかりと理解する', '妥協、妥協する', '信頼、自信', '群衆、に群がる、群がる', 'を捧げる', '絶望的な、欲しくてたまらない、必死の', 'を落胆させる、を妨害する', 'を見分ける、を区別する、区別す る', '手の込んだ、詳しく述べる', 'に耐える', 'を高める、をよりよくする', '伝染性の、流行の、伝染病、流行', '時代', 'を設立する、を確立する、を立証する', '信頼、信仰', '名声', '飢饉、物質の不足', '重力', '収穫物、収穫時期、収穫する', 'いやす、いえる', '相続財産、文化遺産', 'ためらう', '課す、つけこむ', '不可欠な', '材料', '投資する', '招く、依頼する', '無視、怠慢、無視する、怠ける', '栄養物', '結果', '議会', '哀れみ、気の毒に思う', '原始の', 'ことわざ', '根本的な、急進的な', '拒む、ごみ', '強化する', '落ち着かせる、解決する、定住する', '恥ずかしさ、羞恥心', '代用する、代用品', '誘惑物', '小麦', ' 賞賛する、賞賛', '突発する、破裂する', '叫ぶ', 'することを強いる', '描く、描写する', 'のろのろと進む', '思い出す', 'が不足している', 'に他ならない', '決意', '瞑想、熟考', '必要不可欠の', '名声', '尻込 みする', '梯子', '決意する', '勝利', '重大な、墓穴', '食事', '基本的な', '作物', '前の', '全体の', '理解する', 'ほとんど、実質的には', '理解する', '多量の', '交渉する', '一つかみ程度の', '理解する、吸 収する', '詳しく述べる', 'かろうじて～する', '結果', '民間人の', '追い出す', '投げかける、役を割り当てる', '光を当てる、涙を流す、小屋', 'つるす', '短期間の、簡潔な', 'めったに～しない', '不足して'] ;

var word = [];
var meaning = [];

//問題csvファイルを読み込む
var getCSV = function(csvfilename){
    word = []; //reset
    meaning = []; //reset
    console.log(csvfilename)
    var data = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    data.open("get", csvfilename, false); // アクセスするファイルを指定

    // csvファイル読み込み失敗時のエラー対応
    try {
        data.send(null);
    } catch (err) {
        console.log(err);
    }

    var textdata = data.responseText; // 渡されるのは読み込んだCSVデータ
    var csvData = textdata.split(/\r\n|\n/); // 改行を区切り文字として行を要素とした配列を生成
    csvData.pop(); //改行を区切りとしているため、csvDataの末尾にからの要素が一つある。それを消す。

    var temporaryList = [];
    console.log(csvData);

    //csvDataでは '1,aabandon,を諦める、を見捨てる' が一つの配列要素になっている。
     //これを「,」で区切って、temporaryListに入れる。temporaryList = ['1', 'aabandon', 'を諦める、を見捨てる']となる。
     //これの要素１をwordに、要素２をmeaningに入れる。
    for(var i=0; i < csvData.length; ++i ){
        temporaryList = csvData[i].split(',')
        word.push( temporaryList[1] );
        meaning.push(temporaryList[2]);
    }
}
getCSV('sokudokueitanngo.csv'); 
console.log(`word=${word},meaning=${meaning}`);

var Word = word;
var Meaning = meaning;

var question;
var correctAnswer;

var remindQuestion = []; //間違えた問題を入れていくリスト
var remindCorrectAnswer = []; //間違えた問題の答えを入れていく

var WL;
var n = []; //出題する問題番号
var max ;



var numRangeMax = document.getElementById("num_range_max");  
var numRangeMin = document.getElementById("num_range_min");
numRangeMax.max = `${word.length}`;
numRangeMin.max = `${word.length}`;
numRangeMax.value = `${word.length}`;

//ランダムか順番かを選ぶときに選んでいない方の色を薄くする
var pattern = "alldata";
var QalignButtonAnimation = function(pattern){
    if (pattern == "alldata"){
        let randomButton = document.getElementById("random");
        let labelForRandombutton = document.getElementById("labelForRandombutton")
        let orderButton = document.getElementById("order");
        let labelForOrderbutton = document.getElementById("labelForOrderbutton")
    
        randomButton.addEventListener('click', function() {
            labelForRandombutton.style.opacity = "1";
            labelForOrderbutton.style.opacity = "0.2";
        });
        orderButton.addEventListener('click', function() {
            labelForRandombutton.style.opacity = "0.2";
            labelForOrderbutton.style.opacity = "1";
        });
    }
}
QalignButtonAnimation(pattern)

//問題のタイプを選ぶボタンを表示
var selectMenu = function(dataType){
    var selectMenuElement; 
    console.log(dataType);

    if (dataType == "alldata"){
        console.log("alldata1");
        selectMenuElement = `
            <!--ランダムか順番か-->
            <form name="Qalign">
                <input type="radio" class="radioButton" id="random" name="selectQalign" value="random" >
                <label for="random" id="labelForRandombutton">ランダムに問題を出す</label>
                <input type="radio" class="radioButton" id="order" name="selectQalign" value="order" checked>
                <label for="order" id="labelForOrderbutton">順番に問題を出す</label>
            </form>

            <!--問題の数を選ぶ-->
            <div class="Qnum">
                <label for="Qnum" class="label_mini">出題数</label>
                <input class="selectNum" id="max_num" type="number" max="100" min="0" placeholder="問題数を入力" value="10">
                <p>問</p>
            </div>

            <!--問題の範囲を選ぶ-->
            <div class="Qrange">
                <label for="Qrange" class="label_mini">出題範囲</label>
                <input class="selectNum" id="num_range_min" type="number" min="0" max="${word.length}" placeholder="はじめの問題番号を入力" value="1">
                <p>番 ～ </p>
                <input class="selectNum" id="num_range_max" type="number" min="0" max="${word.length}" placeholder="終わりの問題番号を入力" value="${word.length}">  
                <p>番</p>
            </div>
        `;
        Word = word;
        Meaning = meaning;
        document.getElementById("alldataButton").style.opacity = "1";
        document.getElementById("reminddataButton").style.opacity = "0.3";
        pattern = "alldata"

    }else if (dataType == "reminddata"){
        console.log("reminddata1")
        selectMenuElement = `
            <!--ランダムか順番か-->
            <form name="Qalign">
                <input type="radio" class="radioButton" id="order" name="selectQalign" value="order" checked>
                <label for="order" id="labelForOrderbutton">順番に問題を出す</label>
            </form>

            <!--問題の数を選ぶ-->
            <div class="Qnum">
                <label for="Qnum" class="label_mini">出題数</label>
                <input class="selectNum" id="max_num" type="number" max="${remindQuestion.length}" min="0" placeholder="問題数を入力" value="${remindQuestion.length}">
                <p>問</p>
            </div>
            <div class="resetgroup">
                <p>現在の誤答数：${remindQuestion.length} 問</p>
            <input type="button" id="resetButton" class="button databutton" value="間違えた問題をリセット" onclick="resetButton()">
        </div>
        `;
        Word = remindQuestion;
        Meaning = remindCorrectAnswer
        document.getElementById("alldataButton").style.opacity = "0.3";
        document.getElementById("reminddataButton").style.opacity = "1";
        pattern = "reminddata"
        
    }
   

    document.getElementById("selectMenu").innerHTML = selectMenuElement;
    QalignButtonAnimation(pattern)

}

//リセットボタン
var resetButton = function(){
    var confirmation = confirm("この操作は取り消せません。\n間違えた問題をリセットしますか？");
    //「OK」を選択したらtrue が返ってくる
    if (confirmation == true){
        remindQuestion.length = 0;
        remindCorrectAnswer.length = 0;
        console.log(remindQuestion,remindCorrectAnswer);
        selectMenu("reminddata"); //セレクトメニュー画面を更新
    }
}

//データのソースを変更する
var selectQsource = function(csvfilename){
    getCSV(csvfilename+'.csv');
    selectMenu('alldata'); //問題選択画面を更新
    //選択した色をリセット
    var sourceButton = document.getElementsByClassName("sourceButton");
    sourceButton[0].style.opacity = "0.3";
    sourceButton[1].style.opacity = "0.3";
    sourceButton[2].style.opacity = "0.3";
    //選択したものだけ色付ける
    document.getElementById(csvfilename).style.opacity = "1";
}


//問題を作る関数
var makeQuestions = function(){
    //正誤判定欄の中身を初期化
    document.getElementById("judge").innerHTML = "";


    WL = Word.length;


    //入力された問題の範囲を取得
    var rangeMax = parseInt(numRangeMax.value) ;
    var rangeMin = parseInt(numRangeMin.value) -1;


    //間違えた問題のとき、出題範囲の入力の影響を受けるのを防止
    if (Word == remindQuestion){
        rangeMax = WL;
        rangeMin = 0;
    }

    //入力された問題数を取得
    max = document.getElementById("max_num").value;
    console.log(`max=${max}`);


    
    //ランダムか順番かを取得
    var Qalign = document.forms.Qalign.selectQalign.value;

    //順番の時、NaN undefined　となるのを防止
    if (Qalign == "order"){
        //問題数がデータ数より多い場合、データ数まで問題数を減らす
        if (max > WL){
            max = WL
        }

        //問題数が出題範囲より多い場合〃
        if (max > rangeMax-rangeMin){
            max = rangeMax-rangeMin
        }
    }

    //ランダムか順番かで n の配列を作る
    n.length = 0    //配列の中身を初期化
    switch (Qalign){
        case "random" :
            console.log("random")
            //ランダムな数字の配列を作る
            for (let i = 0; i < max; i+=1) {
                n.push(Math.floor(Math.random()*(rangeMax+rangeMin)+rangeMin))
            }
            break
        
        case "order":
            console.log("order")
            //順番の数字の配列を作る
            n.length = 0 
            for (let i = rangeMin; i < rangeMax; i+=1) {
                n.push(i)
            }
            break
        
        default:
            break
    }
    
    console.log(Qtype,Qalign,n)

    //問題文要素をnum個分作ってQuestionにつなぎ合わせていく
    var Questions = ""
    for (let i = 0; i < max; i += 1){
        question = Word[n[i]]
        Questions += `<p class="questions" id = question${i+1}>問${i+1} : ${n[i]+1} . ${question}</p>`
        Questions += `<input class = "InputAnswers" id = "inputAnswer${i+1}" type="text" placeholder="解答を入力">`
        Questions += "</br>"
    }
    
    //HTMLのid=questionの中身に入れる
    document.getElementById("question").innerHTML = Questions;   

    
}


//正誤判定と答えを出す関数
var checkButton_pushed = function() {
    //答え
    var Judges = ""
    var maruNum = 0 ;
    

    for (let i = 0; i < max; i += 1){
        correctAnswer = Meaning[n[i]];
        var inputAnswer = document.getElementById(`inputAnswer${i+1}`);
        var style = "";

        //正誤判定
        if (inputAnswer.value == correctAnswer){
            judge = "&ensp;◎";
            maruNum += 1
            style = "style='color: rgb(0 168 196);font-size: 70px;'"

            //間違えた問題リストから今正解した問題を一つ消す
            remindQuestion.splice(n[i],1)
            remindCorrectAnswer.splice(n[i],1)
            console.log(remindQuestion,remindCorrectAnswer);
        
        } else if (correctAnswer.includes(inputAnswer.value) == true && inputAnswer.value != "") {
            judge = "△&ensp;" + correctAnswer;
            maruNum += 0.5 ;

            //間違えた問題リストから今正解した問題を一つ消す
            remindQuestion.splice(n[i],1)
            remindCorrectAnswer.splice(n[i],1)
            console.log(remindQuestion,remindCorrectAnswer);
        
        } else {
            judge = "✕&ensp;" + correctAnswer;
            style = "style='color:red;'"

            //間違えた問題リストに入れる
            remindQuestion.push(Word[n[i]]);
            remindCorrectAnswer.push(correctAnswer)
            console.log(remindQuestion,remindCorrectAnswer);
        }
        
        Judges += `<p class="judges" id="judge${i+1}"  ${style}>${judge}</p>`

    } 
    document.getElementById("judge").innerHTML = Judges;

    //点数
    document.getElementById("point").innerHTML = `${maruNum} /${max}.0 点`;

}

