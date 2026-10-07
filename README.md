# Walyi — Site Perso

Portfolio / vitrine de Walyi Yessoufou Ademonla Alamou — Data Analyst & Dev à Cotonou, Bénin.

## Pages
- **Accueil** — hero, services, stats
- **Prestations** — compétences techniques
- **Projets** — réalisations data/dev
- **Contact** — formulaire + réseaux + WhatsApp

## Déployer sur GitHub Pages

1. Créer le repo sur GitHub :
   - Nom : `walyi`
   - Public
   - Sans README

2. Pousser :
```powershell
git remote add origin https://github.com/Walyi007/walyi.git
git branch -M main
git push -u origin main
```

3. Activer Pages :
   - Settings → Pages → Source : `main` → Save
   - URL : `https://Walyi007.github.io/walyi`

## Skills utilisés
- web-dev : HTML/CSS/JS
- design-uiux : dark mode, responsive
- seo-writing : meta, title
## Sélecteur de langue
- Un sélecteur de langue FR/EN est présent dans l’en‑tête, permettant de basculer entre français et anglais.
- La fonctionnalité de traduction est actuellement en placeholder ; les textes peuvent être mis à jour facilement en éditant le dictionnaire JavaScript.

## Formulaire de contact
Le formulaire utilise Formspree pour envoyer les messages à votre adresse e-mail.
1. Créez un formulaire gratuit sur [Formspree.io](https://formspree.io/)
2. Obtenez votre endpoint (ex: https://formspree.io/f/abcdefg)
3. Remplacez l'attribut `action` du formulaire dans `index.html` par votre endpoint :
    ```html
    <form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/VOTRE_ID" method="POST" novalidate>
    ```
4. Ajoutez un attribut `name` à chaque champ d'entrée (name, email, subject, message) afin que Formspree puisse les traiter correctement.
5. Les messages seront envoyés à l'adresse e-mail associée à votre compte Formspree (vous pouvez y associer yessoufouwalyi@gmail.com).