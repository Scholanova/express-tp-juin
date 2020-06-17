# PROJET EXPRESS NODE.JS JUIN

Nom des membres de la team :
 - XXXXXXX XXXXXXX
 - XXXXXXX XXXXXXX

## CONSIGNES GÉNÉRALES  
Le projet correspondant aux cours du 18 et 19 juin 2020. 
Il fait suite aux projets express du 28 et 29 mai, 16 et 17 avril, 20 et 21 février et 19 et 20 mars.

NPM doit être installé sur votre machine, ainsi que Postgres.

Il vous faut cloner le repository, créer une branche au nom des quatre prénoms des membres de l'équipe sous le format `prenom+prenom+prenom+prenom`.

Chaque membre de l'équipe prend une étape, et créé une branche sous le format `prenom+prenom+prenom+prenom/etape-XX` ou XX est 
le numéro de l'étape.

Commitez à au cours de la conception de votre étape. À la fin du développement de l'étape, ouvrez une Pull-Request, 
et demandez à un membre de votre équipe de vous faire une revue de code. Prenez en compte ses remarques puis fusionnez la pull request.
Repartez ensuite de branche `prenom+prenom+prenom+prenom` pour créer une nouvelle branche `prenom+prenom+prenom+prenom/etape-XX`. 

Vous êtes libre pour les messages de commit. Cependant rappelez-vous qu'ils peuvent aider les membres de votre équipe, 
donc faites des messages cohérents et lisibles.

Les fonctionnalités doivent être testées et les tests doivent passer pour fusionner la branche, en tant que relecteur, 
n'oubliez pas de relire les tests.

## PRÉREQUIS 
- Savoir utiliser npm
- Comprendre le JS
- Connaissance d'Express, de EJS et de Sequelize 

## PARTIE 0 - VERIFICATION QUE LE PROJET TOURNE ET QUE LES OUTILS SONT MAÎTRISÉS
- Cloner le projet
- Installer les dépendances avec `npm install`
- Initialiser le projet avec `npm run db:init`, `npm run db:migrate`, `npm run db:seed` et `npm run db:test:init`
- Lancer les tests avec `npm test` et verifier qu'ils passent tous
- Lancer le server avec `npm start` et verifier qu'il se lance sur le port 3000
- Lancer le server de dev avec `npm run start:dev` et verifier qu'il se lance le port 3000
- Créez une branche `prenom+prenom+prenom+prenom`.
- Commitez en remplaçant dans le readme les "XXXXXXX XXXXXXX" par les nom et prénom des membres de votre équipe, puis poussez sur Origin. 

## PARTIE 1 - UN SITE WEB SIMPLE QUI FAIT DES CHOSES 
Un utilisateur est un objet qui a un prénom, un nom et une adresse email. Le nom et l'adresse email sont obligatoires, et l'adresse email se doit d'être unique. 
Quand l'utilisateur n'a pas de prénom, pensez à faire quelque chose de raisonnable dans l'affichage.

- Étape 1 - Créez une page d'accueil, qui affiche un message sympa et un lien vers l'index des utilisateurs (`/users`)  
- Étape 2 - Créez une page d'index des utilisateurs (`/users`), qui liste les utilisateurs existant et permet de rediriger
        vers un formulaire de création d'un utilisateur.  
- Étape 3 - Créez un formulaire de création d'un utilisateur (`/users/new`), qui va créer un utilisateur et qui redirige vers l'index à la création.
 Des messages d'erreur s'affichent correctement si le formulaire est mal rempli. 
- Étape 4 - Créez une page 404 affichant un message plus sympa.
- Étape 5 - Créez une page de visualisation des utilisateurs (`/users/:id`), qui permet de visualiser les informations d'un utilisateur.
- Étape 6 - Ajoutez des boutons supprimer à côté de chaque utilisateur sur la liste des utilisateurs, ainsi que sur la page de visualisation d'un utilisateur. 

## PARTIE 2 - UNE VERSION SIMPLIFIÉE DE L'AUTHENTIFICATION 
- Étape 7 - Ajoutez sur la page show d'un utilisateur la possibilité de s'authenitifier comme cet utilisateur. 
C'est à dire qu'un cookie contenant l'id de l'utilisateur est déposé après avoir clické sur ce bouton - par exemple au moyen d'un
 formulaire contenant ce bouton et un champs id invisible. 
