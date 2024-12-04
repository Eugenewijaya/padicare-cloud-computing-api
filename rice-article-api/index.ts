import { Storage } from '@google-cloud/storage';
import { Request, Response } from 'express';

const storage = new Storage();
const bucketName = 'rice-articles-bucket';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const articles = await Promise.all(
      files.map(async (file) => {
        const [content] = await file.download();
        return JSON.parse(content.toString('utf8'));
      })
    );
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  const articleId = req.params.id;
  try {
    const file = storage.bucket(bucketName).file(`${articleId}.json`);
    const [exists] = await file.exists();
    if (!exists) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    const [content] = await file.download();
    const article = JSON.parse(content.toString('utf8'));
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

