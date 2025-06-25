export default async function handler(req, res) {
  const { category } = req.query;
  // Use environment variables for API keys
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const GNEWS_API_KEY = 'd2f21bd9cce90430955e4208384e54c3';
  const CURRENTS_API_KEY = '78rb0XvdMoUW_FPUbAjxXzNcgpztgFS0SSLIud2WPEs4UI7W';

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

    // Reddit OAuth2 credentials
    const REDDIT_CLIENT_ID = 'SHxyBNaNp0R7i8lUaPTvQQ';
    const REDDIT_CLIENT_SECRET = 'oSklGI-FLj8KIeNMc5-VATd5dpvwoQ';
    let redditArticles = [];
    try {
      // Step 1: Get access token
      const redditAuth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
      const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${redditAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });
      const tokenData = await tokenRes.json();
      const redditToken = tokenData.access_token;
      // Step 2: Fetch top posts from r/news using the token
      const redditRes = await fetch('https://oauth.reddit.com/r/news/top?limit=10&t=day', {
        headers: {
          'Authorization': `Bearer ${redditToken}`,
          'User-Agent': 'BlogSphereNewsBot/0.1 by CupFun6974',
        },
      });
      const redditData = await redditRes.json();
      // Debug: Log Reddit response
      console.log('redditData:', redditData);
      redditArticles = (redditData.data?.children || []).map(post => {
        const p = post.data;
        return {
          title: p.title,
          description: p.selftext || '',
          url: 'https://reddit.com' + p.permalink,
          image: p.thumbnail && p.thumbnail.startsWith('http') ? p.thumbnail : '/assets/newshd1.jpg',
          source: 'Reddit',
          published: p.created_utc ? new Date(p.created_utc * 1000).toISOString() : '',
        };
      });
    } catch (err) {
      console.error('Reddit API error:', err);
    }

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
      image: a.urlToImage || a.image || '/assets/newshd1.jpg',
      source: a.source?.name || 'NewsAPI',
      published: a.publishedAt,
    }));
    const gnewsArticles = (gnewsData.articles || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image || a.urlToImage || '/assets/newshd1.jpg',
      source: a.source?.name || 'GNews',
      published: a.publishedAt,
    }));
    const currentsArticles = (currentsData.news || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image || a.urlToImage || '/assets/newshd1.jpg',
      source: a.author || 'Currents',
      published: a.published,
    }));

    // Mediastack API
    const MEDIASTACK_API_KEY = '94e13ab94baf7e15cdcb747aba43a410';
    let mediastackArticles = [];
    try {
      let mediastackUrl = `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&languages=en&limit=10`;
      if (category) mediastackUrl += `&categories=${category}`;
      console.log('mediastackUrl:', mediastackUrl);
      const mediastackRes = await fetch(mediastackUrl);
      const mediastackData = await mediastackRes.json();
      console.log('mediastackData:', mediastackData);
      mediastackArticles = (mediastackData.data || []).map(a => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.image || '/assets/newshd1.jpg',
        source: a.source || 'Mediastack',
        published: a.published_at,
      }));
    } catch (err) {
      console.error('Mediastack API error:', err);
    }

    // Newsdata.io API
    const NEWSDATA_API_KEY = 'pub_3cd1c78ae5ee410996c705bf315eb78f';
    let newsdataArticles = [];
    try {
      let newsdataUrl = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&language=en&country=us&category=top`;
      if (category) newsdataUrl += `&category=${category}`;
      console.log('newsdataUrl:', newsdataUrl);
      const newsdataRes = await fetch(newsdataUrl);
      const newsdataData = await newsdataRes.json();
      console.log('newsdataData:', newsdataData);
      newsdataArticles = (newsdataData.results || []).map(a => ({
        title: a.title,
        description: a.description,
        url: a.link,
        image: a.image_url || '/assets/newshd1.jpg',
        source: a.source_id || 'Newsdata.io',
        published: a.pubDate,
      }));
    } catch (err) {
      console.error('Newsdata.io API error:', err);
    }

    // Combine and sort by published date (descending)
    const allArticles = [...newsApiArticles, ...gnewsArticles, ...currentsArticles, ...redditArticles, ...mediastackArticles, ...newsdataArticles]
      .filter(a => a.title && a.url)
      .sort((a, b) => new Date(b.published) - new Date(a.published));

    res.status(200).json({ articles: allArticles });
  } catch (err) {
    console.error('News API error:', err);
    res.status(500).json({ error: 'Failed to fetch news', details: err.message, stack: err.stack });
  }
} 