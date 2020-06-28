module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER      
    },
    gbId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subjects: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    license: {
      type: DataTypes.STRING,
      allowNull: true
    }                            
  }, {});
  return Book;
};