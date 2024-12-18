import jwt from 'jsonwebtoken';
// Xác thực người dùng
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded; // Lưu thông tin user vào req
        next();
    });
};

// Phân quyền theo vai trò

export const authorizationAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {  // Kiểm tra role trong token
      return res.status(403).json({ message: "You're not allowed to do that!" });
    }
    next();  
  };