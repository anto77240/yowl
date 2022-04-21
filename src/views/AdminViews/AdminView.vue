<!-- @format -->

<template>
	<NavBar />

	<div class="home">
		<div class="controls">
			<h1>Welcome to the Administration Page</h1>

			<router-link to="/admin/user"><button>Users Administration</button></router-link>
			<router-link to="/admin/post"><button>Posts Administration</button></router-link>
			<router-link to="/admin/category"><button>Categories Administration</button></router-link>
			<router-link to="/admin/KPI"
				><button>Check <br />KPI</button></router-link
			>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
	name: "AdminView",
	components: {
		NavBar,
	},
	mounted() {
		//console.log(this.$store.state.user);
		if (this.$store.state.user.admin == 0 || this.$store.state.user.admin == null) {
			this.$router.push("/main");
		} else if (this.$store.state.user.userId == -1) {
			this.$router.push("/");
		}
	},
};
</script>

<style scoped>
h1 {
	font-family: "Rock Salt", cursive;
	margin-top: 50px;
	font-size: 200%;
}

button {
	padding: 10px 18px;
	margin: 20px;
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	border-radius: 25px;
	cursor: pointer;
	font-weight: 700;
	width: 180px;
	height: 80px;
	font-family: "Montserrat", sans-serif;
	letter-spacing: 2px;
}

button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.controls {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
