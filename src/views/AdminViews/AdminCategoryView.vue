<!-- @format -->

<template>
	<NavBar />

	<div class="maindiv">
		<h1>Welcome to the Administration Page</h1>
		<!-- Add Category-->


		<div class="controls">
			<router-link to="/admin"><button>Back Admin Page</button></router-link>
			<button v-if="showButton == false" type="submit" @click="DisplayNewComment()">Add a Category</button>

		</div>
		<div>
			<row>
			<form @submit.prevent="addCategory(this.id, this.category_name, this.category_image)">
			<input v-if="showButton" v-model="this.category_name"  type="text" placeholder="New title" required/>
			<input v-if="showButton" v-model="this.category_image"  type="text" placeholder="Url image" required/>
			<button v-if="showButton" type="submit" >
            Add New Category
          </button>
			</form>
			</row>
		<!-- Submit Category-->
     
		</div>


		<div class="container">
			<h2>All Categories :</h2>
			<table class="table">
				<thead>
					<tr>
						<th>Nr° Category</th>
						<th>Category Image</th>
						<th>Title</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="category in this.categories" :key="category.id">
						<td class="description">{{ category.id }}</td>
						<td>
							<img class="imagecat" :src="category.category_image" />
						</td>
						<td class="description">{{ category.category_name }}</td>

						<td class="edit">
							<img class="bin" src="@/assets/bin.png" @click="removeCategory(category.id)" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	name: "AdminCategory",
	components: {
		NavBar,
	},

	data() {
		return {
			categories: [],
			isVisible: false,
			id: Number,
			showButton: false,
			newCategory:"",

		};
	},

	async mounted() {

    this.isLoading = true;

		this.fetchCategory ();
		if (this.$store.state.user.admin == 0 || this.$store.state.user.admin == null) {
			this.$router.push("/main");
		} else if (this.$store.state.user.userId == -1) {
			this.$router.push("/");
		}
	this.isLoading = false;

		
		
	},

	methods: {

		async fetchCategory (){
		let array = await fetch("http://146.59.157.162:3000/api/v1/category", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		this.categories = await array.json();
		},


		async removeCategory(id) {
			await fetch(`http://146.59.157.162:3000/api/v1/category/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			location.reload();
		},

		DisplayNewComment() {
    this.showButton = true;
    },
	

		async addCategory(id, category_name, category_image) {
			console.log("wow");
		await fetch(`http://146.59.157.162:3000/api/v1/category`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"id": id, 
						"category_name": category_name,
						"category_image": category_image,

				}),
	
		});
		this.category_name= "",
		this.category_image= "",
		this.isLoading = false;
		this.fetchCategory();
		this.newCategory = [];
		this.showButton = !this.showButton;
		},
	

	}
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

h1 {
	font-family: "Rock Salt", cursive;
	margin-bottom: 50px;
	margin-top: 20px;
	font-size: 200%;
}

h2 {
	font-family: "Montserrat" sans-serif bold;
	font-weight: bold;
	letter-spacing: 1, 5px;
	margin-bottom: 50px;
	margin-top: 0px;
	font-size: 20px;
}

.maindiv {
	background-color: #ffc812;
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


input{
	background-color: white;
	color: black;
	font-size: 16px;
	width: 280px;
	height: 30px;
	align-content: space-between;
	border-radius: 20px;
	font-family: "Rock Salt", cursive;
	color: grey;
	margin-left: 20px;
}


.controls {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	justify-content:space-between;
	margin-left: 50px;
	margin-right: 50px; 
	margin-bottom: 0px;
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
	align-items: center;

	/* overflow-wrap: normal; */
}

td {
	margin-top: 20px;
}

.imagecat {
	margin-top: 10px;
	height: 30px;
	width: 50px;
}

.bin {
	height: 25px;
	width: 25px;
}

#image {
	width: 70%;
	height: 70%;
	align-items: center;
	background-color: none;
}
</style>
