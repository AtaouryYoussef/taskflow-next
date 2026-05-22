# Configuration de Vercel Postgres pour TaskFlow

## 🚀 Étapes pour déployer sur Vercel

### 1. Créer une base de données Postgres sur Vercel

1. Va sur ton dashboard Vercel : https://vercel.com/dashboard
2. Sélectionne ton projet **taskflow-next**
3. Va dans l'onglet **Storage**
4. Clique sur **Create Database**
5. Choisis **Postgres**
6. Donne-lui un nom (par exemple: `taskflow-db`)
7. Sélectionne la région (choisis celle proche de toi)
8. Clique sur **Create**

### 2. Récupérer la DATABASE_URL

Une fois la base de données créée :
1. Dans Vercel, va dans **Storage** → Ta base de données
2. Clique sur l'onglet **Quickstart** ou **Settings**
3. Copie la valeur de **DATABASE_URL** (commence par `postgres://...`)
4. Cette URL sera **automatiquement** ajoutée comme variable d'environnement à ton projet Vercel

### 3. Configuration locale

Pour tester en local :
1. Ouvre ton fichier `.env`
2. Remplace `DATABASE_URL` par celle que Vercel t'a donnée (ou utilise une DB locale)
3. Lance les migrations :
   ```bash
   npx prisma migrate dev --name init
   ```

### 4. Déployer sur Vercel

#### Option A : Via Git (Automatique) - **RECOMMANDÉ**
```bash
git add .
git commit -m "Add Prisma database"
git push origin main
```

Vercel va automatiquement :
- Détecter les changements
- Installer les dépendances
- Générer le client Prisma (`prisma generate`)
- Build le projet
- **Appliquer les migrations automatiquement** (via `prisma migrate deploy`)

#### Option B : Forcer un nouveau déploiement
Si tu as déjà push ton code :
1. Va sur Vercel Dashboard → Ton projet
2. Clique sur **Deployments**
3. Clique sur les 3 points ⋯ du dernier déploiement
4. Clique sur **Redeploy**

### 5. Appliquer les migrations sur Vercel

**IMPORTANT** : Les migrations doivent être appliquées sur ta base de données Vercel.

Il y a 2 options :

#### Option 1 : Automatique (Build time)
Ajoute cette variable d'environnement sur Vercel :
- **Nom** : `DATABASE_URL`
- **Valeur** : (déjà configurée automatiquement)

Puis ajoute dans ton `package.json` (déjà fait ✅) :
```json
"build": "prisma generate && prisma migrate deploy && next build"
```

#### Option 2 : Manuel (depuis ton PC)
```bash
# Utilise la DATABASE_URL de Vercel dans ton .env
npx prisma migrate deploy
```

### 6. Vérifier le déploiement

1. Une fois le déploiement terminé, visite ton site : `https://ton-projet.vercel.app`
2. Teste d'ajouter un projet pour vérifier que la base de données fonctionne

## 🔧 Commandes utiles

```bash
# Générer le client Prisma
npx prisma generate

# Créer une nouvelle migration
npx prisma migrate dev --name nom_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
```

## 📊 Voir tes données

Pour explorer ta base de données :
```bash
npx prisma studio
```

Ou directement dans Vercel :
- Dashboard → Storage → Ta base → **Data** tab

## ⚠️ Notes importantes

- Le fichier `db.json` n'est **plus utilisé**
- Toutes les données sont maintenant dans PostgreSQL
- La base de données Vercel a un **plan gratuit limité** (30 jours, puis $20/mois)
- Alternative gratuite : **Neon** (https://neon.tech) ou **Supabase** (https://supabase.com)

## 🐛 En cas de problème

Si le build échoue sur Vercel :
1. Vérifie que `DATABASE_URL` est bien configurée dans Environment Variables
2. Regarde les logs de build dans Vercel
3. Assure-toi que `prisma generate` est dans le script `build`
