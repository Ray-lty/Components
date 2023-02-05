import { ComponentInfo } from '../domain/component-info'
import fs from 'fs'
import path from 'path'
import { execCmd } from '../utils/cmd-utils'
import { Config } from '../config'
import { vueTemplate, indexTemplate } from '../utils/template-utils'

export const initComponent = (componentInfo: ComponentInfo) => new Promise((resolve, reject) => {
  if (fs.existsSync(componentInfo.fullPath)) {
    return reject(new Error('组件已存在'))
  }
  fs.mkdirSync(componentInfo.fullPath)
  execCmd(`cd ${componentInfo.fullPath} && pnpm init`).then(res => {
    modifyPackageJson(componentInfo)
    execCmd(`cd ${componentInfo.fullPath} && pnpm install @${Config.COMPONENT_LIB_NAME}/utils`)
    fs.mkdirSync(path.resolve(componentInfo.fullPath, 'src'))
    createSrcIndex(componentInfo)
    createIndex(componentInfo)
    console.log('组件创建成功')
    return resolve(componentInfo)
  })
    .catch(e => reject(e))
})

const modifyPackageJson = (componentInfo: ComponentInfo) => {
  const { fullPath, nameWithLib } = componentInfo
  const jsonPath = `${fullPath}/package.json`
  if (fs.existsSync(jsonPath)) {
    const json: { [k: string]: string, name: string } = JSON.parse(fs.readFileSync(jsonPath).toString() || '{}')
    json.name = nameWithLib
    fs.writeFileSync(jsonPath, JSON.stringify(json))
  }
}

const createSrcIndex = (componentInfo: ComponentInfo) => {
  const content = vueTemplate(componentInfo.lineNameWithPrefix, componentInfo.lowCamelName)
  const fileFullName = `${componentInfo.fullPath}/src/${componentInfo.lineName}.vue`
  fs.writeFileSync(fileFullName, content)
}

const createIndex = (componentInfo: ComponentInfo) => {
  fs.writeFileSync(`${componentInfo.fullPath}/index.ts`, indexTemplate(componentInfo))
}
