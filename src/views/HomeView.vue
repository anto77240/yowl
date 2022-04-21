<!-- @format -->

<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/yowl.png" />

		<div class="controls">
			<h1>Dive into your interests</h1>

			<router-link v-if="isLogged" to="/UserAccount/{{this.id}}"
				><button>My Account</button></router-link
			>
			<router-link v-else to="/signin"><button>Sign in</button></router-link>

			<router-link to="/signup"><button>Sign up</button></router-link>
		</div>
	</div>
	<Login />
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
	name: "HomeView",
	components: {
		Login,
	},
	data: () => {
		return {
			isLogged: false,
			id: "",
		};
	},
	mounted() {
		//console.log(this.$store.state.user.id);
		if (localStorage.getItem("user")) {
			this.isLogged = !this.isLogged;
			this.id = this.$store.state.user.userId;
		} else {
			this.isLogged = false;
		}
	},
	methods: {
		async test() {
			await fetch("http://146.59.157.162:3000/api/v1/users", {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			})
				.then((response) => response.json())
				.then((response) => response);
			//console.log(toto);
		},
	},
};
</script>

<style scoped>
h1 {
	font-family: "Rock Salt", cursive;
	transform: rotate(-5deg);
	margin-bottom: 50px;
	font-size: 200%;
}

.home {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	background: #ffc812;
	height: 100vh;
}

.controls {
	display: flex;
	flex-direction: column;
	align-items: center;
}

button {
	padding: 10px 18px;
	margin: 10px;
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	border-radius: 25px;
	cursor: pointer;
	font-weight: 700;
	width: 100px;
}

button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

img {
	width: 400px;
	border-radius: 15px;
	box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
</style>
