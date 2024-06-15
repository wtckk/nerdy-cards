import { Module } from '@/domain/Module'
import axios from 'axios'

const createModule = async (module: Module) => {
  axios
    .post(`/api/folder/create`, module)
    .then((response) => response.data)
    .catch((error) => console.log(error, 'Ошибка создания команды'))
}

const ModuleService = {
  createModule
}

export default ModuleService
