const jwt = require('jsonwebtoken');

const createToken = (info) => {
  const data = {
    user_id: info._id,
    user_email: info.email,
    user_role: info.role,
  };
  return jwt.sign(data, process.env.JWT_API_SECRET, { expiresIn: '1h' });
};
module.exports = { createToken };
