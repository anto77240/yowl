<template>
	<NavBar/>
	<ScrollPosts/>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import ScrollPosts from "../components/ScrollPosts.vue"
export default {
    components:{
        NavBar,
        ScrollPosts,
    },
}
</script>

<style scoped>
* {
	background-color: #ffc812;
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
