const User = require('./User');
const Blog = require('./Blogpost');
const sequelize = require('../connections/connection');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog };
