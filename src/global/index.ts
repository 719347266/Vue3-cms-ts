import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  console.log(app, 'app')

  app.use(registerElement)
  app.use(registerProperties)
}
