// Import required modules
import { NextResponse } from 'next/server';

// Define the authorization middleware
const authorize = (requiredRole) => async (req, res, next) => {
console.log(req.user)
  try {
    if (req.user && req.user.role === requiredRole) {
      // Call the next middleware or route handler
      await next();
      // Return a success response (or any response you want) after calling next()
      return NextResponse.json({ message: 'Authorized' }, { status: 200 });
    } else {
      // Return a Forbidden response if the user doesn't have the required role
      return NextResponse.json({ message: 'Forbidden - Insufficient permissions' }, { status: 403 });
    }
  } catch (error) {
    // Handle any errors that may occur during authorization
    console.error('Authorization error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

// Export the authorize middleware
export default authorize;
