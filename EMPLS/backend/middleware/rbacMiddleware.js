const { verifyToken } = require('../utils/jwtUtils');

// Define your role hierarchy (roles with higher indexes have more privileges)
const roleHierarchy = {
  'guest': 0,
  'officer': 1,
  'admin': 2,
  'superadmin': 3
};

const rbacMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // 1. Get token from Authorization header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ 
          success: false,
          message: 'Access denied. No token provided.' 
        });
      }

      // 2. Verify token
      const decoded = verifyToken(token);
      req.user = decoded;

      // 3. Check if user has the required role or higher
      if (roleHierarchy[decoded.role] < roleHierarchy[requiredRole]) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Requires ${requiredRole} role or higher.`
        });
      }

      // 4. If all checks pass, proceed to the route handler
      next();
    } catch (error) {
      console.error('RBAC Middleware Error:', error);
      res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token.' 
      });
    }
  };
};

module.exports = rbacMiddleware;