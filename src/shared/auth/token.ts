import { sign, verify, decode } from 'jsonwebtoken';

export interface DataToken {
  user_id: number;
  user_role: string;
}

export const generateToken = (data: DataToken): string => {
  return sign(data, process.env.APP_TOKEN_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

export const verifyToken = async (token: string): Promise<DataToken> => {
  return new Promise<DataToken>((resolve, rejects) => {
    try {
      const decoded = <DataToken>verify(token, process.env.APP_TOKEN_SECRET);
      resolve({
        user_role: decoded.user_role,
        user_id: decoded.user_id,
      });
    } catch (error) {
      rejects();
    }
  });
};

export const decodeToken = (token: string): DataToken => {
  return <DataToken>decode(token);
};
