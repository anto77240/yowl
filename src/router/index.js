/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import Signup from "../views/SignupView.vue";
import Signin from "../views/SigninView.vue";

import AdminView from "../views/AdminViews/AdminView.vue";
import AdminUserView from "../views/AdminViews/AdminUserView.vue";
import AdminPostView from "../views/AdminViews/AdminPostView.vue";
import AdminCategoryView from "../views/AdminViews/AdminCategoryView.vue";
import AdminKPIView from "../views/AdminViews/AdminKPIView.vue";

import UserAccountView from "../views/UserAccountView.vue";

import ScrollPosts from "../components/ScrollPosts.vue";
import MainView from "../views/MainView.vue";

import AddPostView from "../views/AddPostView.vue";
import MyPostsView from "../views/MyPostsView.vue";
import MyPostView from "../views/MyPostView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/UserAccount/:id",
		name: "UserAccount",
		component: UserAccountView,
		props: true,
	},
	{
		path: "/signup",
		name: "signup",
		component: Signup,
	},
	{
		path: "/signin",
		name: "signin",
		component: Signin,
	},
	{
		path: "/admin",
		name: "admin",
		component: AdminView,
	},
	{
		path: "/admin/user",
		name: "admin_user",
		component: AdminUserView,
	},
	{
		path: "/admin/post",
		name: "admin_post",
		component: AdminPostView,
	},

	{
		path: "/admin/category",
		name: "admin_category",
		component: AdminCategoryView,
	},

	{
		path: "/admin/KPI",
		name: "kpi",
		component: AdminKPIView,
	},
	{
		path: "/scrollposts",
		name: ScrollPosts,
		component: ScrollPosts,
	},
	{
		path: "/home",
		name: MainView,
		component: MainView,
	},
	{
		path: "/addPost",
		name: AddPostView,
		component: AddPostView,
	},
	{
		path: "/myPosts/:id",
		name: MyPostsView.vue,
		component: MyPostsView,
	},
	{
		path: "/myPost/:id",
		name: MyPostView.vue,
		component: MyPostView,
	},
	// {
	//   path: '/about',
	//   name: 'about',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	// }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
