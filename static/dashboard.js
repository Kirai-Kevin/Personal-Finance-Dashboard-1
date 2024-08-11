document.addEventListener('DOMContentLoaded', function() {
    // Sample data - replace with real data from your backend
    let financialData = {
        income: [0, 0, 0, 0, 0],
        expenses: [0, 0, 0, 0, 0],
        savings: [0, 0, 0, 0, 0]
    };
    function updateSummaryCards() {
        const totalIncome = financialData.income.reduce((a, b) => a + b, 0);
        const totalExpenses = financialData.expenses.reduce((a, b) => a + b, 0);
        const netSavings = totalIncome - totalExpenses;

        document.getElementById('total-income').textContent = `$${totalIncome}`;
        document.getElementById('total-expenses').textContent = `$${totalExpenses}`;
        document.getElementById('net-savings').textContent = `$${netSavings}`;
    }
    function updateChart() {
        Highcharts.chart('income-expense-chart', {
            chart: { type: 'column' },
            title: { text: 'Income vs Expenses' },
            xAxis: {
                categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5']
            },
            yAxis: { title: { text: 'Amount ($)' } },
            series: [{
                name: 'Income',
                data: financialData.income
            }, {
                name: 'Expenses',
                data: financialData.expenses
            }, {
                name: 'Savings',
                data: financialData.savings,
                type: 'line'
            }]
        });
    }

    // Update summary cards
    // Create charts container
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'charts-container';
    chartsContainer.style.marginTop = '20px';
    
    const incomeExpenseChartDiv = document.createElement('div');
    incomeExpenseChartDiv.id = 'income-expense-chart';
    incomeExpenseChartDiv.style.width = '100%';
    incomeExpenseChartDiv.style.height = '400px';
    
    chartsContainer.appendChild(incomeExpenseChartDiv);
    document.querySelector('.charts').appendChild(chartsContainer);

    // Highcharts theme
    Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: '#101e32',
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#F0F0F3',
                    style: {
                        fontSize: '13px'
                    }
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            },
            title: {
                style: {
                    color: '#C0C0C0'
                }
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },
        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },
        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },
        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        }
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    // Create Income vs Expense chart
    Highcharts.chart('income-expense-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Income vs Expenses'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May']
        },
        yAxis: {
            title: {
                text: 'Amount ($)'
            }
        },
        series: [{
            name: 'Income',
            data: [4500, 5000, 4800, 5200, 5000]
        }, {
            name: 'Expenses',
            data: [3200, 3500, 3300, 3700, 3500]
        }, {
            name: 'Savings',
            data: [1300, 1500, 1500, 1500, 1500],
            type: 'line'
        }]
    });

    // Create Savings Goal chart
    

    // Create savings tips section
    const savingsTipsSection = document.createElement('div');
    savingsTipsSection.className = 'savings-tips';
    savingsTipsSection.innerHTML = `
        <h2>Savings Tips</h2>
        <ul>
            <li>Set up automatic transfers to your savings account</li>
            <li>Cut unnecessary expenses and redirect the money to savings</li>
            <li>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
            <li>Look for ways to increase your income and save the extra money</li>
            <li>Review and optimize your recurring bills and subscriptions</li>
        </ul>
    `;
    document.querySelector('.main').appendChild(savingsTipsSection);

    // Create savings calculator
    const savingsCalculator = document.createElement('div');
    savingsCalculator.className = 'savings-calculator';
    savingsCalculator.innerHTML = `
        <h2>Savings Calculator</h2>
        <form id="savings-calculator-form">
            <label for="initial-amount">Initial Amount ($):</label>
            <input type="number" id="initial-amount" required>
            <label for="monthly-contribution">Monthly Contribution ($):</label>
            <input type="number" id="monthly-contribution" required>
            <label for="interest-rate">Annual Interest Rate (%):</label>
            <input type="number" id="interest-rate" step="0.1" required>
            <label for="years">Number of Years:</label>
            <input type="number" id="years" required>
            <button type="submit">Calculate</button>
        </form>
        <div id="savings-result"></div>
    `;
    document.querySelector('.main').appendChild(savingsCalculator);

    // Add event listener for savings calculator
    document.getElementById('savings-calculator-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const initialAmount = parseFloat(document.getElementById('initial-amount').value);
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
        const years = parseInt(document.getElementById('years').value);
        const months = years * 12;

        let totalSavings = initialAmount;
        for (let i = 0; i < months; i++) {
            totalSavings += monthlyContribution;
            totalSavings *= (1 + interestRate);
        }

        document.getElementById('savings-result').innerHTML = `
            <h3>Projected Savings: $${totalSavings.toFixed(2)}</h3>
            <p>If you save $${monthlyContribution} every month for ${years} years, with an initial amount of $${initialAmount} and an annual interest rate of ${(interestRate * 12 * 100).toFixed(2)}%, you could have $${totalSavings.toFixed(2)}.</p>
        `;
    });
    document.getElementById('update-financial-data').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const month = new Date(document.getElementById('month').value).getMonth();
        const income = parseFloat(document.getElementById('income').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        
        // Update financial data
        financialData.income[month] = income;
        financialData.expenses[month] = expenses;
        financialData.savings[month] = income - expenses;

        // Update summary cards and chart
        updateSummaryCards();
        updateChart();
    });
});