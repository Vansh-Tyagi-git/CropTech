// Climate Prediction JavaScript

// Declare google variable
let google;

// Initialize the climate map
function initClimateMap() {
    // Default coordinates (can be changed to a default farm location)
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    
    // Create the map centered at the default location
    const map = new google.maps.Map(document.getElementById("climate-map"), {
        zoom: 10,
        center: defaultLocation,
        mapTypeId: "terrain",
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
        },
    });
    
    // Add a marker at the default location
    let marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        draggable: true,
        title: "Drag to your field location",
    });
    
    // Add event listener for marker drag end
    marker.addListener("dragend", () => {
        const position = marker.getPosition();
        map.setCenter(position);
        updateWeatherData(position.lat(), position.lng());
    });
    
    // Set up the locate button
    document.getElementById("climate-locate-btn").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos);
                    marker.setPosition(pos);
                    updateWeatherData(pos.lat, pos.lng);
                },
                () => {
                    alert("Error: The Geolocation service failed.");
                }
            );
        } else {
            alert("Error: Your browser doesn't support geolocation.");
        }
    });
    
    // Set up the search button
    document.getElementById("climate-search-btn").addEventListener("click", searchLocation);
    
    // Allow search on Enter key press
    document.getElementById("climate-location-search").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchLocation();
        }
    });
    
    // Function to search for a location
    function searchLocation() {
        const searchInput = document.getElementById("climate-location-search").value;
        if (searchInput.trim() === "") return;
        
        // In a real application, you would use the Google Maps Geocoding API
        // For this demo, we'll just set a random location near the default
        const randomLat = defaultLocation.lat + (Math.random() - 0.5) * 0.1;
        const randomLng = defaultLocation.lng + (Math.random() - 0.5) * 0.1;
        const searchLocation = { lat: randomLat, lng: randomLng };
        
        map.setCenter(searchLocation);
        marker.setPosition(searchLocation);
        updateWeatherData(randomLat, randomLng);
        
        // Update location name (in a real app, this would come from geocoding)
        document.getElementById("location-name").textContent = "San Francisco Area";
    }
    
    // Initial weather data update
    updateWeatherData(defaultLocation.lat, defaultLocation.lng);
}

// Function to update weather data
function updateWeatherData(lat, lng) {
    // In a real application, you would fetch weather data from an API
    // For this demo, we'll use mock data
    
    // Update current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("current-date").textContent = now.toLocaleDateString('en-US', options);
    
    // Update location name (in a real app, this would come from geocoding)
    document.getElementById("location-name").textContent = "San Francisco Area";
    
    // Update current weather data
    document.getElementById("current-temp").textContent = `${Math.floor(Math.random() * 15) + 15}°C`;
    
    const weatherDescriptions = [
        "Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Scattered Showers"
    ];
    document.getElementById("weather-desc").textContent = weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)];
    
    document.getElementById("wind-speed").textContent = `${Math.floor(Math.random() * 20) + 5} km/h`;
    document.getElementById("humidity").textContent = `${Math.floor(Math.random() * 30) + 50}%`;
    document.getElementById("precipitation").textContent = `${(Math.random() * 5).toFixed(1)} mm`;
    document.getElementById("uv-index").textContent = `${Math.floor(Math.random() * 8) + 1}`;
    
    // Generate forecast data
    generateForecast();
    
    // Generate crop survival data
    generateCropSurvival();
    
    // Generate risk factors
    generateRiskFactors();
    
    // Generate action items
    generateActionItems();
}

// Function to generate forecast data
function generateForecast() {
    const forecastContainer = document.getElementById("forecast-items");
    forecastContainer.innerHTML = "";
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weatherIcons = ["fa-sun", "fa-cloud-sun", "fa-cloud", "fa-cloud-rain", "fa-cloud-showers-heavy"];
    const weatherDescs = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain"];
    
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const forecastDate = new Date();
        forecastDate.setDate(today.getDate() + i);
        
        const dayName = i === 0 ? "Today" : days[forecastDate.getDay()];
        const iconIndex = Math.floor(Math.random() * weatherIcons.length);
        const maxTemp = Math.floor(Math.random() * 15) + 15;
        const minTemp = maxTemp - Math.floor(Math.random() * 8) - 2;
        
        const forecastItem = document.createElement("div");
        forecastItem.className = "forecast-item";
        forecastItem.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="icon"><i class="fas ${weatherIcons[iconIndex]}"></i></div>
            <div class="temp">${maxTemp}° / ${minTemp}°</div>
            <div class="desc">${weatherDescs[iconIndex]}</div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    }
}

// Function to generate crop survival data
function generateCropSurvival() {
    const cropList = document.getElementById("crop-list");
    cropList.innerHTML = "";
    
    const crops = [
        { name: "Wheat", icon: "fa-wheat-awn" },
        { name: "Rice", icon: "fa-seedling" },
        { name: "Corn", icon: "fa-seedling" },
        { name: "Soybeans", icon: "fa-leaf" },
        { name: "Cotton", icon: "fa-cotton-bureau" },
        { name: "Potatoes", icon: "fa-seedling" }
    ];
    
    crops.forEach(crop => {
        const probability = Math.floor(Math.random() * 40) + 60; // 60-100%
        let probabilityClass = "high";
        
        if (probability < 70) {
            probabilityClass = "low";
        } else if (probability < 85) {
            probabilityClass = "medium";
        }
        
        const cropItem = document.createElement("div");
        cropItem.className = "crop-item";
        cropItem.innerHTML = `
            <div class="crop-icon">
                <i class="fas ${crop.icon}"></i>
            </div>
            <div class="crop-info">
                <h5>${crop.name}</h5>
                <div class="probability-bar">
                    <div class="probability-fill ${probabilityClass}" style="width: ${probability}%"></div>
                </div>
                <p>${probability}% survival probability</p>
            </div>
        `;
        
        cropList.appendChild(cropItem);
    });
}

