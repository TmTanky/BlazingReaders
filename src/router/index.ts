import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Views 
import Root from '@/views/root/Root.vue'
import Blogs from '@/views/blogs/Blogs.vue'
import About from '@/views/about/About.vue'
import Login from '@/views/login/Login.vue'
import Signup from '@/views/signup/Signup.vue'
import Profile from '@/views/profile/Profile.vue'
import Settings from '@/views/settings/Settings.vue'
import PublisherProfile from '@/views/publishersProfile/PublishersProfile.vue'
import Admin from '@/views/admin/Admin.vue'
import ManageBlogs from '@/views/manageBlogs/ManageBlogs.vue'
import ViewBlog from '@/views/viewBlog/ViewBlog.vue'

// Typescripts
import { Roles } from '@/interfaces/enumsRole'

// State
import State from '../store/root/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {

      if (State.state.isAuth) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter(to, from, next) {

      if (State.state.isAuth) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth) {
        return next('/login')
      }

      return next()

    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth) {
        return next('/login')
      }

      return next()

    }
  },
  {
    path: '/usersprofile/:userID/:name',
    name: 'UsersProfile',
    component: PublisherProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth || State.state.rootUser.role !== Roles.ADMIN) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/manageblogs',
    name: 'Manage',
    component: ManageBlogs,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth || State.state.rootUser.role !== Roles.ADMIN) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/blog/:blogID',
    name: 'OneBlog',
    component: ViewBlog
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
