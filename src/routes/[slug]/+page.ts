import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import workData from "../../data/workData.json"

const allContentImages = import.meta.glob<string>(
  "/src/content/**/*.{png,jpg,jpeg,webp,gif,webm}",
  { eager: true, query: "?url", import: "default" }
)

export const load: PageLoad = ({ params }) => {
  const project = workData.find((p) => p.href === params.slug)
  if (!project) error(404, "Not found")

  const images = Object.entries(allContentImages)
    .filter(([path]) => path.startsWith(`/src/content/${params.slug}/`))
    .map(([, url]) => url)
    .sort()

  const flipped = parseInt(project.index) % 2 === 0
  const hero = `/hero_images/${params.slug}_hero.png`

  return { project, hero, images, flipped }
}
