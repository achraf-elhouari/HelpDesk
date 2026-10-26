# HelpDesk

Application web de gestion des demandes de support informatique pour Atlas Solutions (entreprise fictive). Elle permet de consulter, ajouter, modifier et supprimer des demandes directement dans le navigateur, sans backend ni base de données.

## Technologies utilisées

- HTML5
- CSS3 avec Tailwind CSS
- JavaScript Vanilla (sans framework)
- Git / GitHub
- Jira

## Fonctionnalités

- Affichage dynamique des demandes sous forme de cartes, généré depuis un tableau d'objets JavaScript
- 3 demandes fictives au démarrage
- Ajout d'une demande avec validation des champs (les champs vides ou composés d'espaces sont refusés)
- Message d'erreur et message de confirmation
- Modification d'une demande existante
- Suppression avec confirmation (l'annulation conserve la demande)
- Compteur du nombre de demandes, mis à jour après chaque ajout ou suppression
- Message adapté quand il n'y a aucune demande
- Priorités identifiables par couleur (Haute, Normale, Basse)
- Interface responsive (mobile, tablette, desktop)

## Structure des fichiers

```
HelpDesk/
├── index.html
├── css/
│   └── output.css
├── js/
│   └── script.js
└── README.md
```

## Lancer l'application

1. Télécharger ou cloner le dépôt.
2. Ouvrir le fichier `index.html` dans un navigateur.

Aucune installation n'est nécessaire pour utiliser l'application.

Pour modifier les styles Tailwind, il faut régénérer le fichier CSS :

```
npm install
npx @tailwindcss/cli -i ./src/input.css -o ./css/output.css --watch
```

## Auteur

Projet réalisé individuellement par Achraf El Houari dans le cadre du brief HelpDesk.
