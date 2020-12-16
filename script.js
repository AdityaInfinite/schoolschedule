// format of cell id is (period)(day)
var date;
var day;
var ClasTim = [
    ["08:30:00", "09:10:00"], //
    ["09:20:00", "10:00:00"], //small break here
    ["10:00:00", "10:20:00"],
    ["10:20:00", "11:00:00"], //
    ["11:10:00", "11:50:00"], //small break here
    ["11:50:00", "12:10:00"],
    ["12:10:00", "12:50:00"], //
    ["13:00:00", "13:40:00"], //small break here
];

function doAll() {
    showTime();
    periodHighlight();
}
setInterval(doAll, 1000);
doAll();
dayHighlight();

function dayHighlight() {
    $(`#day${day}`).toggleClass("success");
};

function showTime() {
    date = new Date("December 10, 2020 13:38:00"); // new Date("December 10, 2020 8:35:00");
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
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

    let currentTime = hour + ":" + min + ":" + sec + am_pm;

    document.getElementById("clock").innerHTML = currentTime;
}

function periodHighlight() {
    isClass = false;
    for (let period = 0; period < ClasTim.length; period++) {
        if (checkPeriod(ClasTim[period][0], ClasTim[period][1])) {
            var e;
            if (period === 2 || period === 5) {
                document.getElementById("NowPeriod").innerText = 
                    document.getElementById(`${period}0`).innerHTML;
                document.getElementById("NextPeriod").innerText = 
                    document.getElementById(`${period + 1}${day}`).innerHTML;
                isClass = true;
                e = ClasTim[period + 1][0].split(":");
                f = ClasTim[period][1].split(":");
                InTime(f,"NowInTime");
                InTime(e,"NextInTime");
            } else {
                document.getElementById("NowPeriod").innerText = 
                    document.getElementById(`${period}${day}`).innerText;
                //console.log("next class");
                if (period === 1 || period === 4) {
                    document.getElementById("NextPeriod").innerText =
                        document.getElementById(`${period + 1}0`).innerText;
                    e = ClasTim[period + 1][0].split(":");
                    f = ClasTim[period][1].split(":");
                    InTime(f, "NowInTime");
                    InTime(e, "NextInTime")
                } else if (period === ClasTim.length - 1) {
                    e = ClasTim[period][1].split(":");
                    InTime(e, "NowInTime");
                    InTime(e, "NextInTime");
                    document.getElementById("NextPeriod").innerText = "school ends";
                } else {
                    document.getElementById("NextPeriod").innerText =
                        document.getElementById(`${period + 1}${day}`).innerText;

                    var e = ClasTim[period][1].split(":");
                    var f = ClasTim[period + 1][0].split(":");
                    InTime(f, "NextInTime");
                    InTime(e, "NowInTime");
                }
                isClass = true;
            }

        } else if (period === ClasTim.length - 1 && isClass === false) {
            document.getElementById("NowPeriod").innerText = "no class";
            document.getElementById("NowInTime").innerText = "-";
            var e = ClasTim[period][1].split(":");
            var dt3 = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(e[0]),
                parseInt(e[1]),
                parseInt(e[2])
            );

            if (date > dt3) {
                document.getElementById("NextInTime").innerText = "-";
                document.getElementById("NextPeriod").innerText = "School Ended";
            } else {
                timeBetweenPeriods();
            }
        }
    }
}

function checkPeriod(startTime, endTime) {
    var s = startTime.split(":");
    var dt1 = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(s[0]),
        parseInt(s[1]),
        parseInt(s[2])
    );

    var e = endTime.split(":");
    var dt2 = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(e[0]),
        parseInt(e[1]),
        parseInt(e[2])
    );

    if (date >= dt1 && date <= dt2) {
        return true;
    } else {
        return false;
    }
}

function timeBetweenPeriods() {
    for (let index = 0; index < ClasTim.length - 1; index++) {
        // console.log(index);
        var brStTimes = ClasTim[index][1].split(":");
        var brEndTimes = ClasTim[index + 1][0].split(":");
        var brStart = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            parseInt(brStTimes[0]),
            parseInt(brStTimes[1]),
            parseInt(brStTimes[2])
        );
        var brEnd = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            parseInt(brEndTimes[0]),
            parseInt(brEndTimes[1]),
            parseInt(brEndTimes[2])
        );

        if (date >= brStart && date <= brEnd) {
            document.getElementById("NextInTime").innerText =
                (brEnd - date) / 60000 + " minutes";
            document.getElementById("NextPeriod").innerText = document.getElementById(
                `${index + 1}${day}`
            ).innerText;
        } else {
            // console.log(`${brStart}|${date}|${brEnd}  @${index}`);
        }
    }
}

function InTime(e, id) {
    // console.log(`a=${e[0]}; b=${e[1]}; c=${e[2]} for ${id}`)
    min=" minutes"
    var dt3 = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(e[0]),
        parseInt(e[1]),
        parseInt(e[2])
    );
    if(Math.trunc((dt3 - date) / 60000) === 1){
        min=" minute"
    }
    document.getElementById(id).innerText = Math.trunc((dt3 - date) / 60000) + min;
}