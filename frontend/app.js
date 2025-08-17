const API_URL = "https://my-tiny-fullstack-app.onrender.com";

// Helper for confetti
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

async function create() {
  const content = document.getElementById("input").value;
  if (!content.trim()) {
    alert("Please enter something!");
    return;
  }
  await fetch(API_URL + "/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  launchConfetti(); // 🎇 after creating
  await getEntries(); // Refresh entries
  //    document.getElementById('output').scrollIntoView({ behavior: 'smooth' });
  document.getElementById("input").focus();
  alert("Created!");
  document.getElementById("input").value = "";
}

async function remove() {
  await fetch(API_URL + "/delete", { method: "DELETE" });
  await getEntries(); // Refresh entries
  alert("Deleted last record!");
  document.getElementById("input").value = "";
}

async function getEntries() {
  const res = await fetch(API_URL + "/entries");
  const data = await res.json();
  const output = document.getElementById("output-inner");
  output.innerHTML = ""; // clear previous data
  // If your data is an array of objects
  data.forEach((entry) => {
    // Build readable string without braces
    const line = Object.entries(entry)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    const p = document.createElement("p");
    p.textContent = line;
    output.appendChild(p);
  });

  // document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}

// Optionally, call getEntries on page load to show data immediately
window.onload = () => {
  getEntries();
};