(ne vous préoccupez pas de l'encryption, mettez le cookie en clair)
- Étape 8 - Ajoutez sur la page d'acceuil un message souhaitant la bienvenue à l'utilisateur authentifié.
- Étape 9 - Ajoutez sur toutes les pages un bouton pour revenir à l'acceuil.
- Étape 10 - Ajoutez sur la page d'index des users un bouton pour se déconnecter.

## PARTIE 3 - DES PROBLÈMES D'AUTHORISATIONS
Un utilisateur peut avoir des secrets. Un secret est un object qui appartient à un utilisateur, contient une description et un contenu. 
La description doit être courte (moins de 100 charactères). Ni la descirption, ni le contenu du secret ne doivent être vide. 

- Étape 11 - Créez un formulaire de création de secrets (`/users/:id/secrets/new`), qui va permettre de créer des secrets
 pour un utilisateur et qui redirige vers l'index des secrets d'un utilisateur à la création. Des messages d'erreur s'affichent correctement si le formulaire est mal rempli.
 On ne peut accéder à cette page que si l'on est authentifié comme l'utilsateur en question. 
- Étape 12 - Créez une page de liste des secrets (seulement description) d'un utilisateur (`/users/:id/secrets`). On ne peut accéder à cette page 
que si l'on est authentifié comme l'utilsateur en question. Si il n'y a pas de secret pensez à mettre un message comme quoi la liste est vide. 
- Étape 13 - Créez une page d'affichage d'un secret (description, plus contenu) d'un utilisateur (`/users/:id_user/secrets/:id`).
 On ne peut accéder à cette page que si l'on est authentifié comme l'utilsateur en question.
- Étape 14 - A chaque erreur d'autorisation, il faut que l'utilisateur soit redirigé vers la page d'acceuil et qu'un bandeau 
"Vous n'avez pas les droits pour accéder à cette page" apparaisse. 
    

## AIDE POUR LA MIGRATION DE BASE DE DONNÉES

Pour créer une nouvelle migration faites la commande suivante :
 
`$ npx sequelize migration:create --name <le nom de votre migration>`

Voici un exemple de migration pour l'ajout d'une colonne sur la table `Person`. 
```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('Person', 'petName', {
          type: Sequelize.DataTypes.STRING
        })
    }
  },
  down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('Person', 'petName')
  }
};
```

## AIDE POUR L'ASSOCIATION ENTRE DEUX MODELES

Exemple pour ajouter une clé externe à un nouveau modèle durant une migration.
```javascript
return queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Persons',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
```

Pour associer ces deux modèles Sequelize, il faut signifier à Sequelize comment ces deux modèles sont liés l'un avec
l'autre. Pour cela on va lier les deux modèles au travers d'associations ([Doc](https://sequelize.org/v5/identifiers.html#associations)).
```javascript
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.hasMany(models.Pet, {foreignKey: 'personId', sourceKey: 'id'});
  };
  return Person;
};

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsTo(models.Person, {foreignKey: 'personId', sourceKey: 'id'});
  };
  return Pet;
};
```
On pourra alors créer des objets `Pet` appartenant à une `Person`.
```javascript
return Pet.create({ name: 'Rex', Person: somePersonInstance }, { include: Person })
// Returns a Pet

return person.createPet({
          name: 'Awesome!'
        })
// Returns a person
```
Pour récupérer les objets au travers de leurs associations, il y a plusieurs méthodes.
```javascript
return pet.getPerson() 
// returns the person instance associated with the pet

return person.getPets() 
// returns all the pets associated with the person

return Pet.findAll({ where: { personId: id } })
// Returns the pets associated with the person
```

## AIDE POUR INSPECTER UN SCHEMA POSTGRES

En se connectant au terminal distant du server de la base de donnée postgres, on peut récupérer
des informations sur le schéma exact d'une table donnée en entrant la commande suivante:
`$ \d "<nom de la table>"` 

## AIDE POUR EFFECTUER UNE REQUÊTE DELETE

Les requêtes HTTP du type `DELETE` ne sont pas permises au travers d'un formulaire html. 
Cependant, il est possible de les faire au travers d'un peu de javascript, comme suit :

```html
<button onclick = "deleteAuthorById(<%= author.id %>)" %> > Delete </button>
<script>
function deleteAuthorById (authorId) {
  fetch(`/authors/${authorId}`, { method: 'DELETE' })
}
</script>
```

## AIDE POUR MANIPULER LES COOKIES

```js
// Read cookie named "cookie_monster" with request
req.cookies['cookie_monster']

// Set cookie "cookie_monster" with response  
res.cookie('cookie_monster', 'I love COOKIES !!')
```

