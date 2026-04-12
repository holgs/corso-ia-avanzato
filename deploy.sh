#!/bin/bash
# Deploy: corso-ia-avanzato → GitHub → Vercel
set -e

REPO_NAME="corso-ia-avanzato"
GITHUB_USER="holgs"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📁 Cartella: $DIR"
cd "$DIR"

# --- GIT INIT ---
if [ ! -d ".git" ]; then
  git init
  git branch -M main
  echo "✓ git init"
fi

git add -A
git commit -m "Corso IA Avanzato: menu unificato 13/4 15/4 22/4 + fix accenti" 2>/dev/null || echo "(nessun cambiamento da committare)"

# --- GITHUB ---
if command -v gh &>/dev/null; then
  echo "→ Uso gh CLI per creare il repo..."
  gh repo create "$GITHUB_USER/$REPO_NAME" --public --source=. --remote=origin --push 2>/dev/null || {
    # repo esiste già, aggiungi remote e fai push
    git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git" 2>/dev/null || \
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
    git push -u origin main --force
  }
else
  echo ""
  echo "⚠️  gh CLI non trovato."
  echo "Crea manualmente il repo su: https://github.com/new"
  echo "  Nome: $REPO_NAME  |  Pubblico  |  NON inizializzare con README"
  echo ""
  echo "Poi esegui:"
  echo "  git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
  echo "  git push -u origin main"
  exit 1
fi

echo ""
echo "✅ Codice su GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# --- VERCEL ---
if command -v vercel &>/dev/null || npx --yes vercel --version &>/dev/null 2>&1; then
  echo "→ Deploy su Vercel..."
  npx vercel --prod --yes 2>/dev/null || {
    echo "Accedi a https://vercel.com/new e importa il repo GitHub."
  }
fi

echo ""
echo "🎉 Fatto! Vai su https://vercel.com/dashboard per trovare il link pubblico."
