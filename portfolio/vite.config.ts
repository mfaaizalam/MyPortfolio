import {defineConfig, loadEnv, Plugin} from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only: runs api/contact.ts locally so the form works on npm run dev
const devApi = (): Plugin => ({
  name: 'dev-api',
  configureServer(server) {
    Object.assign(process.env, loadEnv('development', process.cwd(), ''))
    server.middlewares.use('/api/contact', async (req, res) => {
      let raw = ''
      for await (const chunk of req) raw += chunk
      const r: any = res
      r.status = (c: number) => { res.statusCode = c; return r }
      r.json = (o: unknown) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)) }
      try {
        const mod = await server.ssrLoadModule('/api/contact.ts')
        ;(req as any).body = raw
        await mod.default(req, r)
      } catch (e) {
        console.error(e)
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Server error' }))
      }
    })
  },
})

export default defineConfig({ plugins: [react(), devApi()], build: { chunkSizeWarningLimit: 1200 } })