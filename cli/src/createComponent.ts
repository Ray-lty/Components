import inquirer, { QuestionCollection } from 'inquirer'
import { ComponentInfo } from './domain/component-info'
import { initComponent } from './service/init-component'
import { closeLoading, showLoading } from './utils/loading-utils'
import { updateComponentLib } from './utils/update-component-lib'
// 交互提示
const questions: QuestionCollection = [
  {
    name: 'componentName',
    message: '请输入组件名称: ',
    default: ''
  },
  {
    name: 'description',
    message: '请输入组件描述: ',
    default: ''
  }
]

const create = async (componentName: string, description: string) => {
  showLoading('生成中，请稍等...')
  try {
    const componentInfo = new ComponentInfo(componentName, description)
    await initComponent(componentInfo)
    await updateComponentLib(componentInfo)

    closeLoading()
    console.log(
      `组件 [${componentInfo.lineName} ${componentInfo.zhName}] 创建完成!`
    )
  } catch (error) {
    closeLoading()
    console.error(error)
  }
}

export const createComponent = () => {
  inquirer.prompt(questions).then(({ componentName, description }) => {
    create(componentName, description)
  })
}
