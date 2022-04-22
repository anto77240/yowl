<!-- @format -->

<template>
	<NavBar />

	<div class="maindiv">
		<h1>Welcome to the Users Administration Page</h1>

		<div class="controls">
			<router-link to="/admin"><button>Back Admin Page</button></router-link>
		</div>

		<div class="container">
			<h2>All users :</h2>
			<table class="table">
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Birthday</th>
						<th>Admin</th>
						<th>Created_at</th>
						<th>Actif</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in this.users" :key="user.id">
						<td>{{ user.username }}</td>
						<td>{{ user.email }}</td>
						<td>{{ user.gender }}</td>
						<td>{{ format_date(user.birthday) }}</td>
						<td>{{ user.admin }}</td>
						<td>{{ format_date(user.created_at) }}</td>
						<td>{{ user.banned }}</td>
						<td class="edit">
							<!-- <router-link to="/admin/user"></router-link>  -->
							<img src="@/assets/editing.png" id="show-modal" @click="showModal(user.id)" />
							<testerModale v-show="isVisible" :iduser="user.id" @close="closeModal" />

							<!-- <modal v-if="showModal" @close="showModal = false"> -->
						</td>

						<td class="edit">
							<img src="@/assets/bin.png" @click="removeUser(user.id)" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

import moment from "moment";
import testerModale from "@/components/Admin_Modale/testerModale.vue";

export default {
	name: "AdminUser",
	components: {
		testerModale,
		NavBar,
	},

	data() {
		return {
			users: [],
			isVisible: false,
			id: Number,
		};
	},

	mounted() {
		this.fetchUsers();

		//console.log(this.$store.state.user);
		if (this.$store.state.user.admin == 0 || this.$store.state.user.admin == null) {
			this.$router.push("/main");
		} else if (this.$store.state.user.userId == -1) {
			this.$router.push("/");
		}
	},

	methods: {
		async fetchUsers() {
			let array = await fetch("http://146.59.157.162:3000/api/v1/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			this.users = await array.json();
		},

		format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},

		async removeUser(id) {
			await fetch(`http://146.59.157.162:3000/api/v1/users/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			location.reload();
		},

		showModal(id) {
			this.isVisible = true;
			//console.log(id);
			localStorage.setItem("userid", id);
			// localStorage.clear(id);
			// if(this.users.admin === 0) {
			// 	this.users.admin === "non"
			// }
			// console.log(this.users.admin)
		},

		closeModal() {
			this.isVisible = false;
			//console.log("1");
			//location.reload();
			this.fetchUsers();
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
	margin-bottom: 50px;
	font-size: 200%;
	margin-top: 10px;
}

h2 {
	font-family: "Montserrat" sans-serif bold;
	font-weight: bold;
	letter-spacing: 1, 5px;
	margin-bottom: 50px;
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
}

.edit {
	background-color: none;
	cursor: pointer;
}

td {
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
