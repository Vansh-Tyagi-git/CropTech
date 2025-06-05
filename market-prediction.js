// Market Prediction JavaScript

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize charts
    initializeCharts();
    
    // Set up filter controls
    setupFilters();
    
    // Set up tab switching for analysis
    setupAnalysisTabs();
    
    // Set up mobile menu
    setupMobileMenu();
});

// Function to initialize all charts
function initializeCharts() {
    // Create crop price charts
    createCropChart('wheat-chart', 'Wheat', '#4CAF50');
    createCropChart('rice-chart', 'Rice', '#2196F3');
    createCropChart('corn-chart', 'Corn', '#FF9800');
    createCropChart('soybeans-chart', 'Soybeans', '#9C27B0');
    
    // Create analysis charts
    createPriceForecastChart();
    createDemandTrendsChart();
    createSupplyChainChart();
}

// Function to create a crop price chart
function createCropChart(canvasId, cropName, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Generate random data for the chart
    const data = generateRandomData(30, 5, 15);
    
    // Create gradient for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, `${color}33`); // 20% opacity
    gradient.addColorStop(1, `${color}00`); // 0% opacity
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            datasets: [{
                label: `${cropName} Price`,
                data: data,
                borderColor: color,
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false,
                    min: Math.min(...data) - 1,
                    max: Math.max(...data) + 1
                }
            }
        }
    });
}

// Function to create the price forecast chart
function createPriceForecastChart() {
    const ctx = document.getElementById('price-forecast-chart').getContext('2d');
    
    // Generate data for multiple crops
    const wheatData = generateRandomData(12, 6, 8);
    const riceData = generateRandomData(12, 12, 16);
    const cornData = generateRandomData(12, 5, 7);
    const soybeansData = generateRandomData(12, 12, 15);
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Wheat',
                    data: wheatData,
                    borderColor: '#4CAF50',
                    backgroundColor: '#4CAF5033',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Rice',
                    data: riceData,
                    borderColor: '#2196F3',
                    backgroundColor: '#2196F333',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Corn',
                    data: cornData,
                    borderColor: '#FF9800',
                    backgroundColor: '#FF980033',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Soybeans',
                    data: soybeansData,
                    borderColor: '#9C27B0',
                    backgroundColor: '#9C27B033',
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Price Forecast (USD per bushel)',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}

// Function to create the demand trends chart
function createDemandTrendsChart() {
    const ctx = document.getElementById('demand-trends-chart').getContext('2d');
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'],
            datasets: [
                {
                    label: 'Current Demand',
                    data: [65, 80, 75, 60, 45],
                    backgroundColor: '#4CAF5099',
                    borderColor: '#4CAF50',
                    borderWidth: 1
                },
                {
                    label: 'Projected Demand (Next Quarter)',
                    data: [70, 82, 85, 65, 48],
                    backgroundColor: '#2196F399',
                    borderColor: '#2196F3',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Demand Trends by Crop',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Demand Index'
                    }
                }
            }
        }
    });
}

// Function to create the supply chain chart
function createSupplyChainChart() {
    const ctx = document.getElementById('supply-chain-chart').getContext('2d');
    
    // Create the chart
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Transportation',
                'Storage',
                'Processing',
                'Distribution',
                'Retail',
                'Export'
            ],
            datasets: [
                {
                    label: 'Current Efficiency',
                    data: [65, 75, 70, 80, 60, 55],
                    backgroundColor: '#4CAF5033',
                    borderColor: '#4CAF50',
                    borderWidth: 2,
                    pointBackgroundColor: '#4CAF50'
                },
                {
                    label: 'Projected Efficiency (Next Quarter)',
                    data: [70, 80, 75, 85, 65, 60],
                    backgroundColor: '#2196F333',
                    borderColor: '#2196F3',
                    borderWidth: 2,
                    pointBackgroundColor: '#2196F3'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Supply Chain Efficiency',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

// Function to set up filter controls
function setupFilters() {
    // Crop filter
    const cropFilter = document.getElementById('crop-filter');
    cropFilter.addEventListener('change', updateMarketData);
    
    // Time filter
    const timeFilter = document.getElementById('time-filter');
    timeFilter.addEventListener('change', updateMarketData);
    
    // Refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        
        setTimeout(() => {
            updateMarketData();
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }, 1000);
    });
}

