
function authorize (requiredRole) {
console.log("requiredRole",requiredRole)
  try {
    if (requiredRole && requiredRole === "admin") {
     
      return true
    } else {
     
      return false;
    }
  } catch (error) {
   
    console.error('Authorization error:', error);
    
  }
};

export default authorize;
