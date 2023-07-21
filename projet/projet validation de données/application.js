const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Endpoint d'inscription
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Cryptage du mot de passe avec bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors du cryptage du mot de passe' });
    } else {
      // Enregistrement du nom d'utilisateur et du hash dans la base de données (simulé ici)
      // Remplace cette partie avec ton propre code pour intégrer une base de données
      const user = {
        username,
        passwordHash: hash
      };

      // Réponse réussie
      res.status(201).json({ message: 'Inscription réussie' });
    }
  });
});

// Endpoint de connexion
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Vérification du mot de passe avec bcrypt
  // Remplace cette partie avec ton propre code pour intégrer une base de données et récupérer le hash correspondant au nom d'utilisateur fourni
  const storedHash = '$2b$10$q7kA5dNKkIaB0CF7oZ4eRO4okcQ2Hiy1KMaJrmlQpBW6KPWYp8L8e';

  bcrypt.compare(password, storedHash, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
    } else if (result) {
      // Connexion réussie
      res.json({ message: 'Connexion réussie' });
    } else {
      // Mot de passe incorrect
      res.status(401).json({ error: 'Mot de passe incorrect' });
    }
  });
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
