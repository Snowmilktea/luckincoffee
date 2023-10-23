// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Popup,Badge,Icon,Stepper,SubmitBar,Sidebar,SidebarItem,Button,Tabbar,TabbarItem,Col,Row,Search,Swipe,SwipeItem,Tag,Sticky,NavBar,SwipeCell} from 'vant';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Col)
app.use(Row)
app.use(Search)
app.use(Swipe)
app.use(SwipeItem)
app.use(Tag)
app.use(Sticky)
app.use(Sidebar)
app.use(SidebarItem)
app.use(NavBar)
app.use(SwipeCell)
app.use(Stepper)
app.use(SubmitBar)
app.use(Icon)
app.use(Badge)
app.use(Popup)

app.mount('#app')
