   
function shunting(i){
        var input = i.split("");
        var output = [];
        var stack = []; 
        var prev = "";
        var localInput = "";
        while(input.length > 0){
              localInput = input.splice(0,1)[0];
            if($.isNumeric(localInput) || localInput === "."){// checks for numbers or decimals
                while($.isNumeric(input.slice(0,1)[0] ) ||  input.slice(0,1)[0]=== "."){//if found loop till you don't find one
                    localInput += input.splice(0,1)[0];   
               } 
             output.push(localInput);
            }
            else if(localInput === "^" || localInput === "R" ){//power , right assoctive precdence 4
                while( stack[0] === "-u"){
                output.push(stack.splice(0,1)[0]);
                }
                stack.unshift(localInput);  
            }
            else if(localInput ===  "/" || localInput ===  "*"){//left assocative. precadence 3
                 while( stack[0] === "/" || stack[0] === "*"  || stack[0] === "-u" ||  stack[0]  === "^" || stack[0]  === "R"){
                        output.push(stack.splice(0,1)[0]);
                 
                 }
                  stack.unshift(localInput);
             }
             else if( localInput ===  "-"){
                if ((output === 0 || !($.isNumeric(prev))) && prev !== ")"  ){//uninay minus, right assoctive precdence 5
                    stack.unshift("-u");
                }else{//infix minus,left assoctaive. preadence 2
                     while( stack[0] ===  "-" || stack[0] ===  "+" || stack[0] === "/" || stack[0] === "*" || stack[0] === "-u" ||  stack[0]  === "^" ||  stack[0]  === "R"){
                        output.push(stack.splice(0,1)[0]);
                    }
                 stack.unshift(localInput);
                }
            }
            
            else if( localInput === "+"  ){//left assoctaive. preadence 2
                    while( stack[0] ===  "-" || stack[0] ===  "+" || stack[0] === "/" || stack[0] === "*"  || stack[0] === "-u" || stack[0] === "^" || stack[0]  === "R" ){
                        output.push(stack.splice(0,1)[0]);
                    }
                 stack.unshift(localInput);
             }
              
        
             else if(localInput === "("){
                 stack.unshift(localInput);
                 
             }
            else if(localInput === ")"){
                while( stack[0] !==  "(" && stack.length > 0){   
                    output.push(stack.splice(0,1)[0]);
                    
                }
                if(stack[0] === "("){
                    stack.splice(0,1);  
                }
                else{
                    output = "Missing Parenthesis";
                    return "Missing Parenthesis";
                }                
             }
            else{
                output = "Invalid Input";
                return "Invalid Input";
            }
            prev = localInput;
        }  
    
        while( stack.length > 0){
            if(stack[0] === "(" || stack[0] === ")"){
                output = "Missing Parenthesis";
                return "Missing Parenthesis";
            }
            output.push(stack.splice(0,1)[0]) 
        } 
        return output; 
    } 
  
function adder(i){//accepts arrays
    if(!(Array.isArray(i))){
        return i;
    }
    var a = 0;
    var b = 0;
    var stack = [];
    var diviser = 1;
    while(i.length  > 0 ){
        var localInput = i.splice(0,1)[0];
        if($.isNumeric(localInput)){
            localInput = Number(localInput);
            stack.unshift(localInput);
        }
        else if(localInput === "-u"){
           stack[0] = -1*stack[0];
        }
        else{
            if(stack.length >= 2){
                 a = stack.splice(0,1)[0];
                 b = stack.splice(0,1)[0]; 
                if(localInput === "+"){
                    a = a+b;
                }
                else if(localInput === "-"){
                    a = b-a;
                }
                else if(localInput === "*"){
                    a = a*b;
                }
                else if(localInput === "/"){
                    if(a === 0){
                     stack = "Can't divide by 0!";
                    return stack;
                    }
                    diviser = a;
                    a = b/a;
                }
                else if(localInput === "^"){
                    if(b < 0 && a < 1){
                        if(diviser%2 === 0){
                            stack = "No negative even roots!";
                            return stack;
                        }
                        else{
                            b = -1*b;
                            a = Math.pow(b,a);
                            a= -1*a;
                        }
                    
                    }else{
                         a = Math.pow(b,a);
                    }
                  
                }
              else if(localInput === "R"){
                if(b < 0){
                stack = "No negative bases!";
                return stack;
                }
                if(a < 0 && b%2 !== 0){
                    a = -1*a;
                    a = Math.pow(a,1/b);
                    a= -1*a;
                }
                else if(a < 0 && b%2 === 0){
                    stack = "No negative even roots!";
                    return stack;
                }
                else{
                  a = Math.pow(a,1/b);
                }
            }
            }
            else{
              stack = "Not enough numbers";
            return stack;
            }

            stack.unshift(a);
        }

    }
    if(stack.length > 1){
        stack = "Too many numbers";
        return stack;
    }
    else{
    return stack;
    }
}

