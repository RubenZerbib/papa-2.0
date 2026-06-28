# Papa 2.0

Application web statique emotionnelle pour creer un mur collectif de souvenirs autour de Papa.

Site cible GitHub Pages:
https://rubenzerbib.github.io/papa-2.0/

## Fonctionnalites

- Landing plein ecran cinematographique
- Mur de souvenirs style reseau social (cartes, reactions, commentaires, carousel)
- Stories permanentes pour filtrer les collections
- Ajout de souvenir via modal/bottom-sheet mobile
- Sauvegarde locale via localStorage (posts, commentaires, reactions, filtres, theme)
- Recherche, filtres, tri et navigation par timeline
- Mode Livre vivant avec generation d'une page souvenir
- Mode Lieux sans API carte externe (cartes de lieux + filtrage)
- Souvenir du jour persistant par date
- Outils locaux: export/import JSON, reset demo, impression, placeholder QR

## Fichiers

- index.html
- styles.css
- app.js
- README.md

## Lancer en local

Option simple:

1. Ouvrir index.html dans un navigateur.

Option recommandee (eviter certaines restrictions locales navigateur):

1. Depuis la racine du projet, lancer un serveur statique.
2. Exemple avec Python:

```bash
python3 -m http.server 8080
```

3. Ouvrir http://localhost:8080

## Deployer sur GitHub Pages

1. Pousser le projet sur le depot papa-2.0, branche main.
2. Dans GitHub: Settings > Pages.
3. Source: Deploy from a branch.
4. Branch: main, dossier: / (root).
5. URL attendue:
	https://rubenzerbib.github.io/papa-2.0/

## Mettre a jour l'URL

L'URL publique est referencee dans app.js via la constante BASE_URL.

1. Ouvrir app.js.
2. Modifier BASE_URL avec la nouvelle URL GitHub Pages du projet.
3. Conserver le slash final.

## Limites actuelles (version statique)

- Pas de compte ni connexion.
- Pas de backend, donc pas de synchronisation entre appareils.
- Les souvenirs ajoutes sont stockes en localStorage sur cet appareil uniquement.
- Les fichiers uploades sont convertis en data URL uniquement s'ils sont petits (pour limiter le stockage local).
- En cas de vidage des donnees navigateur, les souvenirs locaux peuvent etre perdus.

## Evolution backend proposee

- Supabase Storage + Database pour synchroniser medias, posts, commentaires et reactions.
- File de moderation avant publication.
- Lien d'acces familial partage (invitation privee).
- Upload media robuste (compression, taille, formats, metadata).
- Backups automatiques et export archive regulier.

## Message d'intention

Papa 2.0 est pense comme un espace collectif, respectueux et humain:

- Ici, chacun peut deposer un morceau de son histoire.
- Un souvenir n'a pas besoin d'etre parfait pour etre precieux.
- Ce mur appartient a la famille.