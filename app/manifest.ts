import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "theme_color":"#2b7fff",
    "background_color":"#2EC6FE",
    "icons": [
        {
            "purpose":"maskable",
            "sizes":"512x512",
            "src":"icon512_maskable.png",
            "type":"image/png"
        },
        {
            "purpose":"any",
            "sizes":"512x512",
            "src":"icon512_rounded.png",
            "type":"image/png"
        }
    ],
    "orientation":"any",
    "display":"standalone",
    "dir":"ltr",
    "lang":"en-GB",
    "name":"Open Meteo Visualizer",
    "short_name":"OM Visualizer",
    "start_url":"https://open-meteo-visualizer.harmoniedurrant.com/",
    "scope":"https://open-meteo-visualizer.harmoniedurrant.com/",
    "description":"An interactive weather forecast using the public Open Metéo public API.",
    "id":"https://open-meteo-visualizer.harmoniedurrant.com/"
  }
}