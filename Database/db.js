const { Sequelize, DataTypes } = require('sequelize');

// Create the Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Product model
// The Product entity represents an item available for sale in the game. It includes attributes such as the product name, details, sale price, and the dates for the start and end of the sale period.
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sale_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  open_sale_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_sale_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define the Sale model
// The Sale entity represents a specific sale period for a product. It includes the discounted price during the promotion period and the start and end dates of the promotion. Each sale is associated with a specific product through the product_id foreign key.
const Sale = sequelize.define('Sale', {
  sale_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discounted_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  promotion_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  promotion_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define the Customer model
// The Customer entity represents a customer who purchases a product. It includes attributes such as the customer's name and email.
const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the Code model
// The Code entity represents a unique code that a customer receives after purchasing a product. It includes the code value, the date when the code was created, and foreign keys referencing the associated customer and product.
const Code = sequelize.define('Code', {
  code_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define the Bundle model
// The Bundle entity represents a bundle of multiple products available for sale. It includes attributes such as the bundle name and price.
const Bundle = sequelize.define('Bundle', {
  bundle_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bundle_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bundle_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define the associations between the models
Product.hasMany(Sale, { foreignKey: 'product_id' });
Sale.belongsTo(Product, { foreignKey: 'product_id' });
Customer.hasMany(Code, { foreignKey: 'customer_id' });
Code.belongsTo(Customer, { foreignKey: 'customer_id' });
Product.hasMany(Code, { foreignKey: 'product_id' });
Code.belongsTo(Product, { foreignKey: 'product_id' });
Bundle.belongsToMany(Product, { through: 'BundleProduct', foreignKey: 'bundle_id' });
Product.belongsToMany(Bundle, { through: 'BundleProduct', foreignKey: 'product_id' });

// Synchronize the models with the database
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Export the models
module.exports = {
  Product,
  Sale,
  Customer,
  Code,
  Bundle,
};
