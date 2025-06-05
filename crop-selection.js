// Crop Selection JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Crop Selection Form
  const cropSelectionForm = document.getElementById("crop-selection-form")
  const cropResults = document.getElementById("crop-results")
  const cropDetails = document.getElementById("crop-details")
  const locationDisplay = document.getElementById("location-display")

  // Location presets
  const locationPresets = {
    default: {
      location: "Default Location",
      soilType: "loamy",
      phLevel: 7.25,
      temperature: 28,
      rainfall: 700,
      nitrogen: 310,
      phosphorus: 14,
      potassium: 165,
      humidity: 60,
      farmSize: 10,
    },
    delhi: {
      location: "Delhi, India",
      soilType: "loamy",
      phLevel: 7.5,
      temperature: 30,
      rainfall: 700,
      nitrogen: 310,
      phosphorus: 14,
      potassium: 165,
      humidity: 60,
      farmSize: 10,
    },
    punjab: {
      location: "Punjab, India",
      soilType: "loamy",
      phLevel: 7.8,
      temperature: 25,
      rainfall: 650,
      nitrogen: 350,
      phosphorus: 20,
      potassium: 180,
      humidity: 55,
      farmSize: 15,
    },
    kerala: {
      location: "Kerala, India",
      soilType: "clay",
      phLevel: 6.2,
      temperature: 32,
      rainfall: 1500,
      nitrogen: 280,
      phosphorus: 18,
      potassium: 150,
      humidity: 75,
      farmSize: 8,
    },
    gujarat: {
      location: "Gujarat, India",
      soilType: "sandy",
      phLevel: 8.0,
      temperature: 33,
      rainfall: 550,
      nitrogen: 250,
      phosphorus: 12,
      potassium: 140,
      humidity: 50,
      farmSize: 12,
    },
  }

  // Quick crop selection presets
  const cropPresets = {
    rice: {
      soilType: "clay",
      phLevel: 6.0,
      temperature: 28,
      rainfall: 1500,
      nitrogen: 300,
      phosphorus: 20,
      potassium: 150,
      humidity: 70,
    },
    wheat: {
      soilType: "loamy",
      phLevel: 6.5,
      temperature: 20,
      rainfall: 650,
      nitrogen: 280,
      phosphorus: 25,
      potassium: 180,
      humidity: 55,
    },
    maize: {
      soilType: "loamy",
      phLevel: 6.2,
      temperature: 25,
      rainfall: 800,
      nitrogen: 320,
      phosphorus: 30,
      potassium: 160,
      humidity: 60,
    },
    cotton: {
      soilType: "sandy",
      phLevel: 7.2,
      temperature: 32,
      rainfall: 700,
      nitrogen: 250,
      phosphorus: 15,
      potassium: 140,
      humidity: 50,
    },
    chickpea: {
      soilType: "loamy",
      phLevel: 7.5,
      temperature: 24,
      rainfall: 650,
      nitrogen: 150,
      phosphorus: 20,
      potassium: 130,
      humidity: 45,
    },
  }

  if (cropSelectionForm && cropResults) {
    // Update range slider value displays
    const phSlider = document.getElementById("ph-level")
    const phValue = document.getElementById("ph-value")

    const tempSlider = document.getElementById("temperature")
    const tempValue = document.getElementById("temp-value")

    const rainfallSlider = document.getElementById("rainfall")
    const rainfallValue = document.getElementById("rainfall-value")

    const humiditySlider = document.getElementById("humidity")
    const humidityValue = document.getElementById("humidity-value")

    if (phSlider && phValue) {
      phSlider.addEventListener("input", function () {
        phValue.textContent = Number.parseFloat(this.value).toFixed(1)
      })
      // Set initial value
      phValue.textContent = Number.parseFloat(phSlider.value).toFixed(1)
    }

    if (tempSlider && tempValue) {
      tempSlider.addEventListener("input", function () {
        tempValue.textContent = Number.parseFloat(this.value).toFixed(1)
      })
      // Set initial value
      tempValue.textContent = Number.parseFloat(tempSlider.value).toFixed(1)
    }

    if (rainfallSlider && rainfallValue) {
      rainfallSlider.addEventListener("input", function () {
        rainfallValue.textContent = this.value
      })
      // Set initial value
      rainfallValue.textContent = rainfallSlider.value
    }

    if (humiditySlider && humidityValue) {
      humiditySlider.addEventListener("input", function () {
        humidityValue.textContent = this.value
      })
      // Set initial value
      humidityValue.textContent = humiditySlider.value
    }

    // Location preset buttons
    const presetButtons = document.querySelectorAll(".preset-btn")
    if (presetButtons.length > 0) {
      presetButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const presetName = this.getAttribute("data-preset")
          if (locationPresets[presetName]) {
            setValues(locationPresets[presetName])

            // Update active state
            presetButtons.forEach((btn) => btn.classList.remove("active"))
            this.classList.add("active")

            showAlert(`Location set to ${locationPresets[presetName].location}`, "info")
          }
        })
      })
    }

    // Quick crop selection buttons
    const quickCropButtons = document.querySelectorAll(".quick-crop-btn")
    if (quickCropButtons.length > 0) {
      quickCropButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const cropName = this.getAttribute("data-crop")
          if (cropPresets[cropName]) {
            // Keep the current location and farm size
            const currentLocation = document.getElementById("location").value
            const currentFarmSize = document.getElementById("farm-size").value

            // Apply crop preset
            setValues({
              ...cropPresets[cropName],
              location: currentLocation,
              farmSize: currentFarmSize,
            })

            // Update active state
            quickCropButtons.forEach((btn) => btn.classList.remove("active"))
            this.classList.add("active")

            showAlert(`Parameters set for optimal ${cropName} growing conditions`, "info")
          }
        })
      })
    }

    // Use default location button
    const useDefaultLocationBtn = document.getElementById("use-default-location")
    if (useDefaultLocationBtn) {
      useDefaultLocationBtn.addEventListener("click", () => {
        setValues(locationPresets.default)

        // Reset active states
        presetButtons.forEach((btn) => btn.classList.remove("active"))
        quickCropButtons.forEach((btn) => btn.classList.remove("active"))

        showAlert("Default values restored", "info")
      })
    }

    // Reset form button
    const resetFormBtn = document.getElementById("reset-form")
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => {
        setValues(locationPresets.default)

        // Reset active states
        presetButtons.forEach((btn) => btn.classList.remove("active"))
        quickCropButtons.forEach((btn) => btn.classList.remove("active"))

        showAlert("Form reset to default values", "info")
      })
    }

    // Function to set form values
    function setValues(values) {
      document.getElementById("location").value = values.location
      document.getElementById("soil-type").value = values.soilType
      document.getElementById("ph-level").value = values.phLevel
      document.getElementById("temperature").value = values.temperature
      document.getElementById("rainfall").value = values.rainfall
      document.getElementById("nitrogen").value = values.nitrogen
      document.getElementById("phosphorus").value = values.phosphorus
      document.getElementById("potassium").value = values.potassium
      document.getElementById("humidity").value = values.humidity
      document.getElementById("farm-size").value = values.farmSize

      // Update displayed values
      phValue.textContent = Number.parseFloat(values.phLevel).toFixed(1)
      tempValue.textContent = Number.parseFloat(values.temperature).toFixed(1)
      rainfallValue.textContent = values.rainfall
      humidityValue.textContent = values.humidity

      // Update location display
      if (locationDisplay) {
        locationDisplay.textContent = values.location
      }
    }

    // Form submission
    cropSelectionForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const location = document.getElementById("location").value
      const soilType = document.getElementById("soil-type").value
      const phLevel = Number.parseFloat(document.getElementById("ph-level").value)
      const temperature = Number.parseFloat(document.getElementById("temperature").value)
      const rainfall = Number.parseFloat(document.getElementById("rainfall").value)
      const nitrogen = Number.parseFloat(document.getElementById("nitrogen").value)
      const phosphorus = Number.parseFloat(document.getElementById("phosphorus").value)
      const potassium = Number.parseFloat(document.getElementById("potassium").value)
      const humidity = Number.parseFloat(document.getElementById("humidity").value)
      const farmSize = Number.parseFloat(document.getElementById("farm-size").value)

      // Validate inputs
      if (
        !location ||
        !soilType ||
        isNaN(phLevel) ||
        isNaN(temperature) ||
        isNaN(rainfall) ||
        isNaN(nitrogen) ||
        isNaN(phosphorus) ||
        isNaN(potassium) ||
        isNaN(humidity) ||
        isNaN(farmSize)
      ) {
        showAlert("Please fill in all fields", "error")
        return
      }

      // Update location display
      if (locationDisplay) {
        locationDisplay.textContent = location
      }

      // Show loading state
      cropResults.innerHTML = `
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Analyzing your farm conditions...</p>
        </div>
      `

      // Clear previous details
      cropDetails.innerHTML = ""

      // Simulate API call with timeout
      setTimeout(() => {
        // Generate crop recommendations based on inputs
        const recommendedCrops = getCropRecommendations(
          soilType,
          phLevel,
          temperature,
          rainfall,
          nitrogen,
          phosphorus,
          potassium,
          humidity,
        )

        // Display results
        displayCropResults(recommendedCrops)
      }, 2000)
    })

    // Function to get crop recommendations based on inputs
    function getCropRecommendations(
      soilType,
      phLevel,
      temperature,
      rainfall,
      nitrogen,
      phosphorus,
      potassium,
      humidity,
    ) {
      // Sample crop database with requirements
      const cropDatabase = [
        {
          name: "Rice",
          image: "images/crops/rice.jpg",
          soilTypes: ["clay", "loamy"],
          phRange: { min: 5.5, max: 6.5 },
          tempRange: { min: 20, max: 35 },
          rainfallRange: { min: 1000, max: 2000 },
          nitrogenRange: { min: 120, max: 350 },
          phosphorusRange: { min: 10, max: 30 },
          potassiumRange: { min: 100, max: 200 },
          humidityRange: { min: 60, max: 80 },
          growthPeriod: "3-6 months",
          profitPotential: "Medium-High",
          waterRequirement: "High",
          description:
            "Rice is the seed of the grass species Oryza sativa. As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population. It thrives in water-logged conditions.",
        },
        {
          name: "Maize",
          image: "images/crops/Maize.jpg",
          soilTypes: ["loamy", "sandy"],
          phRange: { min: 5.8, max: 7.0 },
          tempRange: { min: 18, max: 30 },
          rainfallRange: { min: 500, max: 1200 },
          nitrogenRange: { min: 150, max: 400 },
          phosphorusRange: { min: 10, max: 40 },
          potassiumRange: { min: 80, max: 250 },
          humidityRange: { min: 50, max: 70 },
          growthPeriod: "3-5 months",
          profitPotential: "Medium-High",
          waterRequirement: "Medium",
          description:
            "Corn is a cereal grain first domesticated by indigenous peoples in southern Mexico. It has become a staple food in many parts of the world, with total production surpassing that of wheat or rice.",
        },
        {
          name: "Chickpea",
          image: "images/crops/chickpea.png",
          soilTypes: ["sandy loam", "clay loam", "loamy"],
          phRange: { min: 6.0, max: 8.0 },
          tempRange: { min: 15, max: 35 },
          rainfallRange: { min: 600, max: 1000 },
          nitrogenRange: { min: 50, max: 200 },
          phosphorusRange: { min: 10, max: 30 },
          potassiumRange: { min: 80, max: 200 },
          humidityRange: { min: 40, max: 70 },
          growthPeriod: "3-4 months",
          profitPotential: "Medium",
          waterRequirement: "Low-Medium",
          description:
            "Chickpeas are a nutrient-dense legume high in protein and fiber. They improve soil fertility by fixing nitrogen. They are drought-tolerant and well-suited for semi-arid regions.",
        },
        {
          name: "Kidney Beans",
          image: "images/crops/kidneybeans.jpg",
          soilTypes: ["loamy", "sandy loam"],
          phRange: { min: 6.0, max: 7.5 },
          tempRange: { min: 18, max: 30 },
          rainfallRange: { min: 600, max: 1200 },
          nitrogenRange: { min: 80, max: 250 },
          phosphorusRange: { min: 10, max: 30 },
          potassiumRange: { min: 100, max: 250 },
          humidityRange: { min: 50, max: 70 },
          growthPeriod: "3-4 months",
          profitPotential: "Medium",
          waterRequirement: "Medium",
          description:
            "Kidney beans are a variety of the common bean. They are named for their visual resemblance to kidneys. These beans are an excellent source of protein, fiber, and various vitamins and minerals.",
        },
        {
          name: "Wheat",
          image: "images/crops/wheat.jpg",
          soilTypes: ["loamy", "clay", "sandy"],
          phRange: { min: 6.0, max: 7.5 },
          tempRange: { min: 15, max: 25 },
          rainfallRange: { min: 500, max: 1200 },
          nitrogenRange: { min: 100, max: 350 },
          phosphorusRange: { min: 10, max: 30 },
          potassiumRange: { min: 100, max: 250 },
          humidityRange: { min: 40, max: 70 },
          growthPeriod: "4-5 months",
          profitPotential: "Medium",
          waterRequirement: "Medium",
          description:
            "Wheat is a grass widely cultivated for its seed, a cereal grain that is a worldwide staple food. It requires moderate water and is adaptable to various soil conditions.",
        },
        {
          name: "Soybeans",
          image: "images/crops/soybeans.jpg",
          soilTypes: ["loamy", "clay"],
          phRange: { min: 6.0, max: 7.0 },
          tempRange: { min: 20, max: 30 },
          rainfallRange: { min: 500, max: 900 },
          nitrogenRange: { min: 50, max: 200 },
          phosphorusRange: { min: 10, max: 30 },
          potassiumRange: { min: 100, max: 250 },
          humidityRange: { min: 50, max: 70 },
          growthPeriod: "3-5 months",
          profitPotential: "High",
          waterRequirement: "Medium",
          description:
            "Soybeans are a species of legume native to East Asia. They are an important source of protein and oil. Soybeans are also used in various non-food products such as biodiesel.",
        },
        {
          name: "Cotton",
          image: "images/crops/cotton.jpg",
          soilTypes: ["loamy", "sandy", "clay"],
          phRange: { min: 5.5, max: 8.0 },
          tempRange: { min: 20, max: 35 },
          rainfallRange: { min: 600, max: 1200 },
          nitrogenRange: { min: 150, max: 400 },
          phosphorusRange: { min: 10, max: 40 },
          potassiumRange: { min: 120, max: 300 },
          humidityRange: { min: 50, max: 80 },
          growthPeriod: "5-6 months",
          profitPotential: "High",
          waterRequirement: "Medium-High",
          description:
            "Cotton is a soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants. It is a major cash crop and one of the most important fibers in textile production.",
        },
        {
          name: "Potatoes",
          image: "images/crops/potatoes.jpg",
          soilTypes: ["loamy", "sandy"],
          phRange: { min: 5.0, max: 6.5 },
          tempRange: { min: 15, max: 25 },
          rainfallRange: { min: 500, max: 700 },
          nitrogenRange: { min: 100, max: 300 },
          phosphorusRange: { min: 15, max: 40 },
          potassiumRange: { min: 150, max: 300 },
          humidityRange: { min: 50, max: 70 },
          growthPeriod: "3-4 months",
          profitPotential: "Medium",
          waterRequirement: "Medium",
          description:
            "The potato is a starchy tuber of the plant Solanum tuberosum. It is the world's fourth-largest food crop, following maize, wheat, and rice. Potatoes are relatively easy to grow and high-yielding.",
        },
      ]

      // Filter crops based on input parameters
      const suitableCrops = cropDatabase.filter((crop) => {
        // Check soil type compatibility
        const soilCompatible = crop.soilTypes.some((s) => soilType.includes(s) || s.includes(soilType))

        // Check pH compatibility
        const phCompatible = phLevel >= crop.phRange.min && phLevel <= crop.phRange.max

        // Check temperature compatibility
        const tempCompatible = temperature >= crop.tempRange.min && temperature <= crop.tempRange.max

        // Check rainfall compatibility
        const rainfallCompatible = rainfall >= crop.rainfallRange.min && rainfall <= crop.rainfallRange.max

        // Check nutrient compatibility (if available)
        let nutrientCompatible = true
        if (crop.nitrogenRange && crop.phosphorusRange && crop.potassiumRange) {
          const nCompatible = nitrogen >= crop.nitrogenRange.min && nitrogen <= crop.nitrogenRange.max
          const pCompatible = phosphorus >= crop.phosphorusRange.min && phosphorus <= crop.phosphorusRange.max
          const kCompatible = potassium >= crop.potassiumRange.min && potassium <= crop.potassiumRange.max
          nutrientCompatible = nCompatible && pCompatible && kCompatible
        }

        // Check humidity compatibility (if available)
        let humidityCompatible = true
        if (crop.humidityRange) {
          humidityCompatible = humidity >= crop.humidityRange.min && humidity <= crop.humidityRange.max
        }

        return (
          soilCompatible &&
          phCompatible &&
          tempCompatible &&
          rainfallCompatible &&
          nutrientCompatible &&
          humidityCompatible
        )
      })

      // Calculate suitability score for each crop
      suitableCrops.forEach((crop) => {
        let score = 0

        // Soil type match
        score += 15

        // pH optimality (higher score if pH is in the middle of the range)
        const phMidpoint = (crop.phRange.min + crop.phRange.max) / 2
        const phDistance = Math.abs(phLevel - phMidpoint)
        const phRange = crop.phRange.max - crop.phRange.min
        const phScore = 15 * (1 - phDistance / phRange)
        score += phScore

        // Temperature optimality
        const tempMidpoint = (crop.tempRange.min + crop.tempRange.max) / 2
        const tempDistance = Math.abs(temperature - tempMidpoint)
        const tempRange = crop.tempRange.max - crop.tempRange.min
        const tempScore = 15 * (1 - tempDistance / tempRange)
        score += tempScore

        // Rainfall optimality
        const rainfallMidpoint = (crop.rainfallRange.min + crop.rainfallRange.max) / 2
        const rainfallDistance = Math.abs(rainfall - rainfallMidpoint)
        const rainfallRange = crop.rainfallRange.max - crop.rainfallRange.min
        const rainfallScore = 15 * (1 - rainfallDistance / rainfallRange)
        score += rainfallScore

        // Nutrient optimality (if available)
        if (crop.nitrogenRange && crop.phosphorusRange && crop.potassiumRange) {
          // Nitrogen
          const nMidpoint = (crop.nitrogenRange.min + crop.nitrogenRange.max) / 2
          const nDistance = Math.abs(nitrogen - nMidpoint)
          const nRange = crop.nitrogenRange.max - crop.nitrogenRange.min
          const nScore = 10 * (1 - nDistance / nRange)

          // Phosphorus
          const pMidpoint = (crop.phosphorusRange.min + crop.phosphorusRange.max) / 2
          const pDistance = Math.abs(phosphorus - pMidpoint)
          const pRange = crop.phosphorusRange.max - crop.phosphorusRange.min
          const pScore = 10 * (1 - pDistance / pRange)

          // Potassium
          const kMidpoint = (crop.potassiumRange.min + crop.potassiumRange.max) / 2
          const kDistance = Math.abs(potassium - kMidpoint)
          const kRange = crop.potassiumRange.max - crop.potassiumRange.min
          const kScore = 10 * (1 - kDistance / kRange)

          score += (nScore + pScore + kScore) / 3
        }

        // Humidity optimality (if available)
        if (crop.humidityRange) {
          const hMidpoint = (crop.humidityRange.min + crop.humidityRange.max) / 2
          const hDistance = Math.abs(humidity - hMidpoint)
          const hRange = crop.humidityRange.max - crop.humidityRange.min
          const hScore = 10 * (1 - hDistance / hRange)
          score += hScore
        }

        // Add suitability score to crop object
        crop.suitabilityScore = Math.round(score)
      })

      // Sort by suitability score (highest first)
      return suitableCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    }

    // Function to display crop results
    function displayCropResults(crops) {
      if (crops.length === 0) {
        cropResults.innerHTML = `
          <div class="no-results">
            <i class="fas fa-exclamation-circle"></i>
            <p>No suitable crops found for your conditions. Try adjusting your parameters.</p>
          </div>
        `
        return
      }

      // Create results HTML
      let resultsHTML = `<div class="crop-list">`

      crops.forEach((crop) => {
        resultsHTML += `
          <div class="crop-item" data-crop='${JSON.stringify(crop)}'>
            <div class="crop-image">
              <img src="${crop.image}" alt="${crop.name}">
            </div>
            <div class="crop-info">
              <h4>${crop.name}</h4>
              <div class="suitability-meter">
                <div class="suitability-bar" style="width: ${crop.suitabilityScore}%"></div>
                <span>${crop.suitabilityScore}% Match</span>
              </div>
            </div>
          </div>
        `
      })

      resultsHTML += `</div>`

      // Update results container
      cropResults.innerHTML = resultsHTML

      // Add click event to crop items
      const cropItems = document.querySelectorAll(".crop-item")
      cropItems.forEach((item) => {
        item.addEventListener("click", function () {
          const cropData = JSON.parse(this.getAttribute("data-crop"))
          displayCropDetails(cropData)

          // Highlight selected crop
          cropItems.forEach((i) => i.classList.remove("selected"))
          this.classList.add("selected")
        })
      })

      // Show details for first crop by default
      if (cropItems.length > 0) {
        cropItems[0].click()
      }
    }

    // Function to display crop details
    function displayCropDetails(crop) {
      const detailsHTML = `
        <h3>${crop.name} Details</h3>
        <div class="crop-detail-content">
          <div class="crop-detail-image">
            <img src="${crop.image}" alt="${crop.name}">
          </div>
          <div class="crop-detail-info">
            <p class="crop-description">${crop.description}</p>
            <div class="crop-specs">
              <div class="crop-spec">
                <i class="fas fa-thermometer-half"></i>
                <span>Temperature: ${crop.tempRange.min}°C - ${crop.tempRange.max}°C</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-tint"></i>
                <span>Rainfall: ${crop.rainfallRange.min} - ${crop.rainfallRange.max} mm</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-flask"></i>
                <span>pH Level: ${crop.phRange.min} - ${crop.phRange.max}</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-mountain"></i>
                <span>Soil Types: ${crop.soilTypes.join(", ")}</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-calendar-alt"></i>
                <span>Growth Period: ${crop.growthPeriod}</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-coins"></i>
                <span>Profit Potential: ${crop.profitPotential}</span>
              </div>
              <div class="crop-spec">
                <i class="fas fa-water"></i>
                <span>Water Requirement: ${crop.waterRequirement}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="crop-actions">
          <button class="btn btn-tool crop-action-btn">
            <i class="fas fa-file-pdf"></i> Download Report
          </button>
          <button class="btn btn-tool crop-action-btn">
            <i class="fas fa-calendar-plus"></i> Create Planting Schedule
          </button>
        </div>
      `

      cropDetails.innerHTML = detailsHTML

      // Add event listeners to action buttons
      const actionButtons = cropDetails.querySelectorAll(".crop-action-btn")
      actionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          showAlert("Feature coming soon!", "info")
        })
      })
    }

    // Function to show alerts
    function showAlert(message, type) {
      // Create alert element
      const alertElement = document.createElement("div")
      alertElement.className = `alert alert-${type}`
      alertElement.innerHTML = `
        <span class="alert-message">${message}</span>
        <span class="alert-close">&times;</span>
      `

      // Add to page
      document.body.appendChild(alertElement)

      // Show alert
      setTimeout(() => {
        alertElement.classList.add("show")
      }, 10)

      // Auto-hide after 5 seconds
      setTimeout(() => {
        alertElement.classList.remove("show")
        setTimeout(() => {
          alertElement.remove()
        }, 300)
      }, 5000)

      // Close button functionality
      const closeBtn = alertElement.querySelector(".alert-close")
      closeBtn.addEventListener("click", () => {
        alertElement.classList.remove("show")
        setTimeout(() => {
          alertElement.remove()
        }, 300)
      })
    }
  }
})

