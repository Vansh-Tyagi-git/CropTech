// Charts JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Field Chart
    const fieldChart = document.querySelector('.field-chart');
    
    if (fieldChart) {
        // Sample data for field chart
        const fieldData = [
            ['ready', 'ready', 'planted', 'empty'],
            ['ready', 'planted', 'planted', 'empty'],
            ['planted', 'planted', 'empty', 'empty'],
            ['planted', 'empty', 'empty', 'empty'],
            ['ready', 'ready', 'planted', 'planted']
        ];
        
        // Colors for different statuses
        const statusColors = {
            'ready': '#4caf50',
            'planted': '#ff9800',
            'empty': '#e0e0e0'
        };
        
        // Create field cells
        fieldData.forEach((row, rowIndex) => {
            row.forEach((status, colIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('field-cell', 'animate-cell');
                cell.style.backgroundColor = statusColors[status];
                cell.style.opacity = '0';
                cell.style.animationDelay = `${(rowIndex * 4 + colIndex) * 0.05}s`;
                fieldChart.appendChild(cell);
            });
        });
        
        // Trigger animation after a delay
        setTimeout(() => {
            const cells = fieldChart.querySelectorAll('.field-cell');
            cells.forEach(cell => {
                cell.style.opacity = '1';
            });
        }, 500);
    }
    
    // Bar Chart
    const barChart = document.querySelector('.bar-chart');
    
    if (barChart) {
        // Sample data for bar chart
        const barData = [
            { label: 'Jan', value: 65 },
            { label: 'Feb', value: 85 },
            { label: 'Mar', value: 40 },
            { label: 'Apr', value: 55 },
            { label: 'May', value: 75 }
        ];
        
        // Create bars
        barData.forEach((item, index) => {
            const bar = document.createElement('div');
            bar.classList.add('bar', 'animate-bar');
            bar.style.height = '0';
            bar.style.setProperty('--target-height', `${item.value}%`);
            bar.style.animationDelay = `${index * 0.1}s`;
            
            const label = document.createElement('div');
            label.classList.add('bar-label');
            label.textContent = item.label;
            
            bar.appendChild(label);
            barChart.appendChild(bar);
        });
        
        // Trigger animation after a delay
        setTimeout(() => {
            const bars = barChart.querySelectorAll('.bar');
            bars.forEach(bar => {
                const targetHeight = bar.style.getPropertyValue('--target-height');
                bar.style.height = targetHeight;
            });
        }, 500);
    }
    
    // Gauge Chart
    const gaugeChart = document.querySelector('.gauge-chart');
    
    if (gaugeChart) {
        // Create SVG for gauge
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 100 50");
        
        // Background arc
        const backgroundArc = document.createElementNS(svgNS, "path");
        backgroundArc.setAttribute("d", "M10,50 A40,40 0 1,1 90,50");
        backgroundArc.setAttribute("fill", "none");
        backgroundArc.setAttribute("stroke", "#e0e0e0");
        backgroundArc.setAttribute("stroke-width", "5");
        svg.appendChild(backgroundArc);
        
        // Value arc
        const valueArc = document.createElementNS(svgNS, "path");
        valueArc.setAttribute("d", "M10,50 A40,40 0 1,1 90,50");
        valueArc.setAttribute("fill", "none");
        valueArc.setAttribute("stroke", "#4caf50");
        valueArc.setAttribute("stroke-width", "5");
        valueArc.setAttribute("stroke-dasharray", "0 100");
        valueArc.classList.add("animate-gauge");
        valueArc.style.setProperty('--target-value', '75');
        svg.appendChild(valueArc);
        
        // Add ticks
        for (let i = 0; i <= 10; i++) {
            const angle = -180 + (i * 18);
            const x1 = 50 + 38 * Math.cos(angle * Math.PI / 180);
            const y1 = 50 + 38 * Math.sin(angle * Math.PI / 180);
            const x2 = 50 + 42 * Math.cos(angle * Math.PI / 180);
            const y2 = 50 + 42 * Math.sin(angle * Math.PI / 180);
            
            const tick = document.createElementNS(svgNS, "line");
            tick.setAttribute("x1", x1);
            tick.setAttribute("y1", y1);
            tick.setAttribute("x2", x2);
            tick.setAttribute("y2", y2);
            tick.setAttribute("stroke", "#999");
            tick.setAttribute("stroke-width", "1");
            svg.appendChild(tick);
            
            if (i % 2 === 0) {
                const label = document.createElementNS(svgNS, "text");
                const labelX = 50 + 30 * Math.cos(angle * Math.PI / 180);
                const labelY = 50 + 30 * Math.sin(angle * Math.PI / 180);
                label.setAttribute("x", labelX);
                label.setAttribute("y", labelY);
                label.setAttribute("text-anchor", "middle");
                label.setAttribute("font-size", "6");
                label.setAttribute("fill", "#666");
                label.textContent = i * 200;
                svg.appendChild(label);
            }
        }
        
        gaugeChart.appendChild(svg);
        
        // Trigger animation after a delay
        setTimeout(() => {
            valueArc.style.strokeDasharray = "75 100";
        }, 500);
    }
});