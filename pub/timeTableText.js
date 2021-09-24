var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

if (cookies.class) {
    classSelected(cookies.class);
    $('select option').each(function () {
        var $this = $(this);

        if ($this.val() == cookies.class) {
            $this.prop('selected', true);
            return false;
        }
    });
}

$('select').on('change', function () {
    document.cookie = `class=${$("#class").val()}; expires=${targetDate}`
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

    for (let day = 1; day <= 5; day++) {
        for (let period = 0; period <= 7; period++) {
            $(`#${period}${day}`).html(json.timeTable[period][day - 1]);
        }
    }
}