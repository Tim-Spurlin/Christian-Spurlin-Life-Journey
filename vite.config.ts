import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';
import { Readable } from 'stream';

function audioProxyPlugin(): Plugin {
  return {
    name: 'audio-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/audio-stream', async (req: IncomingMessage, res: ServerResponse) => {
        try {
          const parsedUrl = new URL(req.url || '', 'http://localhost:3000');
          const targetUrl = parsedUrl.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Missing url parameter');
            return;
          }

          let fetchUrl = targetUrl;
          if (fetchUrl.includes('dropbox.com') || fetchUrl.includes('dropboxusercontent.com')) {
            fetchUrl = fetchUrl.replace('&dl=0', '&raw=1').replace('?dl=0', '?raw=1');
            if (!fetchUrl.includes('raw=1')) {
              fetchUrl += (fetchUrl.includes('?') ? '&' : '?') + 'raw=1';
            }
          }

          const requestHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          };

          if (req.headers.range) {
            requestHeaders['Range'] = req.headers.range;
          }

          const upstreamRes = await fetch(fetchUrl, {
            headers: requestHeaders,
          });

          // Determine audio content type
          let contentType = 'audio/wav';
          if (fetchUrl.toLowerCase().includes('.mp3')) {
            contentType = 'audio/mpeg';
          } else if (fetchUrl.toLowerCase().includes('.wav')) {
            contentType = 'audio/wav';
          } else if (fetchUrl.toLowerCase().includes('.mp4')) {
            contentType = 'video/mp4';
          }

          res.statusCode = upstreamRes.status;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Accept-Ranges', 'bytes');
          res.setHeader('Content-Type', contentType);

          const contentRange = upstreamRes.headers.get('content-range');
          if (contentRange) {
            res.setHeader('Content-Range', contentRange);
          }

          const contentLength = upstreamRes.headers.get('content-length');
          if (contentLength) {
            res.setHeader('Content-Length', contentLength);
          }

          if (req.method === 'HEAD' || !upstreamRes.body) {
            res.end();
            return;
          }

          // Direct pipe to response
          const nodeStream = Readable.fromWeb(upstreamRes.body as any);
          nodeStream.on('error', (err) => {
            console.warn('Audio stream error during transfer:', err);
            if (!res.headersSent) {
              res.statusCode = 502;
            }
            res.end();
          });
          nodeStream.pipe(res);
        } catch (err: any) {
          console.error('Audio stream proxy fatal error:', err);
          if (!res.headersSent) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Audio upstream fetch error');
          } else {
            res.end();
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), audioProxyPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
