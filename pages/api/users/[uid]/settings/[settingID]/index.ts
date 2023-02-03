import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let response;
  if (req.method === 'PATCH') {
    response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${req.query.uid}/settings/${req.query.settingID}`,
      req.body,
    );
  } else {
    response = { data: 'Non-existent method' };
  }

  res.status(200).json(response.data);
}
