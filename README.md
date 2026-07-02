# Simulateur d'Ascenseur Intelligent

Une application web interactive et moderne de simulation d'ascenseur pour un immeuble de **10 étages** (du **RDC au Niveau 9**).

Conçue avec une approche orientée performance, l'interface utilisateur s'inspire du design sombre et épuré de Framer Studio, entièrement optimisée pour s'adapter à la hauteur de l'écran sans aucun défilement superflu.

---

# Instructions d'installation et de lancement

## Prérequis

Assurez-vous d'avoir installé :

- **Node.js** *(version 18 ou supérieure recommandée)*
- Un gestionnaire de paquets :
  - npm
  - yarn
  - pnpm

## Installation

Clonez ou téléchargez les sources du projet.

Ensuite, ouvrez votre terminal à la racine du projet puis installez les dépendances :

```bash
npm install
```

## Lancement

Pour démarrer l'application en mode développement :

```bash
npm run dev
```

Ouvrez ensuite votre navigateur à l'adresse locale fournie par Vite :

```txt
http://localhost:5173
```

---

# Choix techniques réalisés

## React + Vite

Vite a été sélectionné pour :

- Son démarrage extrêmement rapide
- Son système **Hot Module Replacement (HMR)** performant
- Une excellente expérience développeur

## Zustand

Zustand a été préféré à Redux ou à l'API Context native de React car il permet :

- Une gestion d'état globale légère
- Une meilleure réactivité
- Un accès synchrone via `get()`
- L'élimination des problèmes de **stale closures** liés aux `setInterval`

## Tailwind CSS v4

Utilisé pour :

- L'ensemble du design system
- Une mise en page fluide
- Les micro-interactions
- Le contrôle précis du layout plein écran (`h-screen`)

## Architecture SoC (Separation of Concerns)

L'application suit une architecture à responsabilités séparées :

- **Domaine** → logique métier pure
- **Store** → état global
- **Hooks** → orchestration temporelle
- **Composants** → affichage et interface utilisateur

---

# Architecture du projet

Le projet applique une séparation stricte des préoccupations grâce à une architecture modulaire :

```bash
src/
├── components/                    # 1. COUCHE PRÉSENTATION
│   ├── context/
│   │   └── Shaft.jsx              # Cage transparente de l'ascenseur
│   ├── ui/
│   │   └── Indicator.jsx          # Moniteur technique + boutons contrôle
│   ├── Cabin.jsx                  # Cabine avec portes animées
│   ├── CabinControl.jsx           # Pavé numérique interne
│   └── Floor.jsx                  # Ligne étage + bouton appel
│
├── core/                          # 2. COUCHE DOMAINE
│   └── elevatorStrategy.js        # Algorithme SCAN
│
├── hooks/                         # 3. COUCHE EFFETS & SYSTÈME
│   └── useElevatorSimulation.js   # Métronome réactif
│
├── store/                         # 4. COUCHE ÉTAT
│   └── useElevatorStore.js        # Source unique de vérité
│
├── App.jsx                        # Point d'entrée principal
├── App.css                        # Tailwind + scrollbars custom
└── main.jsx
```

---

# Fonctionnalités implémentées

## Fonctionnalités principales

### Visualisation dynamique

- Représentation graphique en temps réel des **10 étages**
- Cabine physique animée

### Appels internes et externes

Contrôle possible :

- Depuis l'extérieur via les boutons d'appel
- Depuis l'intérieur via un pavé numérique complet (`R → 9`)

### Algorithme d'optimisation SCAN

L'ascenseur :

- Conserve sa direction actuelle
- Continue jusqu'à épuisement des demandes dans ce sens
- Réduit les déplacements inutiles
- Limite l'usure mécanique simulée

### Animation physique des portes

Chaque arrêt déclenche :

- Ouverture des portes
- Pause de **2,5 secondes**
- Fermeture automatique
- Reprise du moteur

---

## Fonctionnalités bonus

### Pause / Reprise

Permet :

- D'arrêter instantanément la simulation
- D'interrompre les temporisations en cours

### Multiplicateur de vitesse

Modes disponibles :

- `1x`
- `2x`
- `4x`

Effets :

- Modification dynamique de la vitesse moteur
- Adaptation automatique du temps d'ouverture des portes

### Historique des déplacements (Logs Stream)

Console persistante retraçant :

- Les passages entre étages
- Les ouvertures de portes
- Les demandes enregistrées
- Les événements système

Exemple :

```txt
[INFO] Demande enregistrée : Niveau 5
[INFO] Ascenseur → Niveau 2
[INFO] Portes ouvertes
```

### Scrollbars premium personnalisées

Ajout de :

- Barres de défilement fines
- Transparence légère
- Intégration cohérente au thème sombre
- Prévention des décalages visuels

---

# Limites et pistes d'amélioration

## Appels externes orientés direction

Actuellement :

- Un seul bouton d'appel est disponible par étage

Amélioration envisagée :

Ajouter :

- ▲ Monter
- ▼ Descendre

Cela permettrait à l'algorithme SCAN :

- De mieux prioriser les arrêts
- D'éviter les arrêts inutiles
- D'améliorer le réalisme de simulation

---

## Gestion multi-cabines

Extension possible :

- Gestion simultanée de plusieurs ascenseurs
- Tableau de cabines dans le store global

Nouveaux besoins :

- Algorithme intelligent d'affectation
- Sélection automatique de l'ascenseur disponible le plus pertinent

---

# Stack technique

- React
- Vite
- Zustand
- Tailwind CSS v4

---