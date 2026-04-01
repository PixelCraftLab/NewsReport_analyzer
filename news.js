// API_KEY=b5885e3890bd43e1918a1afeb8dec392



const newsContainer = document.getElementById("newsContainer");

async function details(category) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=b5885e3890bd43e1918a1afeb8dec392`
    
    const res = await fetch(url)
    const data = await res.json()

    displayNews(data.articles)
}



function displayNews(articles) {
    newsContainer.innerHTML = ""

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