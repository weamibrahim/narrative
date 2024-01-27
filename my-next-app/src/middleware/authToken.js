import jwt from 'jsonwebtoken';

export async function getToken(req) {
    
  const authorizationHeader = req.headers.get('authorization');
  //console.log("req header  authorization", authorizationHeader);
    const token = authorizationHeader;
  //console.log("token",token)
  
    return token;
  }
  export function isValidToken(token) {
    if (!token || !token.startsWith('Bearer ')) {
        return false; // Token is missing or invalid format
    }

    const tokenValue = token.split(' ')[1];

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        
        return true;
    } catch (error) {
        console.error("Token verification error:", error);
        return false;
    }
}
  