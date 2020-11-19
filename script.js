var date = new Date();
var time = date.getTime();
var day = date.getDay();
dayHighlight();
periodHighlight();
function dayHighlight() {
    var x = document.getElementById("myTable").rows[0].cells;
    $(`#${day}`).toggleClass("success");
    console.log(x[day]);
    $(x[day]).css("background-color", "red");
    $(x[day]).css("border-color", "blue");
    document.getElementById("btn").innerHTML = `day: ${day} time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
function periodHighlight(){
    if(checkPeriod(11,10,11,50)){
        console.log("sanskrit")
    }
}

function checkPeriod(StartHour,StartMinute,EndHour,EndMinute){
    if( date.getHours() >= StartHour &&  date.getMinutes() >= StartMinute && date.getHours() <= EndHour &&  date.getMinutes() <= EndMinute){
        return true;
    }
    else{
        return false;
    }
}