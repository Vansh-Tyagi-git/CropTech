// Crop Monitoring JavaScript

// Initialize the map
function initMap() {
    // Default coordinates (can be changed to a default farm location)
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    
    // Create the map centered at the default location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
        mapTypeId: "satellite",
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
        // You could update field information based on the new position here
    });
    
    // Set up the locate button
    document.getElementById("locate-btn").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos);
                    marker.setPosition(pos);
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
    document.getElementById("search-btn").addEventListener("click", searchLocation);
    
    // Allow search on Enter key press
    document.getElementById("location-search").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchLocation();
        }
    });
    
    // Function to search for a location
    function searchLocation() {
        const searchInput = document.getElementById("location-search").value;
        if (searchInput.trim() === "") return;
        
        // In a real application, you would use the Google Maps Geocoding API
        // For this demo, we'll just set a random location
        const randomLat = defaultLocation.lat + (Math.random() - 0.5) * 0.1;
        const randomLng = defaultLocation.lng + (Math.random() - 0.5) * 0.1;
        const searchLocation = { lat: randomLat, lng: randomLng };
        
        map.setCenter(searchLocation);
        marker.setPosition(searchLocation);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Check if google is defined, if not, load the Google Maps API
    if (typeof google === 'undefined') {
        console.log('Google Maps API not found, attempting to load...');
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`; // Replace YOUR_API_KEY
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Define initMap globally so the API can call it
        window.initMap = initMap;
    } else {
        // If google is defined, initialize the map directly
        initMap();
    }

    // Set up monitoring option buttons
    document.getElementById("satellite-btn").addEventListener("click", () => {
        selectMonitoringOption("satellite");
    });
    
    document.getElementById("drone-btn").addEventListener("click", () => {
        selectMonitoringOption("drone");
    });
    
    document.getElementById("mobile-btn").addEventListener("click", () => {
        selectMonitoringOption("mobile");
    });
    
    document.getElementById("upload-btn").addEventListener("click", () => {
        selectMonitoringOption("upload");
    });
    
    // Function to handle monitoring option selection
    function selectMonitoringOption(option) {
        // Reset all options
        document.querySelectorAll(".monitoring-option").forEach(el => {
            el.classList.remove("selected");
        });
        
        // Highlight the selected option
        document.getElementById(`${option}-option`).classList.add("selected");
        
        // Show/hide relevant sections
        if (option === "upload") {
            document.getElementById("map-view").style.display = "none";
            document.getElementById("upload-container").style.display = "block";
        } else {
            document.getElementById("map-view").style.display = "block";
            document.getElementById("upload-container").style.display = "none";
        }
    }
    
    // Set up the upload area
    const uploadArea = document.getElementById("upload-area");
    const fileInput = document.getElementById("file-input");
    
    uploadArea.addEventListener("click", () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
    });
    
    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
    });
    
    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length) {
            handleFiles(fileInput.files);
        }
    });
    
    // Function to handle uploaded files
    function handleFiles(files) {
        const uploadedImagesContainer = document.getElementById("uploaded-images");
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Check if the file is an image
            if (!file.type.match("image.*")) continue;
            
            const reader = new FileReader();
            
            reader.onload = (function(file) {
                return function(e) {
                    // Create image container
                    const imageContainer = document.createElement("div");
                    imageContainer.className = "uploaded-image";
                    
                    // Create image element
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.alt = file.name;
                    
                    // Create remove button
                    const removeBtn = document.createElement("button");
                    removeBtn.className = "remove-btn";
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.addEventListener("click", () => {
                        imageContainer.remove();
                    });
                    
                    // Append elements
                    imageContainer.appendChild(img);
                    imageContainer.appendChild(removeBtn);
                    uploadedImagesContainer.appendChild(imageContainer);
                };
            })(file);
            
            reader.readAsDataURL(file);
        }
        
        // Show the analyze button if there are images
        if (uploadedImagesContainer.children.length > 0) {
            document.getElementById("analyze-btn").style.display = "block";
        }
    }
    
    // Set up the analyze button
    document.getElementById("analyze-btn").addEventListener("click", analyzeImages);
    
    // Function to analyze images
    function analyzeImages() {
        // In a real application, you would send the images to a server for analysis
        // For this demo, we'll just show the results after a delay
        
        // Show loading state
        document.getElementById("analyze-btn").textContent = "Analyzing...";
        document.getElementById("analyze-btn").disabled = true;
        
        setTimeout(() => {
            // Reset button
            document.getElementById("analyze-btn").textContent = "Analyze Images";
            document.getElementById("analyze-btn").disabled = false;
            
            // Show results
            document.getElementById("analysis-results").style.display = "block";
            document.getElementById("action-plan").style.display = "block";
            
            // Animate health meter
            const healthMeter = document.getElementById("health-meter");
            const healthValue = Math.floor(Math.random() * 30) + 70; // Random value between 70-100
            healthMeter.style.width = `${healthValue}%`;
            
            // Update health status text
            const healthStatus = document.getElementById("health-status");
            if (healthValue >= 90) {
                healthStatus.textContent = "Excellent condition";
                healthMeter.style.backgroundColor = "#4CAF50";
            } else if (healthValue >= 80) {
                healthStatus.textContent = "Good condition";
                healthMeter.style.backgroundColor = "#8BC34A";
            } else if (healthValue >= 70) {
                healthStatus.textContent = "Fair condition";
                healthMeter.style.backgroundColor = "#FFC107";
            } else {
                healthStatus.textContent = "Poor condition";
                healthMeter.style.backgroundColor = "#F44336";
            }
            
            // Update pest status
            const pestStatus = document.getElementById("pest-status");
            const hasPests = Math.random() > 0.7; // 30% chance of pests
            
            if (hasPests) {
                pestStatus.innerHTML = `
                    <p class="alert"><i class="fas fa-exclamation-triangle"></i> Pests detected</p>
                    <ul>
                        <li>Aphids detected on 15% of the crop</li>
                        <li>Early signs of fungal infection</li>
                    </ul>
                `;
                pestStatus.classList.add("has-pests");
            } else {
                pestStatus.innerHTML = `<p class="good"><i class="fas fa-check-circle"></i> No pests detected</p>`;
                pestStatus.classList.remove("has-pests");
            }
            
            // Update growth stage
            const growthStage = document.getElementById("growth-stage");
            const stages = ["Germination", "Seedling", "Vegetative growth", "Budding", "Flowering", "Ripening"];
            const randomStage = stages[Math.floor(Math.random() * stages.length)];
            
            growthStage.innerHTML = `
                <p><i class="fas fa-leaf"></i> ${randomStage}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${Math.floor(Math.random() * 40) + 60}%"></div>
                </div>
            `;
            
            // Scroll to results
            document.getElementById("analysis-results").scrollIntoView({ behavior: "smooth" });
        }, 2000);
    }
    
    // Set up the download report button
    document.getElementById("download-report-btn").addEventListener("click", () => {
        alert("Report generation started. The report will be downloaded when ready.");
        
        // In a real application, you would generate and download a PDF report
        setTimeout(() => {
            alert("Report downloaded successfully!");
        }, 1500);
    });
    
    // Add CSS class for styling
    document.querySelector(".monitoring-option").classList.add("selected");
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector("nav");
    
    mobileMenuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});