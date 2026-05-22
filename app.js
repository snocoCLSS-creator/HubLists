const alertsList = document.getElementById("alerts-list");
const statusDiv = document.getElementById("status");

const API_URL = "https://api.weather.gov/alerts/active?area=WA";

async function loadAlerts() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Accept": "application/geo+json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const alerts = data.features;

    statusDiv.textContent = "";

    if (!alerts || alerts.length === 0) {
      alertsList.innerHTML = `
        <li class="no-alerts">
          No active alerts for Washington State.
        </li>
      `;
      return;
    }

    alerts.forEach(alert => {
      const props = alert.properties;

      const li = document.createElement("li");
      li.className = "alert-item";

      li.innerHTML = `
        <div class="alert-title">${props.event}</div>

        <div class="alert-meta">
          Severity: ${props.severity || "Unknown"} |
          Area: ${props.areaDesc || "N/A"}
        </div>

        <div class="alert-desc">
          ${props.headline || ""}
        </div>
      `;

      alertsList.appendChild(li);
    });

  } catch (error) {
    console.error(error);

    statusDiv.textContent =
      "Unable to load weather alerts at this time.";
  }
}

loadAlerts();
