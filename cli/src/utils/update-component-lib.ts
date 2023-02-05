import path from 'path'
import { Config } from '../config'
import { ComponentInfo } from '../domain/component-info'
import { execCmd } from './cmd-utils'
import fs from 'fs'

export const updateComponentLib = async (componentInfo: ComponentInfo) => {
  const libPath = path.resolve(
    componentInfo.parentPath,
    Config.COMPONENT_LIB_NAME
  )
  try {
    await execCmd(`cd ${libPath} && pnpm install ${componentInfo.nameWithLib}`)
    updateComponentLibIndex(libPath, componentInfo)
    console.log('组件库更新成功')
  } catch (error) {
    console.error(error)
  }
}

const updateComponentLibIndex = (
  libPath: string,
  componentInfo: ComponentInfo
) => {
  const indexPath = path.join(libPath, 'index.ts')
  const content = fs.readFileSync(indexPath).toString()

  const s1 = content.indexOf('// notes for cli')
  const s2 = content.indexOf('] // components')

  const result =
    `${content.substring(0, s1)}` +
    `import ${componentInfo.upCamelName} from '${componentInfo.nameWithLib}'\n` +
    content.substring(s1, s2 - 1) +
    `,\n  ${componentInfo.upCamelName}\n` +
    content.substring(s2)

  fs.writeFileSync(indexPath, result)
}
