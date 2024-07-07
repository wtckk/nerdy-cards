import UMiniAvatar from '@/components/Global/UMiniAvatar.vue'
import UButton from '@/components/Global/UButton.vue'
import UIconButton from '@/components/Global/UIconButton.vue'
import UInput from '@/components/Global/UInput.vue'
import UTooltip from '@/components/Global/UTooltip.vue'

const components = [
  { name: 'UMiniAvatar', component: UMiniAvatar },
  { name: 'UButton', component: UButton },
  { name: 'UIconButton', component: UIconButton },
  { name: 'UInput', component: UInput },
  { name: 'UTooltip', component: UTooltip }
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
