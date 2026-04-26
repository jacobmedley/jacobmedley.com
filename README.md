# jacobmedley.com

## First-time setup
Run `npm run dev` — it auto-creates the `public/images` junction on first run.
On Linux/Mac the junction falls back to a symlink. No manual steps needed.
The `public/images` path is gitignored — never commit the images directory
itself, only the script that creates the link.