$(function() {
    var input = "";
    var prev = "";
    var answer = "";
    var shunt = [];
   
    
    $("#form").keypress(function(e){
        if(e.which === 13){
            input = $("#input").val();
            prev = input;
            shunt = shunting(input);
            input = adder(shunt).toString();
            answer = input; 
            prev = prev + " = " + input;
            $("#prev").val(prev); 
            $("#input").val(input);
        }
    });
    $("#1").click(function(){
        input = $("#input").val();
        input += "1";
        $("#input").val(input);
    });
     $("#2").click(function(){
        input = $("#input").val();
        input += "2";
        $("#input").val(input);
    });
     $("#3").click(function(){
        input = $("#input").val();
        input += "3";
        $("#input").val(input);
    });
     $("#4").click(function(){
         input = $("#input").val();
         input += "4";
         $("#input").val(input);
    });
     $("#5").click(function(){
         input = $("#input").val();
         input += "5";
         $("#input").val(input);
    });
     $("#6").click(function(){
         input = $("#input").val();
         input += "6";
         $("#input").val(input);
    });
     $("#7").click(function(){
         input = $("#input").val();
         input += "7";
         $("#input").val(input);
    });
     $("#8").click(function(){
         input = $("#input").val();
         input += "8";
         $("#input").val(input);
    });
     $("#9").click(function(){
         input = $("#input").val();
         input += "9";
         $("#input").val(input);
    });
     $("#0").click(function(){
         input = $("#input").val();
         input += "0";
         $("#input").val(input);
    });
     $("#plus").click(function(){
         input = $("#input").val();
         input += "+";
         $("#input").val(input);
    });
     $("#minus").click(function(){
         input = $("#input").val();
         input += "-";
         $("#input").val(input);
    });
     $("#multi").click(function(){
         input = $("#input").val();
         input += "*";
         $("#input").val(input);
    });
     $("#division").click(function(){
         input = $("#input").val();
         input += "/";
         $("#input").val(input);
    });
     $("#leftP").click(function(){
         input = $("#input").val();
         input += "(";
         $("#input").val(input);
    });
     $("#rightP").click(function(){
        input = $("#input").val();
        input += ")";
        $("#input").val(input);
    });
    $("#deci").click(function(){
        input = $("#input").val(); 
        input += ".";
        $("#input").val(input);
    });
    $("#pow").click(function(){
        input = $("#input").val(); 
        input += "^";
        $("#input").val(input);
    });
     $("#root").click(function(){
        input = $("#input").val(); 
        input += "R";
        $("#input").val(input);
    });
     $("#prevAnswer").click(function(){
         input = $("#input").val(); 
        input += answer;
        $("#input").val(input);
    });
    $("#clear").click(function(){
        input = "";
        $("#input").val(input);
    });
     $("#clearPrev").click(function(){
        prev = "";
        $("#prev").val(prev);
    });
     $("#delete").click(function(){
        input = $("#input").val();
        var temp = input.split("");
        temp[temp.length-1] = "";
        input = temp.join("");
        $("#input").val(input);
    });
     $("#equals").click(function(){
        input = $("#input").val();
        prev = input;
        shunt = shunting(input);
        input = adder(shunt).toString();
        answer = input; 
        prev = prev + " = " + input;
        $("#prev").val(prev);
        $("#input").val(input);
    });
 });
   