// Function to update market data based on filters
function updateMarketData() {
    // In a real application, you would fetch new data based on the filters
    // For this demo, we'll just simulate data updates
    
    // Get filter values
    const cropFilter = document.getElementById('crop-filter').value;
    const timeFilter = document.getElementById('time-filter').value;
    
    console.log(`Updating market data for crop: ${cropFilter}, time period: ${timeFilter}`);
    
    // Update price changes
    updatePriceChanges();
    
    // Reinitialize charts with new data
    initializeCharts();
    
    // Update insights
    updateInsights();
}

// Function to update price changes
function updatePriceChanges() {
    const priceChanges = document.querySelectorAll('.price-change');
    
    priceChanges.forEach(change => {
        // Generate random price change between -3% and +5%
        const changeValue = (Math.random() * 8 - 3).toFixed(1);
        const isUp = changeValue > 0;
        
        // Update class and icon
        change.className = `price-change ${isUp ? 'up' : 'down'}`;
        change.innerHTML = `<i class="fas fa-arrow-${isUp ? 'up' : 'down'}"></i> ${Math.abs(changeValue)}%`;
    });
}

// Function to update insights
function updateInsights() {
    // Update price insights
    const priceInsights = [
        "Wheat prices expected to rise by 5% in the next month due to reduced global supply.",
        "Rice prices likely to stabilize after recent fluctuations.",
        "Corn showing strong upward trend due to increased ethanol demand.",
        "Soybeans expected to maintain steady growth over the next quarter.",
        "Cotton prices may decline slightly due to increased production in key regions.",
        "Global grain markets showing resilience despite supply chain challenges."
    ];
    
    updateInsightsList('price-insights', priceInsights, 4);
    
    // Update demand insights
    const demandInsights = [
        "Growing demand for organic crops across all categories.",
        "Export demand increasing for wheat and soybeans.",
        "Industrial demand for corn rising due to biofuel production.",
        "Domestic consumption of rice remains stable with slight growth.",
        "Plant-based protein demand driving soybean market growth.",
        "Emerging markets showing increased demand for premium crop varieties."
    ];
    
    updateInsightsList('demand-insights', demandInsights, 4);
    
    // Update supply insights
    const supplyInsights = [
        "Transportation costs expected to increase by 3% next quarter.",
        "Storage capacity utilization at 78% nationwide.",
        "Port congestion improving, reducing export delays.",
        "Seed availability good for next planting season.",
        "Fuel price increases may impact distribution costs.",
        "Labor shortages affecting harvest efficiency in some regions."
    ];
    
    updateInsightsList('supply-insights', supplyInsights, 4);
}

// Function to update insights list
function updateInsightsList(listId, insights, count) {
    const insightsList = document.getElementById(listId);
    insightsList.innerHTML = "";
    
    // Randomly select insights
    const selectedInsights = [];
    while (selectedInsights.length < count) {
        const randomIndex = Math.floor(Math.random() * insights.length);
        const insight = insights[randomIndex];
        
        if (!selectedInsights.includes(insight)) {
            selectedInsights.push(insight);
        }
    }
    
    // Add insights to the list
    selectedInsights.forEach(insight => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-chart-line"></i> ${insight}`;
        insightsList.appendChild(li);
    });
}

// Function to set up analysis tabs
function setupAnalysisTabs() {
    const analysisTabs = document.querySelectorAll('.analysis-tab');
    const analysisContents = document.querySelectorAll('.analysis-content');
    
    analysisTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            analysisTabs.forEach(t => t.classList.remove('active'));
            analysisContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Function to set up mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Helper function to generate random data for charts
function generateRandomData(length, min, max) {
    return Array.from({ length }, () => Math.random() * (max - min) + min);
}