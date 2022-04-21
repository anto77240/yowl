<!-- @format -->

<template>
	<nav>
		<div class="header">
			<router-link to="/home"><img class="brand-logo" src="../assets/yowl.png" /></router-link>
			<router-link to="/admin"><button v-if="this.admin">Admin</button></router-link>

			<div class="hello">
				<!--<a href="#!" class="user-logo" @click="redirectToMyAccount(id)">-->

				<a href="#" class="user-logo" @click="redirectToMyAccount">
					<h2>Hello {{ user.username }}</h2>
					<img class="avatarimg" :src="user.avatar"
				/></a>
			</div>
			<a href="#" class="logout" @click="logout"><img src="../assets/check-out.png" /></a>
		</div>
	</nav>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "NavBar",
	data: () => {
		return {
			users: [],
			search: "",
			admin: false,
		};
	},

	props: {},
	computed: {
		...mapState(["status", "user"]),
	},
	mounted() {
		if (this.$store.state.user.admin == 1) {
			this.admin = true;
		}
	},

	methods: {
		async redirectToMyAccount() {
			this.$router.push(`/UserAccount/${this.$store.state.user.id}`);
			// this.$router.push({ name: "UserAccount" });
			// await fetch(`http://146.59.157.162:3000/api/v1/users/${id}`)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		this.users = data.users;
			// 	})
			// 	.catch((error) => console.log(error));
			// console.log(this.users);
		},
		logout() {
			this.$store.commit("logout");
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
nav {
	background-color: white;
	width: 100%;
	padding: 0px;
}

.header {
	justify-content: space-between;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}

#searchPosts {
	width: 50%;
	color: black;
}

.brand-logo {
	width: 100px;
}
.brand-logo:hover {
	transition: transform 0.15s linear;
	transform: scale(1.1);
}

.user-logo img {
	background-color: white;
	border-radius: 50px;
	height: 50px;
}

.is-primary.input {
	border: 1px solid black;
	outline: none;
}

.hello {
	display: flex;
	font-family: "Rock Salt", cursive;
	font-weight: 400px;
}

h2 {
	margin-right: 10px;
}

.logout {
	border: none;
	width: 50px;
	margin-left: 10px;
}

.logout:hover {
	transition: transform 0.15s linear;
	transform: scale(1.25);
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
	width: 140px;
}

button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.avatarimg:hover {
	transform: rotate(360deg);
	transition: transform 0.3s linear;
}
</style>
