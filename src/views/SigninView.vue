<!-- @format -->

<template>
	<body>
		<nav></nav>
		<div class="home">
			<div class="controls">
				<h1>Login</h1>
				<div class="signup">
					<form @submit.prevent="login">
						<label> Username </label>
						<input class="input is-primary is-rounded" type="text" v-model="username" required />
						<label> Password </label>
						<input
							class="input is-primary is-rounded"
							type="Password"
							v-model="password"
							required
						/>
						<div class="error" v-if="status == 'error_login'">Username and/or password invalid</div>
						<div class="error" v-if="this.ban">Your account has been banned</div>

						<div class="button">
							<button type="submit" v-if="status == 'loading'">Loading</button>
							<button type="submit" v-else>Login</button>
							<router-link to="/"><button>Back to Home</button></router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Login />
	</body>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "SignupView",
	data() {
		return {
			users: [],
			username: "",
			password: "",
			ban: false,
		};
	},
	computed: {
		...mapState(["status", "user"]),
	},
	methods: {
		login() {
			const self = this;
			// console.log("username:", this.username);
			// console.log("password", this.password);
			// console.log("tab", this.users);

			this.$store
				.dispatch("login", {
					username: this.username,
					password: this.password,
				})
				.then(
					function () {
						//console.log("find", find.id);
						//console.log("ok");
						if (self.$store.state.user.admin === 1) {
							self.$router.push("/admin");
						} else if (self.$store.state.user.banned == 0) {
							localStorage.removeItem("user");
							self.ban = !self.ban;
						} else {
							self.$router.push("/home");
						}
					},
					function (error) {
						error; //console.log(error);
					}
				);
			//console.log("user test", this.$store.state.user);
			//console.log("user login", this.$store.state.user.id);
		},
	},
};
</script>

<style scoped>
body {
	font-family: "Montserrat", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background: #ffc812;
	width: 100%;
}
.is-primary.input {
	border: 1px solid black;
	outline: none;
}

label {
	font-weight: 700;
}

.radio {
	font-weight: 400;
}

.inputRadio {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
}

.inputRadio input {
	margin: 0 10px;
}

.input {
	margin-bottom: 10px;
}

form {
	align-items: center;
}

.signup {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	margin: auto;
}

h1 {
	font-family: "Rock Salt", cursive;
	margin-bottom: 50px;
	font-size: 200%;
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

.button {
	background: #ffc812;
	border: none;
}

.error {
	color: #ff0000;
	margin-bottom: 10px;
	font-size: 1.2em;
	font-weight: bold;
}
</style>
