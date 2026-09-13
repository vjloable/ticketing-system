#!/usr/bin/env bash
#
# Bump the package.json version and create a matching git tag — locally only.
# Nothing is pushed. Push manually when ready:
#
#   git push origin main --follow-tags
#
# (Pushing a v* tag is what triggers the Deploy workflow.)
#
# Usage:
#   scripts/release.sh patch     # 0.1.0 -> 0.1.1
#   scripts/release.sh minor     # 0.1.0 -> 0.2.0
#   scripts/release.sh major     # 0.1.0 -> 1.0.0
#   scripts/release.sh 1.4.2      # explicit version
#
set -euo pipefail

cd "$(dirname "$0")/.."

BUMP="${1:-}"

if [[ -z "$BUMP" ]]; then
  echo "Usage: scripts/release.sh <patch|minor|major|X.Y.Z>" >&2
  exit 1
fi

# Refuse to run on a dirty tree — npm version would refuse anyway, but this
# gives a clearer message.
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is dirty. Commit or stash your changes first." >&2
  exit 1
fi

CURRENT="$(node -p "require('./package.json').version")"

# npm version bumps package.json + package-lock.json, commits, and creates an
# annotated tag "vX.Y.Z". It does NOT push. --sign-git-tag is left off so this
# works without a GPG key configured.
NEW_TAG="$(npm version "$BUMP" -m "chore(release): v%s")"

echo ""
echo "Bumped: $CURRENT -> ${NEW_TAG#v}"
echo "Created commit and tag: $NEW_TAG (not pushed)"
echo ""
echo "To publish and trigger deploy:"
echo "  git push origin $(git rev-parse --abbrev-ref HEAD) --follow-tags"
echo ""
echo "To undo (before pushing):"
echo "  git tag -d $NEW_TAG && git reset --hard HEAD~1"
