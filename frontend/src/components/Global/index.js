import UMiniAvatar from '@/components/Global/UMiniAvatar.vue'
import UButton from '@/components/Global/UButton.vue'
import UIconButton from '@/components/Global/UIconButton.vue'
import UInput from '@/components/Global/UInput.vue'

const components = [
  { name: 'UMiniAvatar', component: UMiniAvatar },
  { name: 'UButton', component: UButton },
  { name: 'UIconButton', component: UIconButton },
  { name: 'UInput', component: UInput }
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
