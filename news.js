



const newsContainer = document.getElementById("newsContainer");

async function details(category) {
    const url = `/api/news?category=${category}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            console.error("API Error:", data.message);
            newsContainer.innerHTML = `<p class="error-msg">Error: ${data.message || "Failed to fetch news"}</p>`;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        newsContainer.innerHTML = `<p class="error-msg">Network error occurred.</p>`;
    }
}



function displayNews(articles) {
    newsContainer.innerHTML = ""

    if (!articles || !Array.isArray(articles)) {
        newsContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const div = document.createElement("div")
        div.classList.add("news-card")

        div.innerHTML = `
            <img src="${article.urlToImage}" />
            <h3>${article.title}</h3>
            <p>${article.description}</p>

        `;

        newsContainer.appendChild(div)
    });
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const url = `/api/news?query=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = `<p class="error-msg">Error fetching news: ${data.message}</p>`;
        }
    } catch (err) {
        newsContainer.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
});