<!-- @format -->

Comment Modal

<!-- @format -->

<template>
	<div class="modal-backdrop">
		<div
			class="descriptionModal"
			role="dialog"
			aria-labelledby="modalTitle"
			aria-describedby="modalDescription"
		>
			<header class="modal-header" id="modalTitle">
				<slot name="header">{{ this.description.title }}</slot>

				<button type="button" class="btn-close" @click="close" aria-label="Close modal">
					<img src="../assets/cross.png" />
				</button>
			</header>

			<section class="modal-body" id="modalDescription">
				<slot name="body" method="post" action="">
					<div class="content">
						<li><img class="articleImg" :src="this.description.image" /></li>
						<li>
							<p>{{ this.description.body }}</p>
						</li>
					</div>
					<div class="addComments">
						<p><button @click="hide">Add a comment</button></p>
						<input
							v-if="commentInput"
							placeholder="Type your comment here"
							class="input is-primary is-rounded"
							v-model="this.com"
							v-on:keyup.enter="addComments(this.com)"
						/>

						<div class="comments">
							<span v-for="(comment, index) in this.comments" :key="index">
								<p>
									<b>{{ comment.author }} </b>
									<i>{{ format_date(comment.posted_on) }}</i>
								</p>
								<p>
									{{ comment.description }}
								</p>
								<br />
							</span>
							<span>
								<p>
									<b>{{ this.newComment.author }}</b>
								</p>
								<p>{{ this.newComment.description }}</p>
							</span>
						</div>
					</div>
				</slot>
			</section>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	name: "CommentModal",
	data: () => {
		return {
			postId: "",
			description: [],
			comments: [],
			commentInput: false,
			com: "",
			newComment: [],
		};
	},
	props: {
		title: String,
		id: Number,
		isModalVisible: Boolean,
		post: [],
		content: [],
		comment: [],
	},
	watch: {
		comments(newValue, oldValue) {
			if (newValue != oldValue) {
				//console.log("Add comments");
				this.$emit("addComment");
			}
		},
	},

	created() {
		setTimeout(this.getInfos, 100);
		//this.getInfos();
		//console.log("description ", this.description.post_title);
	},
	methods: {
		hide() {
			this.commentInput = !this.commentInput;
		},
		getInfos() {
			this.description = this.content[0];
			this.comments = this.comment;
			//console.log("comment modal", this.comments);
			//console.log("comment store get infos", this.$store.state.commentInfos);
		},
		close() {
			this.$emit("close");
			localStorage.removeItem("postid");
		},
		addComments(com) {
			//console.log(com);

			this.$store
				.dispatch("addComments", {
					author: this.$store.state.user.username,
					description: com,
					post_id: localStorage.getItem("postid"),
				})
				.then(
					function (response) {
						//self.login();
						//console.log(response);
						response;
					},
					function (error) {
						error; //console.log(error);
					}
				);

			this.hide();
			this.$emit("addComment");
			setTimeout(this.getStoreInfos, 100);
		},
		getStoreInfos() {
			this.newComment = this.$store.state.commentInfos;
			//console.log("new comment", this.newComment);
		},
		format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},
	},
};
</script>
<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.descriptionModal {
	background: #ffffff;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	width: 600px;
	height: 700px;
	z-index: 10;
}
.btn-delete {
	border: none;
	margin-left: 10px;
	background: none;
}

.modal-header,
.modal-footer {
	padding: 15px;
	display: flex;
}

.modal-header {
	position: relative;
	border-bottom: 1px solid #eeeeee;
	color: black;
	background: #ffc812;
	font-weight: 700;
	justify-content: space-between;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	position: absolute;
	top: 0;
	right: 0;
	border: none;
	font-size: 20px;
	padding: 5px;
	cursor: pointer;
	font-weight: bold;
	color: black;
	background: transparent;
	width: 30px;
}

.btn-close:hover {
	border: none;
}

.is-primary.input {
	margin-top: 10px;
	border: 1px solid black;
	outline: none;
	width: 400px;
}

li {
	list-style: none;
}

img {
	width: 300px;
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

i {
	margin-left: 3px;
}
</style>
