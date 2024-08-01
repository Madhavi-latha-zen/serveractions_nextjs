import type { NextApiRequest, NextApiResponse } from 'next';
import { createStudent } from '../../lib/studentAction';

interface StudentRequestBody {
  name: string;
  email: string;
  role: 'Student' | 'Teacher' | 'Admin';
}

interface CreateStudentResponse {
  created: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateStudentResponse>
) {
  if (req.method === 'POST') {
    const { name, email, role }: StudentRequestBody = req.body;

    try {
      const result = await createStudent({ name, email, role });

      if (result.created) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ created: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ created: false, error: 'Method not allowed' });
  }
}

