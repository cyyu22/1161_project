let daycost = 0;
let monthcost = 0;

function costs() 
{
daycost += document.getElementById("Cost today");
monthcost += document.getElementById("Cost today");
alert(input)
alarms.create(
    reset_time,

)
}

function limit_setter()
{
    let dayLimit = document.getElementById(dailyLimit);
    let monthLimit = document.getElementById(monthlyLimit);
    alert(input)
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate();
}

window.onload = function init() {
    const {value, date} = JSON.parse(localStorage.getValue('key'));

    if (!isToday(date)) {
        localStorage.setValue('key', JSON.stringify({ date: new Date(), value: defaultValue}));
    }

}

