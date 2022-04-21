<!-- @format -->

<template>
	<div id="app">
		<h3>Trending</h3>

		<div class="trending">
			<span v-for="(trend, index) in this.trending" :key="index">
				<img @click="showCommentModal(trend.id)" class="imgTrend" :src="trend.image" />
			</span>
		</div>
		<h1>Posts</h1>
		<input
			id="searchPosts"
			class="input is-primary is-rounded"
			type="text"
			placeholder="Search some news..."
			v-model="this.search"
			v-on:keyup.enter="searchPost(this.search)"
		/>
		<div class="filter">
			<button @click="sortByReputation">The most popular</button>
			<button @click="sortByPostedOn">The oldest</button>
			<div class="select is-rounded">
				<select @change="sortByCategory(category)" v-model="category">
					<option>Filter by category</option>
					<option
						v-for="(cat, index) in this.categories"
						:key="index"
						v-bind:value="cat.category_name"
					>
						{{ cat.category_name }}
					</option>
				</select>
			</div>
		</div>
		<div v-if="filter" class="filtered">
			<button @click="cancel">Cancel filter</button>
		</div>
		<div class="post" v-for="post in posts" :key="post.id">
			<div class="post-details">
				<ul>
					<li>
						<h2>{{ post.title }}</h2>
					</li>
					<div class="content">
						<li><img class="articleImg" :src="post.image" /></li>
						<li>
							<p>{{ post.post_body }}</p>
						</li>
					</div>
					<li><strong>Posted on:</strong> {{ format_date(post.posted_on) }}</li>
					<li><strong>Posted by:</strong> {{ post.user }}</li>
				</ul>
				<CommentModal
					v-if="this.post && this.comments"
					:content="this.post"
					:comment="this.comments"
					v-show="isModalVisible"
					@close="closeModal"
					@addComment="getComments(post.id)"
				/>
				<div class="controls">
					<p class="like">
						<button class="onPost" @click="increaseLike(post.id, post.reputation)">
							<img src="@/assets/like.png" />
						</button>
						{{ post.reputation }}
					</p>
					<button class="onPost" @click="showCommentModal(post.id)">
						<img src="@/assets/speech-bubble.png" />
					</button>

					<a href="">
						<img src="@/assets/top.png" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import CommentModal from "@/components/CommentModal.vue";

import moment from "moment";
import axios from "axios";

const instance = axios.create({
	baseURL: "http://146.59.157.162:3000/api/v1",
});

