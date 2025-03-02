CREATE DATABASE IF NOT EXISTS hubspots;
USE hubspots;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    prenom VARCHAR(255),
    nom VARCHAR(255)
);

-- Créer un utilisateur avec des privilèges complets pour la base de données "hubspots"
CREATE USER 'hubspots_user'@'localhost' IDENTIFIED BY 'MHn9.W7/2^fq';

-- Accorder tous les privilèges à l'utilisateur sur la base de données "hubspots"
GRANT ALL PRIVILEGES ON hubspots.* TO 'hubspots_user'@'localhost';

-- Rafraîchir les privilèges pour prendre en compte les changements
FLUSH PRIVILEGES;