const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'padi-care';

exports.riceArticlesApi = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  const path = req.path;
  
  try {
    if (path === '/articles') {
      const [files] = await storage.bucket(bucketName).getFiles();
      const articles = await Promise.all(
        files.map(async (file) => {
          const [content] = await file.download();
          return JSON.parse(content.toString('utf8'));
        })
      );
      res.status(200).json(articles);
    } else if (path === '/article') {
      const articleId = req.query.id;
      if (!articleId) {
        res.status(400).json({ error: 'Article ID is required' });
        return;
      }
      const file = storage.bucket(bucketName).file(`${articleId}.json`);
      const [exists] = await file.exists();
      if (!exists) {
        res.status(404).json({ error: 'Article not found' });
        return;
      }
      const [content] = await file.download();
      const article = JSON.parse(content.toString('utf8'));
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Tambahkan ini di awal fungsi
console.log('Request received:', req.method, req.path, req.query);

// Tambahkan ini sebelum setiap res.status().json()
console.log('Sending response:', /* response object */);

