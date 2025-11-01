module.exports = function generateColorwayCode() {
  const prefix = 'CW';
  const random = Math.random().toString(36).substring(2,8).toUpperCase();
  const ts = Date.now().toString().slice(-5);
  return `${prefix}-${random}-${ts}`;
};
