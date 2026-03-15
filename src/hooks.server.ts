import type { Handle } from "@sveltejs/kit"
import workData from "./data/workData.json"

const slugs = new Set(workData.map((p) => p.href))

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname.slice(1)
  if (slugs.has(path)) {
    event.url.pathname = "/"
  }
  return resolve(event)
}
