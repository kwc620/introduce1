var calc = {
    sum: function(a,b){return a+b;}
    ,minus: function (a,b){return a-b;}
    ,multi: function (a,b){return a*b;}
    ,devide: function (a,b){return a/b;}
}

function Calculator(){
    /*1. 전역변수 생성*/
    this.currentInput=null;
    this.prevValue=null;
    this.prevInput=null;
    this.currentValue=null;
    this.resultValue="";
    this.resultValue0="";
    this.resultValue1="";
    this.currentFloat=null;
    this.resultCnt=0;
    this.currentCal="";
    this.currentInputResetTrigger="";
    this.funcBtnClicked="";

    /*2. DOM 생성을 하고, 각 버튼에 값을 할당해 주는 함수 호출*/
    this.init=function (){
        this.currentInput=document.querySelector("#inputValue1");
        this.prevInput=document.querySelector("#inputValue0");

        this.registEvent();
    }

    /*3. 각 버튼의 값들을 DOM화 하기. */
    this.registEvent=function (){
        var _this=this;

        /*3-1. 숫자 버튼 DOM화 하기.*/
        var valueBtnList=document.querySelectorAll("#btnCon button.btnNum");
        var i, len=valueBtnList.length
        for(i=0;i<len;i++) {
            valueBtnList[i].addEventListener("click", function (e) {
                var btn = e.currentTarget;
                var value = btn.getAttribute("value");
                _this.insertValue(value);
            })
        }
        /*3-2. 연산자 버튼 DOM화 하기.*/
        var calBtnList = document.querySelectorAll("#btnCon button.btnFormula");
        var i, len=calBtnList.length;
        for (i=0; i<len; i++){
            calBtnList[i].addEventListener("click",function (e){
                var btn = e.currentTarget;
                var value = btn.getAttribute("value");
                _this.calc(value);
            });
        }

        /*3-3. 기타 버튼 DOM화 하기.*/
        var backBtn=document.querySelector("#backBtn");
        backBtn.addEventListener("click", function (){
            _this.back();
        } );
        var resetBtn=document.querySelector("#resetBtn")
        resetBtn.addEventListener("click", function (){
            _this.reset();
        } )
        var resultBtn=document.querySelector("#resultBtn")
        resultBtn.addEventListener("click", function (){
            _this.result();
        } )

        window.addEventListener("keydown", function (e){
            _this.onKeydownHandler(e);
        })


    }

    this.onKeydownHandler=function (e){
        if(e.keyCode==13){
            e.preventDefault();
            this.result();
        }

    }

    /*3-1. 숫자 버튼이 눌렸을 시 함수*/
    this.insertValue=function (value){
        if(this.currentInputResetTrigger=="o"){
            this.currentInput.innerText="";
        }

        var cValue = this.currentInput.innerText;

        if(cValue=="0"&&value!=".") cValue="";
        if(value=="."){
            var i=0, len=cValue.length, hap=0;
            for(i;i<len;i++){
                if(cValue[i]==".") hap++;
            }
            if(hap<1) {
                cValue=cValue+value;
            }
            if(this.currentInputResetTrigger=="o"){
                cValue="0.";
            }
        } else if(value!="."){
            cValue=cValue+value;
        }

        cValue=cValue.substring(0,17);

        this.currentInput.innerText=cValue;
        this.currentValue=parseFloat(cValue);
        this.currentInputResetTrigger="x";
    }
    
    /*3-2. 연산자 버튼이 눌렸을 시 함수*/
    this.calc=function (value){
        if(this.currentInputResetTrigger=="o"){
            this.currentValue=this.currentInput.innerText;
            this.currentInputResetTrigger="x";
        }

        if(this.currentCal!="" && this.currentInput!=null && this.prevValue!=null) {
            this.result();
            this.prevInput.innerText=this.resultValue+" "+value;
        }

        if(this.currentValue==null){
            this.currentValue=parseFloat(this.currentInput.innerText);
        }

        if(this.currentCal==""){
            this.prevValue=this.currentValue;
            this.currentCal=value;
        }else{
            this.currentCal=value;
            this.prevValue=this.currentValue;
        }
        this.currentValue=0;
        this.currentInputResetTrigger="o";

        this.prevInput.innerText=this.prevValue+" "+this.currentCal;
        this.currentFloat=null;
    }
    
    /*3-3-1. back 버튼이 눌렸을 시 함수*/
    this.back=function (){
        var cValue=this.currentInput.innerText;
        if(cValue.length==1){
            cValue="0";
            this.currentInput.innerText=cValue;
        }else if(cValue!="0"){
            cValue=cValue.split("");
            cValue.pop();
            cValue=cValue.join("");
            this.currentInput.innerText=cValue;
            this.currentValue=parseInt(cValue);
        }
    }
    /*3-3-2. reset 버튼이 눌렸을 시 함수*/
    this.reset=function (){
        this.prevInput.innerHTML="&nbsp;";
        this.currentInput.innerText="0";
        this.currentValue=null;
        this.currentInput.innerText="0";
        this.currentFloat=null;
        this.prevValue=null;
        this.resultValue="";
        this.resultValue0="";
        this.resultValue1="";
        this.currentCal="";
    }

    /*3-3-3. result 버튼이 눌렸을 시 함수*/
    this.result=function (){
        var a,b;

        if(this.currentValue==null && this.prevValue==null && this.resultValue!=""){
            this.prevValue=parseFloat(this.resultValue);
            this.currentValue=parseFloat(this.resultValue1);
        }

        if(this.currentValue==null){
            this.currentValue=parseFloat(this.currentInput.innerText);
        }

        if(this.currentCal){
            if(this.prevValue==null){
                if(this.currentValue){
                    this.resultValue0=this.currentValue.toString();
                }
            }else {
                this.resultValue0=this.prevValue.toString();
                this.resultValue1=this.currentValue.toString();
            }
            a=parseFloat(this.resultValue0);
            b=parseFloat(this.resultValue1);

            if(this.currentCal=="÷"){
                this.resultValue=calc.devide(a,b);
            }else if(this.currentCal=="x"){
                this.resultValue = calc.multi(a,b);
            }else if(this.currentCal=="+"){
                this.resultValue = calc.sum(a,b);
            }else if(this.currentCal=="-"){
                this.resultValue = calc.minus(a,b);
            }
        }else{
            this.resultValue1=this.currentValue.toString();
            this.resultValue=this.resultValue1;
        }

        this.resultValue=this.resultValue.toString();
        this.resultValue=this.resultValue.substring(0,16);
        this.resultValue=parseFloat(this.resultValue);


        this.prevInput.innerText=this.resultValue0+" "+this.currentCal+" "+this.resultValue1+" = ";
        this.currentInput.innerText=this.resultValue;
        this.prevValue=null;
        this.currentFloat=null;
        this.currentValue=null;
        this.currentInputResetTrigger="o";

        this.prependCalLog(this.prevInput.innerText, this.currentInput.innerText);
    }

    /*4. RightPannel에 기록 남기기.*/
    this.prependCalLog = function (prevText, result){
        var logPannel = document.querySelector("#logPannel");
        if(this.resultCnt==0){
            document.querySelector("#nodata").style.display="none";
            logPannel.style.display="block";
        }

        var liElement = document.createElement("li");
        liElement.innerHTML='<p class="input_value_0">'+ prevText +'</p>\n' +
            '                    <p class="input_value_1">'+result+'</p>';

        logPannel.insertBefore(liElement,logPannel.children[0]);
        this.resultCnt++;
    }
}

window.addEventListener("load", function(){
    var myCalulator=new Calculator();
    myCalulator.init();
})