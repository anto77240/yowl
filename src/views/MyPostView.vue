<!-- @format -->

<template>
	<NavBar />
	<div class="title">My post :</div>
	<div class="wrapper">
		<p class="data">
			<strong>Post title : </strong><input v-model="this.post.title" type="textarea" />
		</p>
		<p class="data">
			<strong>Content : </strong><input v-model="this.post.body" type="textarea" />
		</p>

		<p class="data">
			<strong>Category : </strong> <span>{{ this.post.category }}</span>
		</p>
		<div class="select is-rounded">
			<select v-model="category" required>
				<option
					v-for="(cat, index) in this.categories"
					:key="index"
					v-bind:value="cat.category_name"
				>
					{{ cat.category_name }}
				</option>
			</select>
		</div>
		<p class="data"><strong>Image : </strong><input v-model="this.post.image" type="textarea" /></p>
		<p class="data"><strong>Posted on : </strong>{{ format_date(this.post.posted_on) }}</p>
		<button class="comeback" type="button" @click="goBack(this.id)">Come Back</button>
		<button
			class="savebutton"
			type="button"
			@click="edit(this.post.body, this.post.title, this.post.image)"
		>
			Save changes
		</button>
	</div>
</template>

<script>
import moment from "moment";
import NavBar from "../components/NavBar.vue";

export default {
	components: {
		NavBar,
	},
	data() {
		return {
			post: [],
			id: Number,
			categories: [],
			// category: "",
		};
	},
	created() {
		this.getCategories();
	},
	async mounted() {
		this.id = localStorage.getItem("Post");
		//console.log("Post ID", this.id);
		let array = await fetch(`http://146.59.157.162:3000/api/v1/postbyid/${this.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		this.post = await array.json();
		this.post = this.post[0];
		/* console.log("post", this.post);
		console.log("post_title", this.post.title);
		console.log("post_body", this.post.body);
		console.log("post_category", this.post.category);
		console.log("post_image", this.post.image);
		console.log("posted_on", this.post.posted_on); */
		/* console.log("myPosts", this.myPosts); */
	},
	methods: {
		format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},
		async edit(body, title, image) {
			// console.log("this.category", this.category);
			// console.log("body", body);
			// console.log("post.body", this.post.body);
			// console.log("post.title", this.post.title);
			// console.log("this.id ", this.id);
			await fetch(`http://146.59.157.162:3000/api/v1/post/${this.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					post_body: body,
					post_title: title,
					category: this.category,
					post_image: image,
				}),
			});
			/* localStorage.clear(); */
			/* location.reload(); */
			//console.log("put", put);
			alert("Your changes have been taken into account.");
		},
		async getCategories() {
			let array = await fetch("http://146.59.157.162:3000/api/v1/category", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.categories = await array.json();
			//console.log("cat", this.categories);
		},
		goBack(id) {
			this.$router.push(`/UserAccount/${id}`);
		},
	},
};
</script>

<style scoped>
.wrapper {
	width: 60%;
	margin: auto;
	background: #ccc;
	justify-content: center;
	border-radius: 20px;
}

.title {
	font-family: "Rock Salt", cursive;
	font-size: 16px;
	padding-top: 20px;
}

.savebutton {
	width: 20%;
	height: 40px;
	color: #ffc812;
	background: black;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	margin-bottom: 2%;
}

.savebutton:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.comeback {
	width: 20%;
	height: 40px;
	color: #ffc812;
	background: black;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	margin-bottom: 2%;
}

.comeback:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

input {
	background-color: white;
	color: black;
	font-size: 10px;
	font-weight: 300;
	width: 50%;
	height: 3%;
	align-content: space-between;
	border-radius: 20px;
	font-family: "Rock Salt", cursive;
	color: grey;
	margin-left: 20px;
}

.data {
	padding: 20px;
	font-family: "Montserrat" sans-serif bold;
	font-size: 14px;
	font-weight: 300;
}
</style>
