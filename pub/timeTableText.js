$('select').on('change', function() {
    classSelected();
});

async function classSelected(){
    Class = $("#class").val();
    const data = { Class };
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const responce = await fetch("/getdata", options);
    json = await responce.json();
    console.log(json.timeTable)

    for (let day = 1; day <= 5 ; day++) {
        for (let period = 0; period <= 7; period++) {
            $(`#${period}${day}`).html(json.timeTable[period][day-1]);
        }   
    }
}