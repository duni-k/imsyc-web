import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ params, platform }) => {
  const bucket = platform?.env?.BUCKET
  if (!bucket) {
    return new Response("R2 not configured", { status: 500 })
  }

  const key = `content/${params.path}`
  const object = await bucket.get(key)

  if (!object) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(object.body, {
    headers: {
      "Content-Type":
        object.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
