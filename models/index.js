const User = require('./User');
const Blog = require('./Blogpost');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog };
