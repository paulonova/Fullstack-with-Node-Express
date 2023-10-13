module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  //To create a foreignKey
  Posts.associate = (models)=>{
    
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade"
    });
  }
  return Posts;
};
