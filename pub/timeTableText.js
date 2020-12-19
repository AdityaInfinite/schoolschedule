var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

if (cookies.class) {
    classSelected(cookies.class);
    $('select option').each(function () {
        var $this = $(this); // cache this jQuery object to avoid overhead

        if ($this.val() == cookies.class) { // if this option's value is equal to our value
            $this.prop('selected', true); // select this option
            return false; // break the loop, no need to look further
        }
    });
}

$('select').on('change', function () {
    document.cookie = `class=${$("#class").val()}`
    classSelected($("#class").val());
});

async function classSelected(Class) {
    os = navigator.platform;
    const data = { Class, os };
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

    for (let day = 1; day <= 5; day++) {
        for (let period = 0; period <= 7; period++) {
            $(`#${period}${day}`).html(json.timeTable[period][day - 1]);
        }
    }
}