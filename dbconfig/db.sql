CREATE DATABASE chemical_spill_db;
CREATE DATABASE session_db;
USE chemical_spill_db;

-- Users
CREATE TABLE Users (
    id CHAR(36) PRIMARY KEY,
    userPassword VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    xp INT DEFAULT 0
);

-- Profiles (height, weight, activity level, neurodivergence, etc...)
CREATE TABLE Profiles (
    userId CHAR(36) NOT NULL,
    birthday DATE NOT NULL,
    heightInches INT NOT NULL,
    heightFeet INT NOT NULL,
    bodyWeight INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);


CREATE TABLE Assessments (
    userId CHAR(36) NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    mood INT,
    motivation INT,
    focus INT,
    sleepScore INT,
    bodyBattery INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE Recommendations (
    id INT PRIMARY KEY AUTO INCREMENT,
    metricType ENUM('mood', 'motivation', 'focus', 'sleepScore', 'bodyBattery') NOT NULL,
    metricLow INT NOT NULL,
    metricHigh INT NOT NULL,
    recommendationText TEXT NOT NULL,
    actionType ENUM('stabilize', 'optimize', 'recover') NOT NULL,
    difficultyLevel INT CHECK(difficultyLevel BETWEEN 1 AND 5)
);

CREATE TABLE UserFavoriteRecommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    recommendationId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (recommendationId) REFERENCES Recommendations(id)
);

CREATE TABLE UserSkippedRecommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    recommendationId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (recommendationId) REFERENCES Recommendations(id)
);