<!-- @format -->

<template>
	<NavBar />

	<div class="maindiv">
		<h1>Welcome to the Posts Administration Page</h1>

		<div class="controls">
			<router-link to="/admin"><button>Back Admin Page</button></router-link>
		</div>

		<div class="container">
			<h2>All posts :</h2>
			<table class="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Category</th>
						<th>Reputation</th>
						<th>Url Image</th>
						<th>Username</th>
						<th>Posted on</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="post in this.posts" :key="post.id">
						<td class="description">{{ post.title }}</td>
						<td class="description">{{ post.body }}</td>
						<td>{{ post.category }}</td>
						<td>{{ post.reputation }}</td>
						<td><img id="image" :src="post.image" class="description" /></td>
						<td>{{ post.user }}</td>
						<td>{{ format_date(post.posted_on) }}</td>

						<td class="edit">
							<img src="@/assets/bin.png" @click="removePost(post.id)" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import NavBar from "@/components/NavBar.vue";

export default {
	name: "AdminPost",
	components: {
		NavBar,
	},

	data() {
		return {
			posts: [],
			isVisible: false,
			id: Number,
		};
	},

	async mounted() {
		if (this.$store.state.user.admin == 0 || this.$store.state.user.admin == null) {
			this.$router.push("/main");
		} else if (this.$store.state.user.userId == -1) {
			this.$router.push("/");
		}
		let array = await fetch("http://146.59.157.162:3000/api/v1/postbyid", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		this.posts = await array.json();
	},

	methods: {
		format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},

		async removePost(id) {
			await fetch(`http://146.59.157.162:3000/api/v1/post/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			location.reload();
		},
	},
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

.maindiv {
	background-color: #ffc812;
}

h1 {
	font-family: "Rock Salt", cursive;
	margin-bottom: 10px;
	margin-top: 20px;

	font-size: 200%;
}

h2 {
	font-family: "Montserrat" sans-serif bold;
	font-weight: bold;
	letter-spacing: 1, 5px;
	margin-bottom: 30px;
	margin-top: 0px;
	font-size: 20px;
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
	width: 160px;
	height: 60px;
	font-size: 11px;
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
	flex-direction: row;
	justify-content: flex-start;
	margin-left: 50px;
	margin-bottom: 0px;
	padding-top: 0px;
}

.container {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px;
}

.container i {
	color: #3a829c;
}

thead {
	display: relative;
	table-layout: fixed;
	width: 80%;
	font-family: "Montserrat", sans-serif, bold;
	font-size: 15px;
	font-weight: bold;
	background-color: #f0bf1d;
}

img {
	width: 20px;
}

.table {
	justify-content: center;
	align-items: center;
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
	border-radius: 10px;
	font-size: 13px;
	background-color: white;
	overflow: hidden;
	text-overflow: ellipsis;
}

.edit {
	background-color: none;
	cursor: pointer;
}

.description {
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0px;
	/* overflow-wrap: normal; */
}

img {
	margin-top: 10px;
}

#image {
	width: 70%;
	height: 70%;
	align-items: center;
	background-color: none;
}
</style>
