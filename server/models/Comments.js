module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    
    commentBody: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  return Comments;
};
