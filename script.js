// Student Study Planner JavaScript

var studyForm = document.getElementById("studyForm");
var taskName = document.getElementById("taskName");
var taskDate = document.getElementById("taskDate");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var priority = document.getElementById("priority");
var planList = document.getElementById("planList");
var totalPlan = document.getElementById("totalPlan");
var completedPlan = document.getElementById("completedPlan");

var plans = JSON.parse(localStorage.getItem("studentPlans")) || [];

// Save all plans to local storage
function savePlans() {
    localStorage.setItem("studentPlans", JSON.stringify(plans));
}

// Show all plans
function showPlans() {
    planList.innerHTML = "";

    var completedCount = 0;

    for (var i = 0; i < plans.length; i++) {
        if (plans[i].completed == true) {
            completedCount++;
        }

        var li = document.createElement("li");
        li.className = "plan-item";

        if (plans[i].completed == true) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <h3>${plans[i].name}</h3>
            <p>
                Date: ${plans[i].date} <br>
                Start Time: ${plans[i].start} <br>
                End Time: ${plans[i].end} <br>
                Priority: ${plans[i].priority}
            </p>
            <button class="action-btn done-btn" onclick="completePlan(${i})">Complete</button>
            <button class="action-btn delete-btn" onclick="deletePlan(${i})">Delete</button>
        `;

        planList.appendChild(li);
    }

    totalPlan.innerText = plans.length;
    completedPlan.innerText = completedCount;
}

// Add new plan
studyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var newPlan = {
        name: taskName.value,
        date: taskDate.value,
        start: startTime.value,
        end: endTime.value,
        priority: priority.value,
        completed: false
    };

    plans.push(newPlan);
    savePlans();
    showPlans();

    studyForm.reset();
});

// Complete plan
function completePlan(index) {
    plans[index].completed = true;
    savePlans();
    showPlans();
}

// Delete plan
function deletePlan(index) {
    plans.splice(index, 1);
    savePlans();
    showPlans();
}

// Load saved plans when page opens
showPlans();
