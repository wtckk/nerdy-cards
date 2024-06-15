import { Module } from '@/domain/Module'
import axios from 'axios'

const createModule = async (newModule: object): Promise<Module | Error> => {
  try {
    const response = await axios.post(`http://localhost:3000/api/folder/create`, newModule, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5M2Q1MDM1Zi0xYWI3LTQ1OWEtOTEyNC01ZGU1YmNlMjJlYjYiLCJ1c2VybmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcxODQ2NTgwOCwiZXhwIjoxNzE4NDczMDA4fQ.5dWzsed6URlLVfPK1FgF9N8RAPif5m-0fxTjWru6rlU'
      }
    })
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка создания модуля')
    return error
  }
}

const ModuleService = {
  createModule
}

export default ModuleService
