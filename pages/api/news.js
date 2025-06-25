export default async function handler(req, res) {
  const { category } = req.query;
  // Use environment variables for API keys
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
  const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;

  // Debug: Log if keys are missing
  console.log('NEWS_API_KEY:', NEWS_API_KEY ? 'set' : 'MISSING');
  console.log('GNEWS_API_KEY:', GNEWS_API_KEY ? 'set' : 'MISSING');
  console.log('CURRENTS_API_KEY:', CURRENTS_API_KEY ? 'set' : 'MISSING');

  try {
    // NewsAPI
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${NEWS_API_KEY}`;
    if (category) newsApiUrl += `&category=${category}`;
    // GNews
    let gnewsUrl = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${GNEWS_API_KEY}`;
    if (category) gnewsUrl += `&topic=${category}`;
    // Currents
    let currentsUrl = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}`;
    if (category) currentsUrl += `&category=${category}`;

    // Debug: Log URLs
    console.log('newsApiUrl:', newsApiUrl);
    console.log('gnewsUrl:', gnewsUrl);
    console.log('currentsUrl:', currentsUrl);

    const [newsApiRes, gnewsRes, currentsRes] = await Promise.all([
      fetch(newsApiUrl),
      fetch(gnewsUrl),
      fetch(currentsUrl),
    ]);

    const [newsApiData, gnewsData, currentsData] = await Promise.all([
      newsApiRes.json(),
      gnewsRes.json(),
      currentsRes.json(),
    ]);

    // Debug: Log API responses
    console.log('newsApiData:', newsApiData);
    console.log('gnewsData:', gnewsData);
    console.log('currentsData:', currentsData);

    // Normalize articles from all APIs
    const newsApiArticles = (newsApiData.articles || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source?.name || 'NewsAPI',
      published: a.publishedAt,
    }));
    const gnewsArticles = (gnewsData.articles || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      source: a.source?.name || 'GNews',
      published: a.publishedAt,
    }));
    const currentsArticles = (currentsData.news || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      source: a.author || 'Currents',
      published: a.published,
    }));

    // Combine and sort by published date (descending)
    const allArticles = [...newsApiArticles, ...gnewsArticles, ...currentsArticles]
      .filter(a => a.title && a.url)
      .sort((a, b) => new Date(b.published) - new Date(a.published));

    res.status(200).json({ articles: allArticles });
  } catch (err) {
    console.error('News API error:', err);
    res.status(500).json({ error: 'Failed to fetch news', details: err.message, stack: err.stack });
  }
} 