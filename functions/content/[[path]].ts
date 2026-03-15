interface Env {
  BUCKET: R2Bucket
}

export const onRequest: PagesFunction<Env> = async ({ params, env }) => {
  const key = `content/${(params.path as string[]).join("/")}`
  const object = await env.BUCKET.get(key)

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
