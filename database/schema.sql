CREATE DATABASE IF NOT EXISTS subscription_billing;
USE subscription_billing;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    monthly_quota INT NOT NULL,
    extra_charge_per_unit DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample plans
INSERT INTO plans (name, monthly_quota, extra_charge_per_unit) VALUES
('Basic', 100, 0.50),
('Pro', 500, 0.30),
('Enterprise', 2000, 0.20);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    UNIQUE KEY unique_user_active (user_id, is_active)
);

-- UsageRecords table
CREATE TABLE IF NOT EXISTS usage_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    used_units INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes
CREATE INDEX idx_usage_created_at ON usage_records (created_at);
CREATE INDEX idx_usage_user_created ON usage_records (user_id, created_at);

-- Drop triggers if they exist (to avoid conflicts)
DROP TRIGGER IF EXISTS before_subscription_insert;
DROP TRIGGER IF EXISTS before_subscription_update;

-- Trigger to prevent multiple active subscriptions
DELIMITER $$
CREATE TRIGGER before_subscription_insert
BEFORE INSERT ON subscriptions
FOR EACH ROW
BEGIN
    IF NEW.is_active = TRUE THEN
        IF EXISTS (
            SELECT 1 FROM subscriptions 
            WHERE user_id = NEW.user_id 
            AND is_active = TRUE
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User already has an active subscription';
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_subscription_update
BEFORE UPDATE ON subscriptions
FOR EACH ROW
BEGIN
    IF NEW.is_active = TRUE AND OLD.is_active = FALSE THEN
        IF EXISTS (
            SELECT 1 FROM subscriptions 
            WHERE user_id = NEW.user_id 
            AND is_active = TRUE
            AND id != NEW.id
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User already has an active subscription';
        END IF;
    END IF;
END$$
DELIMITER ;