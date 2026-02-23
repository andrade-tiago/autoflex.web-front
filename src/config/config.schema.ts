import z from 'zod'

export const configSchema = z.object({
  VITE_API_URL: z.url(),
})
.transform(env => (
{
  apiUrl: env.VITE_API_URL,
}))
