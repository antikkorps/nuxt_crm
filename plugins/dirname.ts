import { dirname } from "path"
import { fileURLToPath } from "url"

export default defineNuxtPlugin(() => {
  // @ts-ignore
  if (typeof global.__dirname === "undefined") {
    // @ts-ignore
    global.__dirname = (url: string) => dirname(fileURLToPath(url))
  }
})
