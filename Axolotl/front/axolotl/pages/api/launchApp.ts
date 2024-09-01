import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

const runApp = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`"${appPath}"`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { appPath } = req.body;
    if (!appPath) {
      res.status(400).json({ message: 'Missing application path' });
      return;
    }

    await runApp(appPath);
    res.status(200).json({ message: 'Application launched successfully' });
  } catch (error) {
    res.status(500).json({ message: `Failed to launch application: ${(error as Error).message}` });
  }
}
