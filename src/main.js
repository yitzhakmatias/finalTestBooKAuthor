import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ChakraUIVuePlugin, { extendTheme } from '@chakra-ui/vue-next'

// Configurar un tema personalizado (opcional)
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

const app = createApp(App)

app.use(router)
app.use(ChakraUIVuePlugin, { extendTheme: theme });

app.mount('#app')
