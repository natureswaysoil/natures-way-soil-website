# Nature's Way Soil Website

## Automated Build & Install Instructions

### Local Development

```bash
npm install --legacy-peer-deps
npm run build
npm run start
```

- Homepage must remain at `app/app/page.tsx`.
- All imports in homepage must exist and work.

### Vercel Deployment

- Build command: `npm run build`
- Install command: `npm install --legacy-peer-deps`
- Output directory: (Default, unless using custom Next.js export)

### Troubleshooting

- If you get dependency errors, always use `--legacy-peer-deps`.
- If homepage is blank or errors, check `app/app/page.tsx` and all its imports (especially `@/components/ui/button`).

## Checklist

- [x] `app/app/page.tsx` exists and works.
- [x] All homepage imports exist.
- [x] Build config (`next.config.js` or `vercel.json`) is present.
- [x] Build/install commands use `--legacy-peer-deps`.

## Automation

Automated checks run on push and PR:
- Verifies homepage and all imports exist.
- Verifies build config files.
- Installs/builds using recommended commands.

See `.github/workflows/check-homepage.yml` for details.