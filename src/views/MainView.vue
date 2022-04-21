<!-- @format -->

<template>
	<body>
		<NavBar />
		<router-link to="/addPost"><button class="button">Add a new post</button></router-link>
		<ScrollPosts />
	</body>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ScrollPosts from "../components/ScrollPosts.vue";
export default {
	components: {
		NavBar,
		ScrollPosts,
	},
	mounted() {
		//console.log(this.$store.state.user);
		if (this.$store.state.user.userId == -1 || this.$store.state.user.banned == 0) {
			this.$router.push("/");
		}
	},
};
</script>

<style scoped>
body {
	background-color: #ffc812;
	height: 1000%;
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
</style>
