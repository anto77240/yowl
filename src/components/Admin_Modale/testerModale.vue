<!-- @format -->

<template>
	<div class="modal-backdrop">
		<div class="descriptionModal">
			<div class="userid">
				<slot>
					This is the user id #<strong> {{ this.id }}</strong> !
				</slot>
			</div>
			<span>
				<!-- <h1>{{ this.users.username }}</h1> -->
				<p class="data">
					<strong>Username: </strong>
					<input class="username" v-model="this.users.username" type="textarea" />
				</p>
				<p class="data">
					<strong>Email: </strong
					><input class="useremail" v-model="this.users.email" type="textarea" />
				</p>

				<p class="data">
					<strong>Admin: </strong><span class="upright"> {{ this.users.admin }}</span>
					<select v-model="this.users.admin" :value="this.users.admin">
						<option>1</option>
						<option>0</option>
					</select>
				</p>
				<br />

				<p class="data">
					<strong>Actif: </strong><span class="upright"> {{ this.users.banned }}</span>
					<select v-model="this.users.banned" :value="this.users.banned">
						<option>1</option>
						<option>0</option>
					</select>
				</p>

				<button
					class="savebutton"
					type="button"
					@click="edit(this.users.username, this.users.email, this.users.admin, this.users.banned)"
				>
					Save changes
				</button>
			</span>

			<button class="comeback" type="button" @click="close">Come Back</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "testerModale",
	data() {
		return {
			isVisible: false,
			id: Number,
			users: [],
		};
	},
	props: {
		iduser: Number,
	},

	async mounted() {
		this.id = localStorage.getItem("userid");
		console.log("id localstorage", this.id);
		let array = await fetch(`http://146.59.157.162:3000/api/v1/users/${this.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		this.users = await array.json();
		this.users = this.users[0];

		console.log(this.users);
	},

	methods: {
		close() {
			this.$emit("close");
			// location.reload();
			// this.users;
			// console.log("fff");
		},

		async edit(username, email, admin, banned) {
			console.log(admin);
			// console.log("wow", this.email);
			let put = await fetch(`http://146.59.157.162:3000/api/v1/users/${this.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					email: email,
					admin: admin,
					banned: banned,
					password: this.users.password,
					avatar: this.users.avatar,
				}),
			});
			// this.users();
			location.reload();
			console.log(put);
			console.log("blabla", this.users.admin);
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
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.descriptionModal {
	background: #ffc812;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	width: 500px;
	height: 500px;
	border-radius: 10px;
}

.comeback {
	position: absolute;
	top: 0;
	right: 0;
	border: 2px solid #ffc812;
	border-radius: 25px;
	font-size: 14px;
	font-weight: 500;
	font-family: "Montserrat", sans-serif;
	padding: 10px;
	cursor: pointer;
	font-weight: bold;
	color: #ffc812;
	background: black;
	margin: 30px;
}

.comeback:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

.savebutton {
	width: 160px;
	height: 50px;
	color: #ffc812;
	background: black;
	align-items: center;
	justify-content: center;
	border-radius: 25px;
	margin: 50px;
}

.savebutton:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}

/* input{
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

} */

.data {
	padding: 20px;
	font-family: "Montserrat" sans-serif bold;
	font-size: 14px;
	font-weight: 300;
}

select {
	margin-left: 70px;
	background-color: white;
	color: black;
	font-size: 14px;
	border-radius: 20px;
}

.upright {
	font-family: "Rock Salt", cursive;
	font-size: 14px;
	padding: 20px;
}

.useradmin {
	width: 200px;
	background-color: #ffc812;
	border: none;
	border-width: 0px;
	font-family: "Rock Salt", cursive;
	font-size: 14px;
	padding: 10px;
	padding-left: 20px;
	align-content: center;
	justify-content: center;
}

.userid {
	margin-top: 15px;
	margin-bottom: 30px;
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
}

.username {
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

.useremail {
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
</style>
