'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: 'Cart', foreignKey:'product_id'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Product name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please upload an image'
        },
        isUrl: {
          args: true,
          msg: "Invalid URL format"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Invalid price value"
        },
        min: {
          args: [0],
          msg: "Invalid price value"
        },
        notEmpty: {
          args: true,
          msg: "Price is required"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please input stock"
        },
        min: {
          args: [0],
          msg: 'Invalid stock value'
        },
        isNumeric: {
          args: true,
          msg: 'Invalid stock value'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};