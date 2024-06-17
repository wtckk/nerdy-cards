type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export { Module, ModulesType }
