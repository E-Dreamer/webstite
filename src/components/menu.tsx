import { defineComponent } from 'vue'
import userRouteStore from '@/stores/addRoutes.ts'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'customMenu',
  setup() {
    const router = useRouter()
    const store = userRouteStore()
    console.log(store.menu, store.addRoutes)
    function menuClick(item: CustomRoute) {
      if (item.children?.length) return
      router.push({ path: item.path })
    }
    const MenuItem = (item: CustomRoute) => {
      if (item?.meta?.hidden) return ''
      return (
        <div
          key={item.name}
          style={{ cursor: 'pointer', marginLeft: '10px' }}
          onClick={() => menuClick(item)}
        >
          {item?.meta?.title}
        </div>
      )
    }
    const Menu = (list: CustomRoute[]) => {
      return list.map((item) => {
        if (item.children?.length) {
          return (
            <div>
              {MenuItem(item)}
              {Menu(item.children)}
            </div>
          )
        }
        return MenuItem(item)
      })
    }
    return () => <header style={{ display: 'flex' }}>{Menu(store.menu)}</header>
  },
})
