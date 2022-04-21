<!-- @format -->

<template>
	<NavBar />
	<div class="body">
		<div class="userInfos">
			<label for="email"
				>Email : {{ user.email }} <br /><input
					v-show="isModifyVisible"
					type="email"
					id="email"
					class="input is-primary is-rounded"
					v-model="this.email"
				/>
			</label>
			<label for="username"
				>Username : {{ user.username }} <br /><input
					v-show="isModifyVisible"
					type="username"
					id="username"
					class="input is-primary is-rounded"
					v-model="this.username"
				/>
			</label>
			<label for="password"
				>Password : ***** <br /><input
					v-show="isModifyVisible"
					type="Password"
					id="username"
					class="input is-primary is-rounded"
					v-model="this.password"
					required
				/>
			</label>
			<label for="picture"
				>My picture : <br />
				<input
					v-show="isModifyVisible"
					type="picture"
					id="picture"
					class="input is-primary is-rounded"
					v-model="this.avatar"
				/><br />
				<img :src="user.avatar" />
			</label>
		</div>
		<button class="button" @click="toggle()">Modify my account</button>

		<button class="button" v-if="isModifyVisible" @click="modifyAccount()">Save</button>
		<button class="button" v-else @click="deleteAccount()">Delete my account</button>
		<button class="button" @click="goToMyPosts(user.id)">Show my posts</button>
	</div>
</template>
<script>
import { mapState } from "vuex";

import NavBar from "../components/NavBar.vue";
export default {
	name: "UserAccountView",
	components: {
		NavBar,
	},
	data: () => {
		return {
			isModifyVisible: false,
			username: "",
			email: "",
			password: null,
			avatar: "",
		};
	},
	// created() {
	// 	this.email = this.$store.state.user.email;
	// 	this.username = this.$store.state.user.username;
	// 	this.password = this.$store.state.user.password;
	// 	this.avatar = this.$store.state.user.avatar;
	// },
	mounted() {
		this.username = this.$store.state.user.username;
		this.email = this.$store.state.user.email;
		this.avatar = this.$store.state.user.avatar;
		console.log(this.$store.state.user);
		if (this.$store.state.user.userId == -1 || this.$store.state.user.banned == 0) {
			this.$router.push("/");
		}
	},
	computed: {
		...mapState(["status", "user"]),
	},
	methods: {
		toggle() {
			this.isModifyVisible = !this.isModifyVisible;
		},
		modifyAccount() {
			//console.log("admin? ", this.$store.state.user.admin);
			if (this.password == null) {
				this.password = this.$store.state.user.password;
			}
			this.$store
				.dispatch("modifyAccount", {
					id: this.$store.state.user.id,
					username: this.username,
					email: this.email,
					password: this.password,
					avatar: this.avatar,
					admin: this.$store.state.user.admin,
					banned: this.$store.state.user.banned,
				})
				.then(
					function (response) {
						//self.login();
						console.log(response);
					},
					function (error) {
						console.log(error);
					}
				);
			this.isModifyVisible = false;
			//alert('Your changes have been taken into account.')
			//location.reload();
		},
		deleteAccount() {
			if (confirm("Are you sure you want to delete your account?")) {
				this.$store
					.dispatch("deleteAccount", {
						id: this.$store.state.user.id,
					})
					.then(
						function (response) {
							console.log(response);
						},
						function (error) {
							console.log(error);
						}
					);
			}
			this.$router.push("/");
			location.reload();
			//this.$store.mutations.logout;
		},
		goToMyPosts(id) {
			this.$router.push(`/myPosts/${id}`);
			console.log("id = ", id);
		},
	},
};
</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
* {
	background-color: #ffc812;
}
label {
	display: block;
	flex-wrap: nowrap;
	align-content: space-between;
	font-weight: 700;
	margin-bottom: 10px;
}

.is-primary.input {
	border: 1px solid black;
	outline: none;
}
input {
	background-color: white;
	color: black;
	font-size: 16px;
	width: 200px;
	align-content: space-between;
	border-radius: 20px;
}

.userInfos {
	display: flex;
	flex-direction: column;
	flex: wrap;
	width: 100%;
	justify-content: space-evenly;
	padding-top: 40px;
}

button {
	padding: 10px;
	margin: 10px;
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	border-radius: 25px;
	cursor: pointer;
	font-weight: 700;
	width: 200px;
}

button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

img {
	margin-top: 20px;
	border-radius: 500px;
	border: 2px solid black;
}
</style>
