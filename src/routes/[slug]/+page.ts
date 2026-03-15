import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import workData from "../../data/workData.json"

export const load: PageLoad = ({ params }) => {
  const project = workData.find((p) => p.href === params.slug)
  if (!project) error(404, "Not found")
  return { slug: params.slug }
}
