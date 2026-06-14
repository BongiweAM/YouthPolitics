// Initialize all charts for the economy page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('economy.html')) {
        initializeEconomyCharts();
        setupChartInteractivity();
        updateChartData();
    }
});

function initializeEconomyCharts() {
    // Unemployment Chart
    const unemploymentCtx = document.getElementById('unemploymentChart').getContext('2d');
    window.unemploymentChart = new Chart(unemploymentCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Youth Unemployment Rate (%)',
                data: [55.2, 63.3, 66.5, 63.9, 61.4, 59.7],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
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
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 70,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            }
        }
    });

    // Inflation vs Interest Chart
    const inflationCtx = document.getElementById('inflationChart').getContext('2d');
    window.inflationChart = new Chart(inflationCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Inflation Rate (%)',
                data: [5.3, 5.6, 5.9, 5.9, 5.2, 4.6, 4.6, 4.8, 5.1, 5.9, 5.9, 5.9],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                fill: true
            }, {
                label: 'Interest Rate (%)',
                data: [8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25, 8.25],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3,
                    max: 9,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            }
        }
    });

    // GDP Growth Chart
    const gdpCtx = document.getElementById('gdpChart').getContext('2d');
    window.gdpChart = new Chart(gdpCtx, {
        type: 'bar',
        data: {
            labels: ['Agriculture', 'Mining', 'Manufacturing', 'Services', 'Finance', 'Government'],
            datasets: [{
                label: 'Growth Rate (%)',
                data: [2.1, -3.2, -1.8, 1.2, 0.8, 0.5],
                backgroundColor: [
                    '#27ae60', '#e74c3c', '#e67e22', '#3498db', '#9b59b6', '#34495e'
                ],
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: -4,
                    max: 3,
                    title: {
                        display: true,
                        text: 'Growth Rate (%)'
                    }
                }
            }
        }
    });

    // Government Spending Chart
    const spendingCtx = document.getElementById('spendingChart').getContext('2d');
    window.spendingChart = new Chart(spendingCtx, {
        type: 'doughnut',
        data: {
            labels: ['Education', 'Health', 'Social Protection', 'Defense', 'Infrastructure', 'Other'],
            datasets: [{
                data: [20.1, 13.2, 15.8, 3.4, 8.9, 38.6],
                backgroundColor: [
                    '#3498db', '#e74c3c', '#f39c12', '#95a5a6', '#27ae60', '#9b59b6'
                ],
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% of budget`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

function setupChartInteractivity() {
    // Add chart tooltip enhancements
    document.querySelectorAll('.chart-container').forEach(container => {
        const canvas = container.querySelector('canvas');
        const title = container.querySelector('h3');
        
        // Add hover effect
        container.addEventListener('mouseenter', () => {
            title.style.transform = 'translateY(-3px)';
            title.style.color = '#667eea';
        });
        
        container.addEventListener('mouseleave', () => {
            title.style.transform = 'translateY(0)';
            title.style.color = '';
        });
        
        // Add download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'chart-download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
        downloadBtn.title = 'Download chart';
        downloadBtn.addEventListener('click', () => downloadChart(canvas));
        container.appendChild(downloadBtn);
    });
}

function downloadChart(canvas) {
    const link = document.createElement('a');
    link.download = 'youthpolitics-chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function updateChartData() {
    // Simulate real-time data updates
    setInterval(() => {
        if (window.unemploymentChart) {
            const data = window.unemploymentChart.data.datasets[0].data;
            const lastValue = data[data.length - 1];
            const newValue = Math.max(58, Math.min(62, lastValue + (Math.random() - 0.5) * 0.2));
            data[data.length - 1] = newValue;
            window.unemploymentChart.update('none');
        }
        
        if (window.inflationChart) {
            const inflationData = window.inflationChart.data.datasets[0].data;
            const lastInflation = inflationData[inflationData.length - 1];
            inflationData[inflationData.length - 1] = Math.max(5.7, Math.min(6.1, lastInflation + (Math.random() - 0.5) * 0.1));
            window.inflationChart.update('none');
        }
    }, 30000);
}

// Export chart data for other uses
window.getChartData = function(chartName) {
    const charts = {
        unemployment: window.unemploymentChart?.data,
        inflation: window.inflationChart?.data,
        gdp: window.gdpChart?.data,
        spending: window.spendingChart?.data
    };
    return charts[chartName];
};