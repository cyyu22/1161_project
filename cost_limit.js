

function costs() {
    if (localStorage.getItem("daycost") != null) {
        localStorage.setItem("daycost", localStorage.getItem(daycost) + Number(document.getElementById("Cost today")));
    }
    else {
        localStorage.setItem("daycost", Number(document.getElementById("Cost today")));
        localStorage.setItem("Groceries", 0)
    }
    if ((localStorage.getItem("daycost") >= (localStorage.getItem("dayLimit") * 0.8)) && (localStorage.getItem("dayLimit") != 0)) {
        limit_warning(false);
    }
    if (localStorage.getItem("monthcost") != null) {
        localStorage.setItem("monthcost", localStorage.getItem("monthcost") + Number(document.getElementById("Cost today")))
    }
    else {
        localStorage.setItem("monthcost", Number(document.getElementById("Cost today")));
    }
    if ((localStorage.getItem("monthcost") >= (localStorage.getItem("monthLimit") * 0.8)) && (localStorage.getItem("monthLimit") != 0)) {
       limit_warning(true);
    }
}

function limit_setter()
{
    localStorage.setItem("dayLimit", Number(document.getElementById("dailyLimit")));
    localStorage.setItem("monthLimit", Number(document.getElementById("monthlyLimit")));
}

function limit_warning(sev) {
    if (sev) {
        window.alert("Warning! You are approaching the monthly cost limit!");
    }
    else {
        window.alert("Warning! You are approaching the daily cost limit!");
    }
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

const isMonth = (someDate) => {
    const today = new Date()
    return someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}
  
window.onload = function init() {
    const { value, date } = JSON.parse(localStorage.getItem("daycost"));
    const { Mvalue, Mdate} = JSON.parse(localStorage.getItem("monthcost"))
      
    if (!isToday(date)) {
        localStorage.removeItem("daycost");
        localStorage.setItem("GroceriesDay", 0);
        localStorage.setItem("FoodDay", 0);
        localStorage.setItem("ClothesDay", 0);
        localStorage.setItem("EntertainmentDay", 0);
        localStorage.setItem("RentDay", 0);
        localStorage.setItem("TransportDay", 0);
        localStorage.setItem("OtherDay", 0);
    }

    if (!isMonth(Mdate)) {
        localStorage.removeItem("monthcost");
        localStorage.setItem("GroceriesMonth", 0);
        localStorage.setItem("FoodMonth", 0);
        localStorage.setItem("ClothesMonth", 0);
        localStorage.setItem("EntertainmentMonth", 0);
        localStorage.setItem("RentMonth", 0);
        localStorage.setItem("TransportMonth", 0);
        localStorage.setItem("OtherMonth", 0);
    }
}

function cost_organizer() {
    var cat = document.getElementsByName('costCategory');
    for (i = 0; i < cat.length; i++) {
        if (cat[i].checked) {
            localStorage.setItem(cat[i] + "Day", localStorage.getItem(cat[i] + "Day") + document.getElementById("Cost today"));
            localStorage.setItem(cat[i] + "Month", localStorage.getItem(cat[i] + "Month") + document.getElementById("Cost today"));
        }
    }
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