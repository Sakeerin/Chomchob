-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(18, 8) NOT NULL
);

-- Create the cryptocurrencies table
CREATE TABLE cryptocurrencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL
);

-- Create the balances table
CREATE TABLE balances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    cryptocurrency_id INT NOT NULL,
    balance DECIMAL(18, 8) NOT NULL,
    -- FOREIGN KEY (user_id) REFERENCES users(id),
    -- FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrencies(id)
);

-- Create the exchange_rates table
CREATE TABLE exchange_rates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_currency_id INT NOT NULL,
    to_currency_id INT NOT NULL,
    rate DECIMAL(18, 8) NOT NULL,
    -- FOREIGN KEY (from_currency_id) REFERENCES cryptocurrencies(id),
    -- FOREIGN KEY (to_currency_id) REFERENCES cryptocurrencies(id)
);