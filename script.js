var date = new Date();
var time = date.getTime();
var day = date.getDay();
// format of cell id is (period)(day)
dayHighlight();
periodHighlight();
function dayHighlight() {
    var x = document.getElementById("myTable").rows[0].cells;
    var y = document.getElementById("myTable").rows;

    console.log(checkPeriod(12,0,1,40));
    $(`#${8}${day}`).html("hi");

    $(`#${day}`).toggleClass("success");
    console.log(x[day]);
    // $(x[day]).css("background-color", "red");
    // $(x[day]).css("border-color", "blue");
    document.getElementById("btn").innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //$(`#${1}${day}`).html("hi");
}
function periodHighlight(){
    if(checkPeriod(8,30,9,10)){
        console.log(document.getElementById(`${1}${day}`).innerHTML);       
        $(`#${1}${day}`).html("hi");
    }
    else if(checkPeriod(9,20,10,0)){
        console.log(document.getElementById(`${2}${day}`).innerHTML);
        $(`#${2}${day}`).html("hi");
    }
    else if(checkPeriod(9,59,10,19)){
        console.log("break")
        //$(`#${}${day}`).html("hi");
    }
    else if(checkPeriod(10,20,11,00)){
        console.log(document.getElementById(`${3}${day}`).innerHTML);
        $(`#${3}${day}`).html("hi");
    }
    else if(checkPeriod(11,10,11,50)){
        console.log(document.getElementById(`${4}${day}`).innerHTML);
        $(`#${4}${day}`).html("hi");
    }
    else if(checkPeriod(11,51,12,9)){
        console.log("break")
        //$(`#${}${day}`).html("hi");
    }
    else if(checkPeriod(12,10,12,50)){
        console.log(document.getElementById(`${5}${day}`).innerHTML);
        $(`#${5}${day}`).html("hi");
    }
    else if(checkPeriod(1,0,1,40)){
        console.log(document.getElementById(`${6}${day}`).innerHTML);
        $("#NowPeriod").html(document.getElementById(`${6}${day}`).innerHTML);
        $(`#${6}${day}`).html("hi");
    }
}

function checkPeriod(StartHour,StartMinute,EndHour,EndMinute){
    if( (date.getHours() >= StartHour) &&  (date.getMinutes() >= StartMinute) && (date.getHours() <= EndHour) &&  (date.getMinutes() <= EndMinute)){
        return true;
    }
    else{
        console.log(`st=${StartHour}:${StartMinute} now=${date.getHours()}:${date.getMinutes()}`)
        return false;
    }
}