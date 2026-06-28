# Papa 2.0

Papa 2.0 est une application web statique premium, emotionnelle et mobile-first pour conserver les souvenirs de Papa.

URL cible GitHub Pages:
https://rubenzerbib.github.io/papa-2.0/

## Lancer en local

Option directe:

1. Ouvrir index.html dans le navigateur.

Option recommandee:

1. Depuis la racine du projet:

```bash
python3 -m http.server 8080
```

2. Ouvrir http://localhost:8080

## Publier sur GitHub Pages

1. Push sur la branche main.
2. GitHub > Settings > Pages.
3. Source: Deploy from a branch.
4. Branch: main, dossier root (/).
5. URL:
	 https://rubenzerbib.github.io/papa-2.0/

## Remplacer les photos et medias

- Landing:
	passer par le portail admin local pour modifier la photo principale.
- Posts:
	utiliser "Raconter un souvenir" puis upload local.
- Les medias sont sauvegardes en dataURL localStorage si leur taille est raisonnable.

## Ajouter la musique de fond

1. Creer le fichier: assets/music/background.mp3
2. Le lecteur charge ce chemin par defaut.
3. Si le fichier est absent, une note apparait uniquement dans la console.

## Portail admin local

- Acces discret:
	clic sur le point discret en bas a droite,
	ou 5 clics sur le titre Papa 2.0.
- Identifiant: rubenz
- Mot de passe: 270792

Important:
Ce portail n'est pas une vraie securite serveur. C'est un verrouillage local d'interface seulement.

## Donnees locales et limites

- Toute la persistance se fait en localStorage:
	posts, commentaires, reactions, likes, contenus admin, preference musique.
- Donnees locales limitees a l'appareil/navigateur.
- Pas de synchronisation multi-utilisateur dans cette version.
- Si le localStorage est vide/nettoye, les donnees peuvent etre perdues.

## Fonctionnalites principales

- Landing immersive editable (nom, dates, resume, phrase d'accueil, photo)
- Feed style Instagram familial avec reactions, commentaires, partage, enregistrement
- Stories de filtre
- Timeline vivante avec slider horizontal et carte de periode
- Zone Souvenirs en mouvement avec carrousel auto + swipe mobile
- Livre vivant avec page souvenir imprimable
- QR placeholder configurable
- Dashboard admin local: edition landing, posts, commentaires, export/import/reset

## Prochaines etapes recommandees

- Supabase Database pour une vraie base de donnees collaborative
- Supabase Storage pour photos, videos, audio
- Acces familial via lien prive et roles
- Moderation des souvenirs avant publication
- Sauvegardes automatiques et restauration