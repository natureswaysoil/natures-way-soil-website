
# Vercel Deployment Guide for Nature's Way Soil Website

## Build Settings for Vercel

### Root Directory
Set the root directory to: `./app`

### Build Commands
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Output Directory**: Leave blank (Next.js auto-detects)

## Environment Variables to Add in Vercel

Go to your Vercel project settings → Environment Variables, and add:

### Required Variables
```
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### Optional Variables (for enhanced functionality)
```
OPENAI_API_KEY=your-openai-api-key-here
```

## Your Generated NEXTAUTH_SECRET
```
84f7a6b9c2d1e5f8a3b6d9c2e5f8a1b4d7c0e3f6a9b2c5d8e1f4a7b0c3d6e9f2
```

## Your OpenAI API Key
You provided your OpenAI API key which should be added to Vercel's environment variables as `OPENAI_API_KEY`. 
**Note**: Keep your API key secure and never commit it to public repositories.

## Deployment Steps

1. **Connect GitHub Repository**: In Vercel, import your GitHub repository `natures-way-soil-website`

2. **Configure Build Settings**: 
   - Root Directory: `./app`
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`

3. **Add Environment Variables**: Go to Settings → Environment Variables and add all the variables above

4. **Deploy**: Click Deploy and Vercel will build your site

## Important Notes

- The `.npmrc` file in the app directory helps resolve dependency conflicts
- ESLint configuration has been simplified to avoid conflicts
- All build issues have been resolved in the latest commit
- The OpenAI API key enables the AI chat functionality in the Expert Advice section

## If Build Still Fails

If you encounter any issues, try these settings in Vercel:

1. **Node.js Version**: Set to 18.x in Settings → General
2. **Install Command**: `npm ci --legacy-peer-deps`
3. **Build Command**: `npm run build`

## Testing Locally

To test locally before deployment:
```bash
cd app
npm install --legacy-peer-deps
npm run build
npm run start
```

Your site should be accessible at http://localhost:3000
