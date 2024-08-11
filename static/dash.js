// Remove the immediate return statement
// if (window.chartInitialized) return;
// Instead, wrap the entire script in a function

(function() {
    if (window.financeDashboardExecuted) {
        console.log('Finance dashboard script already executed, skipping');
        return;
    }
    window.financeDashboardExecuted = true;

    console.log('Finance dashboard script started');
    document.addEventListener('DOMContentLoaded', function() {
        // Load data from localStorage
        loadData();

        // Set up form submission handler
        const form = document.getElementById('financialForm');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }

        // Initialize charts only if we're on the dashboard page
        setTimeout(function() {
            if (document.getElementById('myChart')) {
                initializeCharts();
                initializeDonutChart(); 
            }
        }, 100);  

        console.log('DOM loaded');
    });

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        // Ensure all values are numbers
        for (let key in data) {
            data[key] = parseFloat(data[key]) || 0;
        }
        
        // Save to localStorage
        localStorage.setItem('financialData', JSON.stringify(data));
        
        console.log('Data saved:', data);  // Add this line for debugging
    
        // Redirect to dashboard
        window.location.href = '/dashboard'
    }
    
    function loadData() {
        const data = JSON.parse(localStorage.getItem('financialData') || '{}');
        console.log('Loaded data:', data);
        // Update dashboard elements if they exist
        const balanceAmount = document.getElementById('balanceAmount');
        if (balanceAmount) balanceAmount.textContent = `$${parseFloat(data.monthlyIncome || 0).toFixed(2)}`;
        
        const netWorthValue = document.getElementById('netWorthValue');
        if (netWorthValue) netWorthValue.textContent = `$${parseFloat(data.netWorth || 0).toFixed(2)}`;
        
        const spendingsValue = document.getElementById('spendingsValue');
        if (spendingsValue) spendingsValue.textContent = `$${parseFloat(data.monthlyExpenses || 0).toFixed(2)}`;
        
        const incomeValue = document.getElementById('incomeValue');
        if (incomeValue) incomeValue.textContent = `$${parseFloat(data.monthlyIncome || 0).toFixed(2)}`;
        
        // Update charts only if we're on the dashboard page
        if (document.getElementById('myChart')) {
            updateCharts(data);
        }
    }
    
    function initializeCharts() {
        console.log('Initializing charts');
    const ctx = document.getElementById('myChart');
    if (!ctx) {
        console.error('Chart canvas not found');
        return;
    }
    
    if (window.incomeExpensesChart) {
        window.incomeExpensesChart.destroy();
    }
    
    window.incomeExpensesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Income',
                    data: [],
                    borderColor: '#4CAF50',
                }, {
                    label: 'Expenses',
                    data: [],
                    borderColor: '#FF5722',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Income vs Expenses'
                    }
                },
            }
        });
    }
    
    function updateCharts(data) {
        if (window.incomeExpensesChart) {
            // Update income vs expenses chart
            const monthlyIncome = parseFloat(data.monthlyIncome || 0);
            const monthlyExpenses = parseFloat(data.monthlyExpenses || 0);
    
            window.incomeExpensesChart.data.datasets[0].data = Array(6).fill(monthlyIncome);
            window.incomeExpensesChart.data.datasets[1].data = Array(6).fill(monthlyExpenses);
            window.incomeExpensesChart.update();
        }
    
        // Update donut chart
        updateDonutChart(data);
    }
    
    function initializeDonutChart() {
        const donutChart = document.getElementById('donutchart');
        if (donutChart && typeof google !== 'undefined' && google.charts) {
            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(function() {
                updateDonutChart({}); // Call with default data
            });
        } else {
            console.error('Google Charts not available');
        }
    }
    
    function updateDonutChart(data) {
        const donutChart = document.getElementById('donutchart');
        if (donutChart) {
            const income = parseFloat(data.monthlyIncome || 0);
            const expenses = parseFloat(data.monthlyExpenses || 0);
            const savings = parseFloat(data.monthlySavings || 0);
    
            var chartData = google.visualization.arrayToDataTable([
                ['Category', 'Amount'],
                ['Income', income],
                ['Expenses', expenses],
                ['Savings', savings]
            ]);
    
            var options = {
                pieHole: 0.4,
                backgroundColor: 'transparent',
                colors: ['#4CAF50', '#FF5722', '#2196F3'],
                legend: 'none'
            };
    
            var chart = new google.visualization.PieChart(donutChart);
            chart.draw(chartData, options);
        }
    }
    

    
})(); // Immediately invoke the function

