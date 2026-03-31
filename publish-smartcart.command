#!/bin/zsh
set -e
cd ~/Desktop/grocery-optimizer

git add .
if git diff --cached --quiet; then
  echo "No changes to publish."
  read -k 1 '?Press any key to close...'
  echo
  exit 0
fi

MSG="Update SmartCart $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$MSG"
git push -u origin main

echo
echo "Published: https://chadkoenigbot-design.github.io/smartcart/"
read -k 1 '?Press any key to close...'
echo
