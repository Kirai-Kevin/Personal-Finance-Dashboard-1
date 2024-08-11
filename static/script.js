document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('finance-form');
    const addExpenseButton = document.getElementById('add-expense');
    const expensesDiv = document.getElementById('expenses');
    const loadingSpinner = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    let expenseChart = null;
    let incomeExpenseChart = null;
    let savingsRateChart = null;

    addExpenseButton.addEventListener('click', function() {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <input type="text" placeholder="Expense category" required>
            <input type="number" placeholder="Amount" required>
            <button type="button" class="remove-expense">Remove</button>
        `;
        expensesDiv.insertBefore(expenseItem, addExpenseButton);
    });

    expensesDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-expense')) {
            e.target.parentElement.remove();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        loadingSpinner.style.display = 'block';
        resultsDiv.style.display = 'none';

        const income = parseFloat(document.getElementById('income').value);
        const savingsGoal = parseFloat(document.getElementById('savings-goal').value);
        const expenses = {};

        document.querySelectorAll('.expense-item').forEach(item => {
            const category = item.querySelector('input[type="text"]').value;
            const amount = parseFloat(item.querySelector('input[type="number"]').value);
            expenses[category] = amount;
        });

        fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({income, expenses, savings_goal: savingsGoal}),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('report').innerHTML = data;
            loadingSpinner.style.display = 'none';
            resultsDiv.style.display = 'block';
            generateCharts(income, expenses, savingsGoal);
        })
        .catch(error => {
            console.error('Error:', error);
            loadingSpinner.style.display = 'none';
            alert('An error occurred. Please try again.');
        });
    });

    function generateCharts(income, expenses, savingsGoal) {
        generateExpenseChart(expenses);
        generateIncomeExpenseChart(income, expenses);
        generateSavingsRateChart(income, expenses, savingsGoal);
    }

    function generateExpenseChart(expenses) {
        const ctx = document.getElementById('expense-chart').getContext('2d');
        const labels = Object.keys(expenses);
        const data = Object.values(expenses);

        if (expenseChart) {
            expenseChart.destroy();
        }

        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#2c5282', '#3182ce', '#4299e1', '#63b3ed', '#90cdf4',
                        '#1a365d', '#2a4365', '#2c5282', '#2b6cb0', '#3182ce'
                    ],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }

    function generateIncomeExpenseChart(income, expenses) {
        const ctx = document.getElementById('income-expense-chart').getContext('2d');
        const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);

        if (incomeExpenseChart) {
            incomeExpenseChart.destroy();
        }

        incomeExpenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [income, totalExpenses],
                    backgroundColor: ['#2c5282', '#c53030']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function generateSavingsRateChart(income, expenses, savingsGoal) {
        const ctx = document.getElementById('savings-rate-chart').getContext('2d');
        const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
        const actualSavings = income - totalExpenses;
        const savingsRate = (actualSavings / income) * 100;

        if (savingsRateChart) {
            savingsRateChart.destroy();
        }

        savingsRateChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Savings', 'Expenses'],
                datasets: [{
                    data: [actualSavings, totalExpenses],
                    backgroundColor: ['#2c5282', '#c53030']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Savings Rate: ${savingsRate.toFixed(2)}%`
                    }
                }
            }
        });
    }
});