// Function to generate risk factors
function generateRiskFactors() {
    const riskFactorsList = document.getElementById("risk-factors-list");
    riskFactorsList.innerHTML = "";
    
    const riskFactors = [
        "Increased precipitation may lead to soil erosion in sloped areas.",
        "Rising temperatures could accelerate pest reproduction cycles.",
        "Humidity levels above 80% increase risk of fungal diseases.",
        "Wind speeds exceeding 25 km/h may damage young plants.",
        "Drought conditions expected in the next 2-3 weeks.",
        "Frost risk for overnight temperatures in the coming week."
    ];
    
    // Randomly select 3-4 risk factors
    const selectedFactors = [];
    const numFactors = Math.floor(Math.random() * 2) + 3; // 3-4 factors
    
    while (selectedFactors.length < numFactors) {
        const randomIndex = Math.floor(Math.random() * riskFactors.length);
        const factor = riskFactors[randomIndex];
        
        if (!selectedFactors.includes(factor)) {
            selectedFactors.push(factor);
        }
    }
    
    selectedFactors.forEach(factor => {
        const li = document.createElement("li");
        li.textContent = factor;
        riskFactorsList.appendChild(li);
    });
}

// Function to generate action items
function generateActionItems() {
    const actionList = document.getElementById("action-list");
    actionList.innerHTML = "";
    
    const actions = [
        {
            title: "Irrigation Adjustment",
            icon: "fa-faucet-drip",
            description: "Reduce irrigation by 20% to prevent waterlogging due to expected rainfall."
        },
        {
            title: "Pest Prevention",
            icon: "fa-bug-slash",
            description: "Apply preventative treatments within the next 48 hours before humidity increases."
        },
        {
            title: "Soil Protection",
            icon: "fa-mountain",
            description: "Install temporary erosion barriers on sloped areas before heavy rainfall."
        },
        {
            title: "Crop Protection",
            icon: "fa-temperature-low",
            description: "Prepare frost protection measures for sensitive crops during overnight hours."
        },
        {
            title: "Harvest Planning",
            icon: "fa-tractor",
            description: "Consider harvesting mature crops within the next 5 days before weather deteriorates."
        }
    ];
    
    // Randomly select 3 actions
    const selectedActions = [];
    const numActions = 3;
    
    while (selectedActions.length < numActions) {
        const randomIndex = Math.floor(Math.random() * actions.length);
        const action = actions[randomIndex];
        
        if (!selectedActions.some(a => a.title === action.title)) {
            selectedActions.push(action);
        }
    }
    
    selectedActions.forEach(action => {
        const actionItem = document.createElement("div");
        actionItem.className = "action-item";
        actionItem.innerHTML = `
            <h5><i class="fas ${action.icon}"></i> ${action.title}</h5>
            <p>${action.description}</p>
        `;
        
        actionList.appendChild(actionItem);
    });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set up tab switching for weather dashboard
    const tabBtns = document.querySelectorAll(".tab-btn");
    const dashboardTabs = document.querySelectorAll(".dashboard-tab");
    
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove("active"));
            dashboardTabs.forEach(tab => tab.classList.remove("active"));
            
            // Add active class to clicked button and corresponding tab
            btn.classList.add("active");
            document.getElementById(`${tabId}-tab`).classList.add("active");
        });
    });
    
    // Set up tab switching for reports
    const reportTabs = document.querySelectorAll(".report-tab");
    const reportContents = document.querySelectorAll(".report-content");
    
    reportTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const reportId = tab.getAttribute("data-report");
            
            // Remove active class from all tabs and contents
            reportTabs.forEach(t => t.classList.remove("active"));
            reportContents.forEach(content => content.classList.remove("active"));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add("active");
            document.getElementById(`${reportId}-report`).classList.add("active");
        });
    });
    
    // Set up the generate report button
    document.getElementById("generate-report-btn").addEventListener("click", () => {
        alert("Generating detailed climate risk report. This may take a moment...");
        
        // In a real application, you would generate a comprehensive report
        setTimeout(() => {
            alert("Report generated successfully! You can now view or download it.");
        }, 1500);
    });
    
    // Set up the export data button
    document.getElementById("export-data-btn").addEventListener("click", () => {
        alert("Exporting climate data. Please wait...");
        
        // In a real application, you would export data to CSV or another format
        setTimeout(() => {
            alert("Data exported successfully!");
        }, 1000);
    });
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector("nav");
    
    mobileMenuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

// Create charts when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // This would be implemented with Chart.js in a real application
    // For this demo, we're just including the script reference
    console.log("Charts would be initialized here with Chart.js");
});