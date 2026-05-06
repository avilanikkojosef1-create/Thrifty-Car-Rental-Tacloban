import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloud Run provides the port in the PORT environment variable. Defaults to 3000 if not provided.
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { index: false })); // Don't serve index.html automatically

// For all other routes, serve index.html with injected runtime env vars (SPA routing)
app.get('*', (req, res) => {
  // If the request looks like a file (has an extension) but wasn't served by express.static, return 404
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return res.status(404).send('Not Found');
  }

  const indexPath = path.join(distPath, 'index.html');
  try {
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('Not Found: the build output is missing. Ensure the app is correctly built.');
    }
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Inject runtime environment variables
    const envVars = {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
    };
    
    const envScript = `<script>window.__ENV__ = ${JSON.stringify(envVars)};</script>`;
    html = html.replace('</head>', `${envScript}</head>`);
    
    res.send(html);
  } catch (err) {
    console.error('Error serving index.html:', err);
    res.status(404).send('Not Found: the build output is missing. Ensure the app is correctly built.');
  }
});

// Bind to 0.0.0.0 to ensure Cloud Run can route traffic to it
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
