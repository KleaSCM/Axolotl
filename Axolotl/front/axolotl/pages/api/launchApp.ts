
import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { appPath } = req.body;
    if (!appPath) {
      res.status(400).json({ message: 'Missing application path' });
      return;
    }

    exec(`"${appPath}"`, (error) => {
      if (error) {
        res.status(500).json({ message: `Failed to launch application: ${error.message}` });
        return;
      }
      res.status(200).json({ message: 'Application launched successfully' });
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
}
