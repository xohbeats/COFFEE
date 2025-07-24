document.getElementById("moodForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const mood = document.getElementById("mood").value;
  const event = document.getElementById("event").value;
  const note = document.getElementById("note").value;
  
  const entry = `Mood: ${mood} | Linked to: ${event}${note ? " | Note: " + note : ""}`;
  
  const listItem = document.createElement("li");
  listItem.textContent = entry;
  document.getElementById("logList").prepend(listItem);
  
  this.reset();
});

function startGoal() {
  const goal = document.getElementById("goal").value;
  if (goal.trim()) {
    document.getElementById("goalStatus").textContent = `✅ Goal started: "${goal}" (Day 1)`;
  } else {
    document.getElementById("goalStatus").textContent = "Please enter a goal.";
  }
}
