# Guide de déploiement CoroPath sur Google Play Store

## Prérequis

1. **Compte Google Play Developer** : 99$ one-time fee
   - Créer sur https://play.google.com/console

2. **Déploiement Vercel** : Application doit être en production sur HTTPS
   - Déployer sur votre domaine (ex: coropath.votreclinique.fr)

## Étapes de déploiement

### 1. Préparer l'application

L'application est déjà optimisée pour le Play Store avec :
- ✅ Manifest.json complet avec icônes 192x192 et 512x512
- ✅ Screenshots et metadata
- ✅ Catégories médicales/santé
- ✅ Description détaillée

### 2. Générer l'APK Android avec PWABuilder

**Option A : PWABuilder (Recommandé - Simple)**
1. Aller sur https://www.pwabuilder.com
2. Entrer l'URL de production : `https://votredomaine.com`
3. Cliquer "Start" → Analyser l'application
4. Aller dans l'onglet "Android"
5. Configurer :
   - Package ID : `com.clinique.coropath`
   - App name : CoroPath
   - Version : 1.0.0
6. Télécharger l'APK signé

**Option B : Bubblewrap CLI (Avancé)**
\`\`\`bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://votredomaine.com/manifest.json
bubblewrap build
\`\`\`

### 3. Signer l'APK (si non signé)

\`\`\`bash
# Créer un keystore
keytool -genkey -v -keystore coropath-release-key.keystore -alias coropath -keyalg RSA -keysize 2048 -validity 10000

# Signer l'APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore coropath-release-key.keystore app-release-unsigned.apk coropath

# Optimiser avec zipalign
zipalign -v 4 app-release-unsigned.apk coropath-release.apk
\`\`\`

### 4. Obtenir le SHA-256 fingerprint

\`\`\`bash
keytool -list -v -keystore coropath-release-key.keystore -alias coropath
\`\`\`

Copier le SHA-256 dans `/public/.well-known/assetlinks.json`

### 5. Configurer Digital Asset Links

1. Mettre à jour `assetlinks.json` avec votre SHA-256
2. Déployer sur Vercel
3. Vérifier l'accès : `https://votredomaine.com/.well-known/assetlinks.json`

### 6. Soumettre au Play Store

1. Se connecter à https://play.google.com/console
2. Créer une nouvelle application
3. Remplir les informations :
   - **Nom** : CoroPath - Parcours Coronaires
   - **Catégorie** : Médecine
   - **Description courte** : Application professionnelle de parcours de soins coronaires
   - **Description longue** : (voir ci-dessous)
   - **Icône** : 512x512 (`/public/icons/icon-512.jpg`)
   - **Screenshots** : Prendre 2-5 captures d'écran de l'app

4. Uploader l'APK dans "Production"
5. Remplir le questionnaire de contenu
6. Soumettre pour review (1-7 jours)

## Description Play Store (suggestion)

**Description courte (80 caractères max):**
\`\`\`
Parcours de soins coronaires - Calculettes ESC 2023/2024
\`\`\`

**Description longue:**
\`\`\`
CoroPath est l'application professionnelle de référence pour les parcours de soins coronaires, développée pour la Clinique Pole Santé Sud Le Mans.

FONCTIONNALITÉS PRINCIPALES :
• 4 parcours détaillés conformes ESC 2023/2024
  - SCA filière courte
  - Douleur thoracique au cabinet
  - Syndromes coronaires chroniques
  - Suivi post-hospitalisation

• Calculettes médicales interactives
  - Score GRACE (risque ischémique)
  - PRECISE-DAPT et DAPT (risque hémorragique)
  - RF-CL / CACS-CL (probabilité pré-test ESC 2024)

• Accès rapide aux urgences
  - Bouton d'appel rapide SAMU/Cardiologue
  - Numéros cliquables dans les parcours
  - Coordonnées USIC et astreintes

• Mode hors-ligne
  - Accès complet sans internet
  - Mises à jour automatiques

APPLICATION PROFESSIONNELLE RÉSERVÉE AUX PROFESSIONNELS DE SANTÉ

Conforme aux recommandations ESC (European Society of Cardiology) 2023 pour les syndromes coronaires aigus et ESC 2024 pour les syndromes coronaires chroniques.
\`\`\`

## Mises à jour

Les mises à jour de l'application web sont automatiques. Pour mettre à jour l'APK Play Store :
1. Incrémenter le numéro de version dans le manifest
2. Régénérer l'APK avec PWABuilder
3. Uploader la nouvelle version sur Play Console

## Support

Pour toute question : vercel.com/help
