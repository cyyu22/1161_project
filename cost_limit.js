let daycost = 0;
let monthcost = 0;
let dayLimit;
let monthLimit;

let costs_organized_month = {
    "Groceries":[],
    "Food":[],
    "Clothes":[],
    "Entertainment":[],
    "Rent":[],
    "Transport":[],
    "Other":[]
}

let costs_organized_day = {
    "Groceries":[],
    "Food":[],
    "Clothes":[],
    "Entertainment":[],
    "Rent":[],
    "Transport":[],
    "Other":[]
}

let cost_update = document.getElementById("update_daily_costs");
document.addEventListener("DOMContentLoaded", cost_update.onclick = costs());

function costs() {
    daycost += Number(document.getElementById("Cost today"));
    if ((daycost >= (dayLimit * 0.8)) && (dayLimit != 0)) {
        limit_warning(false);
    }
    monthcost += Number(document.getElementById("Cost today"));
    if ((monthcost >= (monthLimit * 0.8)) && (monthLimit != 0)) {
       limit_warning(true);
    }
}

function limit_setter()
{
    dayLimit = Number(document.getElementById("dailyLimit"));
    monthLimit = Number(document.getElementById("monthlyLimit"));
    alert(input)
}

function limit_warning(sev) {
    if (sev) {
        window.alert("Warning! You are approaching the montly cost limit!");
    }
    else {
        window.alert("Warning! You are approaching the cost daily limit!");
    }
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate();
}

window.onload = function init() {
    const {value, date} = JSON.parse(localStorage.getValue('key'));

    if (!isToday(date)) {
        localStorage.setValue('key', JSON.stringify({ date: new Date(), daycost: 0}));
    }

}

function cost_organizer() {
    var cat = document.getElementsByName('costCategory');
    for (i = 0; i < cat.length; i++) {
        if (cat[i].checked) {
            costs_organized_day[cat[i]].push(document.getElementById("Cost today"));
            costs_organized_month[cat[i]].push(document.getElementById("Cost today"));
        }
    }
}

function reportgen() {
    cost_report.html.onload = report()
}

function report() {

        document.getElementById("reporth2").textContent = "Current report of the day.";
        document.getElementById("reportp").textContent = `Money spent today:$${daycost.toFixed(2)}
        Amount of money left until daily cost limit is reached: $${(dayLimit - daycost).toFixed(2)}`;
        document.getElementById("monthreport").textContent = "Monthly report";
        document.getElementById("monthreporth2").textContent = "Current report of the Month.";
        document.getElementById("monthreportp").textContent = `Money spent this month:$${monthcost.toFixed(2)}
        Amount of money left until monthly cost limit is reached: $${(monthLimit - monthcost).toFixed(2)}`;
}

function reportconfirm() {
    if (confirm("Are you sure you want to generate a report?")) {
        window.open("cost_report.html");
    }
}