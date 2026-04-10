export default async function handler(req, res) {
    const { category, query } = req.query;
    const apiKey = process.env.API_KEY || "b5885e3890bd43e1918a1afeb8dec392";
    
    let url;
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${apiKey}`;
    } else {
        const cat = category || "general";
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Vercel serverless functions use res.status().json()
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}
