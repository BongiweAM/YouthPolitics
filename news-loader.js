// news-loader.js - Load 2026 future news
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for data service to load
    await loadFutureNews();
    await loadPredictions();
    await setupDataFreshness();
    
    // Setup year filter buttons
    setupYearFilters();
    
    // Setup refresh button
    document.getElementById('refresh-data')?.addEventListener('click', refreshAllData);
});

async function loadFutureNews(year = 'all') {
    const container = document.getElementById('future-news-container');
    if (!container) return;
    
    // Show loading
    container.innerHTML = `
        <div class="data-loading">
            <div class="spinner"></div>
            <p>Loading future news from ${year}...</p>
        </div>
    `;
    
    try {
        // Get news from data service
        const news = await dataService.getNewsTimeline(year, 8);
        
        if (news.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-newspaper"></i>
                    <h3>No news available for ${year}</h3>
                    <p>Try selecting a different year</p>
                </div>
            `;
            return;
        }
        
        // Render news articles
        container.innerHTML = news.map(article => createNewsArticle(article)).join('');
        
    } catch (error) {
        console.error('Error loading future news:', error);
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading news</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
}

function createNewsArticle(article) {
    const year = new Date(article.date).getFullYear();
    const badgeClass = `badge-${year}`;
    const impactClass = `impact-${article.impact || 'medium'}`;
    
    return `
        <article class="future-article" data-year="${year}" data-category="${article.category}">
            <div class="future-badge ${badgeClass}">${year}</div>
            ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
            <div class="future-content">
                <div class="future-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(article.date)}
                </div>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <div class="impact-tag ${impactClass}">
                    ${getImpactText(article.impact)} Impact
                </div>
                <div class="article-tags">
                    ${article.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') || ''}
                </div>
            </div>
        </article>
    `;
}

async function loadPredictions() {
    const predictions = await dataService.getAIPredictions('economy');
    const economyList = document.getElementById('economy-predictions');
    const educationList = document.getElementById('education-predictions');
    const politicsList = document.getElementById('politics-predictions');
    
    if (economyList) {
        economyList.innerHTML = (await dataService.getAIPredictions('economy'))
            .map(pred => `<li>${pred}</li>`)
            .join('');
    }
    
    if (educationList) {
        educationList.innerHTML = (await dataService.getAIPredictions('education'))
            .map(pred => `<li>${pred}</li>`)
            .join('');
    }
    
    if (politicsList) {
        politicsList.innerHTML = (await dataService.getAIPredictions('politics'))
            .map(pred => `<li>${pred}</li>`)
            .join('');
    }
}

async function setupDataFreshness() {
    const freshness = dataService.getDataFreshness();
    
    const lastUpdated = document.getElementById('last-updated');
    const nextUpdate = document.getElementById('next-update');
    
    if (lastUpdated) {
        lastUpdated.textContent = new Date(freshness.lastUpdated).toLocaleString('en-ZA');
    }
    
    if (nextUpdate) {
        nextUpdate.textContent = freshness.nextUpdate;
    }
}

function setupYearFilters() {
    const buttons = document.querySelectorAll('.year-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', async function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected year
            const year = this.dataset.year;
            
            // Load news for selected year
            await loadFutureNews(year === 'all' ? null : parseInt(year));
        });
    });
}

async function refreshAllData() {
    const refreshBtn = document.getElementById('refresh-data');
    const originalText = refreshBtn.innerHTML;
    
    // Show loading state
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    try {
        // Clear cache
        dataService.clearCache();
        
        // Reload all data
        await Promise.all([
            loadFutureNews(),
            loadPredictions(),
            setupDataFreshness()
        ]);
        
        // Show success message
        refreshBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed!';
        setTimeout(() => {
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error refreshing data:', error);
        refreshBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        setTimeout(() => {
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
        }, 2000);
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getImpactText(impact) {
    const impacts = {
        'very-high': 'Very High',
        'high': 'High',
        'medium': 'Medium',
        'low': 'Low'
    };
    return impacts[impact] || 'Medium';
}

// Export for use in other files
window.newsLoader = {
    loadFutureNews,
    loadPredictions,
    refreshAllData
};