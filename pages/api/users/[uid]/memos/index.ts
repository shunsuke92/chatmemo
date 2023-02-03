import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let response;
  if (req.method === 'GET') {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${req.query.uid}/memos`,
      {
        // 未使用
        params: { limit: req.query.limit, offset: req.query.offset },
      },
    );
  } else if (req.method === 'POST') {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${req.query.uid}/memos`,
      req.body,
    );
  } else {
    response = { data: 'Non-existent method' };
  }

  res.status(200).json(response.data);
}
