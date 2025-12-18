const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    req.user = null; // 👈 important line

    const tokenCookieValue = req.cookies?.[cookieName];
    if (!tokenCookieValue) return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (err) {
      // invalid / expired token — ignore silently
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
