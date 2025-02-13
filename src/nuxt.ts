import { Options } from './types'
import unplugin from '.'

export default function(this: any, options: Options) {
  options.exclude = options.exclude || [/node_modules/, /\.git/, /\.nuxt/]

  // install webpack plugin
  this.extendBuild((config: any) => {
    config.plugins = config.plugins || []
    config.plugins.unshift(unplugin.webpack(options))
  })

  // install vite plugin
  this.nuxt.hook('vite:extend', async(vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })
}
