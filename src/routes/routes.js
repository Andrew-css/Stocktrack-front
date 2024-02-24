import {createRouter, createWebHashHistory} from 'vue-router'
import Nav from '../components/nav.vue'
import Home from '../components/home.vue'
import Ficha from '../components/ficha.vue'
import Cuentas from '../components/registro.vue'
import Login from '../components/login.vue'
import NuevaContra from '../components/nuevaContraseña.vue'
import recuperarContra from '../components/recuperarContraseña.vue'
import solicitar from '../components/solicitarPedido.vue'
import GestionProductos from '../components/gestionProductos.vue'
import Lote from '../components/lote.vue'
import Item from '../components/item.vue'
import Area from '../components/area.vue'
import formatoDevolucion from '../components/formatoDevoluciones.vue'
import historial from '../components/historialDevolucion.vue'
import historialPedido from '../components/historialPedido.vue'
import distribucionItemLote from '../components/distribucionItemLote.vue';
import distribucionLoteFicha from '../components/distribucionLoteFicha.vue';
import editarPerfil from '../components/editarPerfil.vue';
import useUsuarioStore from '../stores/usuarios.js'

const auth = (to, from, next) => {
  if (checkAuth()) {
      const userUsuario = useUsuarioStore()
      const rol = userUsuario.rol
      if (!to.meta.rol.includes(rol)) {
          return next({ name: 'login' })
      }
      next()
  } else {
      return next({ name: 'login' })
  }
}

const checkAuth = () => {
  const useUsuario = useUsuarioStore()

  const token = useUsuario.token

  if (useUsuario.login == "" || useUsuario.login === undefined) {
      return false;
  }
  if (!token) return false
  return true
};

const routes = [
  {path: '/', component: Login},
  {path: '/recuperar-password', component: recuperarContra},
  {path: '/nav', component: Nav, children:[
    {path:'/nav', redirect:'/home'},
    {path: '/home', component: Home , name: "home", beforeEnter: auth, meta: { rol: ['admin', 'bodega', 'instructor'] } },
    {path: '/fichas', component: Ficha},
    {path: '/cuentas', component: Cuentas},
    {path: '/nueva-password', component: NuevaContra},
    {path: '/solicitar-pedido', component: solicitar},
    {path: '/productos', component: GestionProductos},
    {path: '/lotes', component: Lote},
    {path: '/item', component: Item},
    {path: '/areas', component: Area},
    {path: '/formato-devolucion', component: formatoDevolucion},
    {path: '/historial', component: historial},
    {path: '/historial-pedido', component: historialPedido},
    {path: '/distribucion-item-lote', component: distribucionItemLote},
    {path: '/distribucion-lote-ficha', component: distribucionLoteFicha},
    {path: '/editar-perfil', component: editarPerfil}
  ]}
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})