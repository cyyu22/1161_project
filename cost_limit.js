// cost_limit.js

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve stored data or initialize default values
    let costData = JSON.parse(localStorage.getItem('costData')) || {
        dailyCosts: {}, // Stores category-wise daily costs
        monthlyCosts: {}, // Stores category-wise monthly costs
        dailyTotal: 0,
        monthlyTotal: 0,
        dailyLimit: 0,
        monthlyLimit: 0,
        income: 0,
        savingsGoals: { shortTerm: 0, longTerm: 0 }
    };
    let updateButton = document.getElementById('update_daily_costs');
    if (updateButton) {
        console.log("update_daily_costs button found, adding event listener.");
        updateButton.addEventListener('click', function (event) {
            event.preventDefault();
            console.log("update_daily_costs button clicked!");
            updateDailyCost();
        });
    } else {
        console.error("update_daily_costs button NOT found.");
    }


    console.log("Loaded costData from localStorage:", costData);

    function updateDailyCost() {
        console.log("updateDailyCost function called")
        let inputElement = document.getElementById('dailyCostInput');
        if (!inputElement) {
            console.error("dailyCostInput element NOT FOUND");
            return;
        } else {
            console.log("Found dailyCostInput element:", inputElement);
        }

        let rawValue = inputElement.value.trim();
        console.log("Raw value from input:", rawValue);

        let amount = parseFloat(rawValue);
        console.log("Parsed amount:", amount);
        if (isNaN(amount) || amount <= 0) {
            console.error("Invalid amount entered:", amount);
            return;
        }
    
        let categoryElement = document.querySelector('select[name="costCategory"]');
        if (!categoryElement) {
            console.error("Category selection element not found");
            return;
        }
    
        let category = categoryElement.value;
        console.log("Adding cost:", amount, "to category:", category);
    
        costData.dailyCosts[category] = (costData.dailyCosts[category] || 0) + amount;
        costData.monthlyCosts[category] = (costData.monthlyCosts[category] || 0) + amount;
        costData.dailyTotal += amount;
        costData.monthlyTotal += amount;
    
        console.log("Updated costData:", costData);
    
        localStorage.setItem('costData', JSON.stringify(costData));
    
        // Show warnings
        if (costData.dailyTotal >= costData.dailyLimit * 0.9) {
            alert("Warning: You are approaching your daily spending limit!");
        }
        if (costData.monthlyTotal >= costData.monthlyLimit * 0.9) {
            alert("Warning: You are approaching your monthly spending limit!");
        }
    }
    
   

    

    // Function to update limits
    function updateLimits() {
        let dailyLimitInput = document.getElementById('dailyLimit');
        let monthlyLimitInput = document.getElementById('monthlyLimit');
        if (dailyLimitInput && monthlyLimitInput) {
            costData.dailyLimit = parseFloat(dailyLimitInput.value) || 0;
            costData.monthlyLimit = parseFloat(monthlyLimitInput.value) || 0;
            localStorage.setItem('costData', JSON.stringify(costData));
        }
    }

    let limitButton = document.getElementById('update_limits');
    if (limitButton) {
        limitButton.addEventListener('click', function (event) {
            event.preventDefault();
            updateLimits();
        });
    }

    // Function to set savings goals
    function setSavingsGoals() {
        let shortGoalInput = document.getElementById('shortGoal');
        let longGoalInput = document.getElementById('longGoal');
        if (shortGoalInput && longGoalInput) {
            costData.savingsGoals.shortTerm = parseFloat(shortGoalInput.value) || 0;
            costData.savingsGoals.longTerm = parseFloat(longGoalInput.value) || 0;
            localStorage.setItem('costData', JSON.stringify(costData));
        }
    }

    let goalButton = document.getElementById('setGoals');
    if (goalButton) {
        goalButton.addEventListener('click', function (event) {
            event.preventDefault();
            setSavingsGoals();
        });
    }

    // Function to set income
    function setIncome() {
        let wageInput = document.getElementById('wage');
        if (wageInput) {
            costData.income = parseFloat(wageInput.value) || 0;
            localStorage.setItem('costData', JSON.stringify(costData));
        }
    }

    let wageInput = document.getElementById('wage');
    if (wageInput) {
        wageInput.addEventListener('change', setIncome);
    }

    // Function to generate report
    function reportconfirm() {
        let dailySavings = costData.dailyLimit - costData.dailyTotal;
        let monthlySavings = costData.monthlyLimit - costData.monthlyTotal;
        let avgNetGain = costData.income - costData.monthlyTotal;
 
        let dailyCategoryBreakdown = Object.entries(costData.dailyCosts).map(([category, amount]) => `${category}: $${amount.toFixed(2)} (${((amount / costData.dailyTotal) * 100).toFixed(1)}%)`).join("\n");
        let monthlyCategoryBreakdown = Object.entries(costData.monthlyCosts).map(([category, amount]) => `${category}: $${amount.toFixed(2)} (${((amount / costData.monthlyTotal) * 100).toFixed(1)}%)`).join("\n");
 
        alert(`Daily Savings: $${dailySavings.toFixed(2)}\nMonthly Savings: $${monthlySavings.toFixed(2)}\n\nDaily Cost Breakdown:\n${dailyCategoryBreakdown}\n\nMonthly Cost Breakdown:\n${monthlyCategoryBreakdown}\n\nDaily Limit: $${costData.dailyLimit.toFixed(2)}\nMonthly Limit: $${costData.monthlyLimit.toFixed(2)}\nNet Gain: $${avgNetGain.toFixed(2)}`);
    }

    // Make reportconfirm globally accessible
    window.reportconfirm = reportconfirm;
});