export default {
	name: "ScrollPosts",
	components: {
		CommentModal,
	},
	data() {
		return {
			posts: [],
			limit: 1,
			busy: false,
			like: 0,
			isModalVisible: false,
			post: null,
			comments: [],
			categories: [],
			category: "Filter by category",
			filter: false,
			trending: [],
		};
	},
	computed: {
		...mapState(["userInfos"]),
	},
	methods: {
		format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},
		async loadMore() {
			let array = await fetch("http://146.59.157.162:3000/api/v1/postsjoin", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.posts = await array.json();
		},
		increaseLike(id, reputation) {
			console.log("id post", id);
			console.log("reputation", reputation);
			reputation++;
			console.log("reputation +1", reputation);

			instance
				.patch(`/post/${id}`, { reputation: reputation })
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			this.loadMore();
		},
		async showCommentModal(id) {
			//console.log(id);
			localStorage.setItem("postid", id);

			this.isModalVisible = true;
			this.getPost(id);
			this.getComments(id);
		},
		async getPost(id) {
			let array = await fetch(`http://146.59.157.162:3000/api/v1/postbyid/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.post = await array.json();
			console.log(this.post);
			//}
		},
		async getComments(id) {
			console.log("emmit", id);
			let array = await fetch(`http://146.59.157.162:3000/api/v1/comments/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.comments = await array.json();
			console.log("comments", this.comments);
		},
		async getPostTrending() {
			let array = await fetch("http://146.59.157.162:3000/api/v1/posttrending", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.trending = await array.json();
			console.log("trending post", this.trending);
		},
		closeModal() {
			this.isModalVisible = false;
			location.reload();
		},
		async getCategories() {
			let array = await fetch("http://146.59.157.162:3000/api/v1/category", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.categories = await array.json();
			console.log("cat", this.categories);
		},

		async searchPost(search) {
			let array = await fetch(`http://146.59.157.162:3000/api/v1/postsearch/${search}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.posts = await array.json();
			console.log(this.posts);
		},
		async sortByReputation() {
			this.filter = true;

			//console.log(this.posts);
			let array = await fetch("http://146.59.157.162:3000/api/v1/postreputation", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.posts = await array.json();
			console.log(this.posts);
		},

		async sortByPostedOn() {
			this.filter = true;
			console.log(this.posts);
			let array = await fetch("http://146.59.157.162:3000/api/v1/postpostedon", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.posts = await array.json();
			console.log(this.posts);
		},

		async sortByCategory(cat) {
			this.filter = true;
			console.log(cat);

			console.log(this.posts);
			let array = await fetch(`http://146.59.157.162:3000/api/v1/postcategory/${cat}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.posts = await array.json();
			console.log(this.posts);
		},
		cancel() {
			location.reload();
		},

		getNextPost() {
			window.onscroll = () => {
				console.log("Adding 1 more data results");
				let bottomOfWindow =
					document.documentElement.scrollTop + window.innerHeight >
					document.documentElement.offsetHeight - 1;
				if (bottomOfWindow) {
					console.log(bottomOfWindow);
					this.busy = true;
					axios.get("http://146.59.157.162:3000/api/v1/post").then((response) => {
						const append = response.data.slice(this.posts.length, this.posts.length + this.limit);
						this.posts = this.posts.concat(append);
						console.log("this.posts", this.posts);
					});
				}
			};
		},
	},
	created() {
		this.getPostTrending();
		this.loadMore();
		//this.getInfos();
	},
	mounted() {
		this.getCategories();
		//this.getNextPost();
	},
};
</script>

<style scoped>
h1 {
	font-family: "Rock Salt", cursive;
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 2rem;
}

h2 {
	font-size: 1.5rem;
	font-weight: bold;
	border-radius: 5px;
	margin-bottom: 5px;
}
.post {
	display: flex;
	background: #eee;
	width : 60%;
	border-radius: 1em;
	padding-left : 5%;
	padding-right: 5%;
	margin: 1em auto;
	box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}

.post-avatar {
	padding: 1em;
}

.post-avatar img {
	display: block;
	width: 100%;
	/* min-width: 64px; */
	height: auto;
	border-radius: 50%;
	margin: auto;
}

.post-details {
	padding: 0.5em;
	margin: auto;

	overflow: hidden;
	text-overflow: ellipsis;
}

.content {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	background: #ccc;
	width: 100%;
	padding: 0 0.5rem;
	border-radius: 5px;
	box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}

.controls {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
}

.post-name {
	margin: 0;
	padding: 0;
	font-size: 2rem;
	font-weight: 900;
}

#app {
	position: relative;
	width: 70%;
	margin-left: 15%;
	margin-right: 15%;
}

.articleImg {
	width: 80%;
	margin-left: 10%;
}

p {
	margin-left: 10px;
}

img {
	width: 25px;
	display: flex;
	flex-direction: inline-block;
	position: relative;
	margin-top: 0;
}

.is-primary.input {
	border: 1px solid black;
	outline: none;
}

.like {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.filter {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 0.5rem;
}

select {
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	font-weight: 700;
	width: 200px;
	height: 43px;
}

select:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}
.filter button {
	padding: 10px;
	margin: 10px;
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	border-radius: 25px;
	cursor: pointer;
	font-weight: 700;
	width: 200px;
	font-size: 1em;
}

.filter button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.filtered button {
	padding: 10px;
	margin: 10px;
	background: black;
	color: #ffc812;
	border: 2px solid #ffc812;
	border-radius: 25px;
	cursor: pointer;
	font-weight: 700;
	width: 200px;
	font-size: 1em;
}

.filtered button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.onPost {
	border: none;
	cursor: pointer;
}

.trending {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	margin-top: 1rem;
	margin-bottom: 2rem;
}

.imgTrend {
	width: 130px;
	height: 130px;
	border: 2px solid black;
	cursor: pointer;
	border-radius: 5px;
}

.imgTrend:hover {
	box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
	transition: transform 0.15s linear;
	transform: scale(1.25);
}

h3 {
	text-align: left;
	margin-left: 30px;
}
</style>
