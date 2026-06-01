CREATE TABLE customers (
 id UUID PRIMARY KEY,
 customer_no VARCHAR(50),
 full_name VARCHAR(255),
 mobile VARCHAR(50),
 email VARCHAR(255)
);

CREATE TABLE wallets (
 id UUID PRIMARY KEY,
 customer_id UUID,
 currency VARCHAR(10),
 available_balance NUMERIC(20,2),
 locked_balance NUMERIC(20,2)
);
