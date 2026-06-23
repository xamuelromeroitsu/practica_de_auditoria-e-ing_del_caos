import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/practica_de_auditoria-e-ing_del_caos/', // <-- Añade esta línea con el nombre de tu repositorio
})
