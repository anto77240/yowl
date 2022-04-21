/** @format */

import { createStore } from "vuex";

const axios = require("axios");
const instance = axios.create({
	baseURL: "http://146.59.157.162:3000/api/v1",
});

let user = localStorage.getItem("user");
if (!user) {
	user = {
		userId: -1,
		token: "",
	};
} else {
	try {
		user = JSON.parse(user);
		instance.defaults.headers.common["Authorization"] = user.token;
	} catch (e) {
		user = {
			userId: -1,
			token: "",
		};
	}
}

const store = createStore({
	state: {
		status: "",
		commentStatus: "",
		user: user,
		commentInfos: {
			author: "",
			description: "",
			post_id: "",
		},
		userInfos: {
			id: "",
			username: "",
			email: "",
			avatar: "",
			admin: "",
			banned: "",
			password: "",
		},

		postInfos: {
			username_id: "",
			post_title: "",
			post_body: "",
			category: "",
			post_image: "",
		},
	},
	mutations: {
		setStatus: function (state, status) {
			state.status = status;
		},
		postStatus: function (state, status) {
			state.status = status;
		},
		commentStatus: function (state, status) {
			state.status = status;
		},
		logUser: function (state, user) {
			instance.defaults.headers.common["Authorization"] = user.token;
			localStorage.setItem("user", JSON.stringify(user));
			state.user = user;
			console.log("user", user);
		},
		userInfos: function (state, userInfos) {
			state.userInfos = userInfos;
			console.log("modify userInfos", userInfos);
		},
		commentInfos: function (state, comment) {
			state.commentInfos = comment;
		},
		logout: function (state) {
			state.user = {
				userId: -1,
				token: "",
			};
			localStorage.removeItem("user");
		},
		// OneuserInfo: function (state, OneuserInfo){
		// 	state.OneuserInfo = OneuserInfo;
		// }
	},
	actions: {
		createAccount: ({ commit }, userInfos) => {
			commit("setStatus", "loading");

			return new Promise((resolve, reject) => {
				commit;
				console.log(userInfos);

				instance
					.post("/users", userInfos)
					.then(function (response) {
						commit("setStatus", "created");
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_create");
						reject(error);
					});
			});
		},
		addPost: ({ commit }, postInfos) => {
			console.log("store info :", postInfos);
			commit("postStatus", "loading");

			return new Promise((resolve, reject) => {
				commit;
				console.log(postInfos);

				instance
					.post("/post", postInfos)
					.then(function (response) {
						commit("postStatus", "created");
						resolve(response);
					})
					.catch(function (error) {
						commit("postStatus", "error_create");
						reject(error);
					});
			});
		},

		addComments: ({ commit }, commentInfos) => {
			//console.log("store info :", commentInfos);
			commit("commentStatus", "loading");

			return new Promise((resolve, reject) => {
				commit;
				console.log(commentInfos);

				instance
					.post("/comments", commentInfos)
					.then(function (response) {
						commit("commentStatus", "created");
						commit("commentInfos", commentInfos);
						//console.log("response store", commentInfos);
						resolve(response);
					})
					.catch(function (error) {
						commit("commentStatus", "error_create");
						reject(error);
					});
			});
		},

		login: ({ commit }, userInfos) => {
			console.log("userInfos login", userInfos);
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				console.log(userInfos);

				instance
					.get("/users")
					.then(function (response) {
						console.log("response login", response.data);
						if (
							response.data.find(
								(user) =>
									user.username === userInfos.username && user.password === userInfos.password
							)
						) {
							const find = response.data.find(
								(user) =>
									user.username === userInfos.username && user.password === userInfos.password
							);
							//console.log("OK", response.data);
							commit("setStatus", "");
							commit("logUser", find);
							resolve(find);
						} else {
							commit("setStatus", "error_login");
						}
					})
					.catch(function (error) {
						commit("setStatus", "error_login");
						reject(error);
					});
			});
		},
		modifyAccount: ({ commit }, userInfos) => {
			commit("setStatus", "loading");

			return new Promise((resolve, reject) => {
				commit;
				console.log(userInfos);

				instance
					.put(`/users/${userInfos.id}`, userInfos)
					.then(function (response) {
						commit("setStatus", "modified");
						commit("logUser", userInfos);
						commit("userInfos", userInfos);
						console.log("modify store: Action", userInfos);

						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_modify");
						reject(error);
					});
			});
		},
		deleteAccount: ({ commit }, userInfos) => {
			commit("setStatus", "loading");

			return new Promise((resolve, reject) => {
				commit;
				console.log(userInfos);

				instance
					.delete(`/users/${userInfos.id}`)
					.then(function (response) {
						commit("setStatus", "deleted");
						commit("logUser", userInfos);
						commit("logout");

						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_delete");
						reject(error);
					});
			});
		},

		getUserInfos: ({ commit }) => {
			instance
				.get("/users")
				.then(function (response) {
					console.log(response.data);
					commit("userInfos", response.data);
				})
				.catch(function () {});
		},

		// fetchUserInfo({ commit }){
		// 	instance
		// 		.get(`/user/${store.state.OneuserInfo.id}`)
		// 		.then(response => {
		// 			commit('OneuserInfo', response)
		// 		})
		// },

		// async fetchUser(context) {
		// 	instance
		// 	.get(`/user/${context.id}`)
		// 	.then(function (response){
		// 		console.log(response.data);
		// 	})
		// 	.catch(function () {});
		// },
	},
});

export default store;
