var date = new Date("December 10, 2020 11:1:00");
var day;
// format of cell id is (period)(day)
setInterval(doAll, 1000);
function doAll() {
    showTime();

    periodHighlight();
}
function showTime() {
    date = new Date("December 10, 2020 11:1:00");
    //date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    day = date.getDay();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}
doAll();
dayHighlight();
function dayHighlight() {
    var x = document.getElementById("myTable").rows[0].cells;
    var y = document.getElementById("myTable").rows;
    // console.log(checkPeriod(12, 0, 1, 40));
    console.log(day)
    $(`#day${day}`).toggleClass("success");
    console.log(x[day].innerText);
    // $(x[day]).css("background-color", "red");
    // $(x[day]).css("border-color", "blue");
    // document.getElementById("btn").innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //$(`#${1}${day}`).html("hi");
}
function periodHighlight() {
    var ClasTim = [
        [8, 30, 9, 10],
        [9, 20, 10, 0],
        [9, 59, 10, 19],
        [10, 20, 11, 00],
        [11, 10, 11, 50],
        [11, 51, 12, 9],
        [12, 10, 12, 50],
        [1, 0, 1, 40]
    ];
    for (let period = 0; period < ClasTim.length; period++) {
        // if (period === 2 || period === 5) {
        //     console.log(document.getElementById(`${period}0`).innerText);
        // }else{
        //     console.log(document.getElementById(`${period}${day}`).innerText);
        // }

        if (checkPeriod(ClasTim[period][0], ClasTim[period][1], ClasTim[period][2], ClasTim[period][3])) {
            // $(`#${period}${day}`).html("hi");
            // console.log(period);
            if (period === 2 || period === 5) {
                $(`#${period}0`).html("hi");
                document.getElementById("NowPeriod").innerText = document.getElementById(`${period}0`).innerHTML
            }else{
                document.getElementById("NowPeriod").innerText = document.getElementById(`${period}${day}`).innerText;
                console.log(document.getElementById(`${period}${day}`).innerText);
            }

        }else{
            console.log("not "+ period +" class");
        }
    }


}

function checkPeriod(StartHour, StartMinute, EndHour, EndMinute) {
    if ((date.getHours() >= StartHour) && (date.getMinutes() >= StartMinute)) {
        if((date.getHours() <= EndHour) && (date.getMinutes() <= EndMinute)){
            return true;
        }
    }
    else {
        // console.log(`st=${StartHour}:${StartMinute} now=${date.getHours()}:${date.getMinutes()}`)
        console.log(`${StartHour}:${StartMinute} | ${date.getHours()}:${date.getMinutes()} | ${EndHour}:${EndMinute}`)
        return false;
    }
}

