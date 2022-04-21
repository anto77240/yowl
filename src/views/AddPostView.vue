<!-- @format -->

<template>
	<NavBar />
	<body>
		<nav></nav>
		<div class="home">
			<div class="controls">
				<h1>Add Post</h1>
				<div class="AddPost">
					<form @submit.prevent="addPost">
						<label> Post Title </label>
						<input class="input is-primary is-rounded" type="text" v-model="title" required />
						<p><label> Category </label></p>
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
						<!--<input class="input is-primary is-rounded" type="text" v-model="category" required />-->
						<p><label> Content </label></p>
						<textarea class="input is-primary is-rounded" type="text" v-model="content" />
						<label> Image </label>
						<input class="input is-primary is-rounded" type="text" v-model="image" required />
						<div class="button">
							<button type="submit">Submit post</button>
							<router-link to="/main"><button>Back to Home</button></router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "../components/NavBar.vue";
export default {
	name: "AddPostView",
	components: {
		NavBar,
	},
	data() {
		return {
			title: "",
			content: "",
			category: "",
			image: "",
			categories: [],
		};
	},
	computed: {
		...mapState(["user"]),
	},
	mounted() {
		console.log(this.$store.state.user);
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/");
		}
		this.getCategories();
	},
	methods: {
		addPost() {
			//const self = this;
			console.log("username:", this.$store.state.user.username);
			console.log("title", this.title);
			console.log("content", this.content);
			console.log("category", this.category);
			console.log("image", this.image);

			this.$store
				.dispatch("addPost", {
					username_id: this.$store.state.user.id,
					post_title: this.title,
					category: this.category,
					post_body: this.content,
					post_image: this.image,
				})
				.then(
					function (response) {
						console.log("response", response);
					},
					function (error) {
						console.log(error);
					}
				);
			console.log("user login", this.$store.state.user.id);
			this.$router.push("/main");
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
	},
};
</script>

<style scoped>
form {
	align-items: center;
}
.AddPost {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	margin: auto;
}

.is-primary.input {
	border: 1px solid black;
	outline: none;
}

h1 {
	font-family: "Rock Salt", cursive;
	margin-bottom: 50px;
	font-size: 150%;
}

label {
	font-weight: 700;
}

textarea {
	resize: none;
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
	margin-top: 30px;
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

select {
	border: 1px solid black;
	width: 352px;
}
</style>
