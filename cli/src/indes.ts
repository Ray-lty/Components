import { createComponent } from './createComponent'
import { program } from 'commander'

export const main = () => {
  program.version(require('../package').version)

  program
    .command('create')
    .description('创建全新组件')
    .alias('c')
    .action(createComponent)
    .parse(process.argv)
}
