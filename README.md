# Hawinet Coffee

Next.js App Router website for Hawinet Coffee Export. Includes the origin explorer, interactive map, responsive navigation, and sample-request email preparation.

## Development

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Vercel

Import `Mahiruni/HawinetCoffee`, use the repository root, and deploy `main`. The checked-in `vercel.json` selects Next.js, installs with `npm ci`, builds with `npm run build`, and uses `.next` output. No environment variables are required.

The sample form prepares a mailto email draft; the visitor must send the email from their email client. It does not submit to a backend.

The previous Vite entrypoint, configuration, dependencies, and custom Worker packaging have been removed.
