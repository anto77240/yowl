<!-- @format -->

<template>
	<nav></nav>
	<div class="home">
		<div class="controls">
			<h1>To share your ideas with us, please create an account !</h1>
			<div class="signup">
				<label> Username </label>
				<input class="input is-primary is-rounded" type="text" />
				<label> E-mail </label>
				<input class="input is-primary is-rounded" type="email" />
				<label> Password </label>
				<input class="input is-primary is-rounded" type="Password" />
				<label> Confirm Password </label>
				<input class="input is-primary is-rounded" type="Password" />
				<label> Birthday </label>
				<input class="input is-primary is-rounded" type="date" />
				<label> Gender </label>
				<div class="inputRadio">
					<div>
						<input type="radio" id="Male" value="Male" name="gender" />
						<label class="radio" for="Male">Male</label>
					</div>
					<div>
						<input type="radio" id="Female" value="Female" name="gender" />
						<label class="radio" for="Female">Female</label>
					</div>
				</div>
				<button>Create an account</button>
			</div>
		</div>
	</div>
	<Login />
</template>


<style scoped>
.is-primary {
	border: 1px solid black;
	outline: none;
}

label {
	font-weight: 700;
}

.radio {
	font-weight: 400;
}

.inputRadio {
	display: flex;
	flex-direction: row;
}

.inputRadio input {
	margin: 0 10px;
}

.input {
	margin-bottom: 10px;
}

.signup {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	margin: auto;
}

h1 {
	font-family: "Rock Salt", cursive;
	margin-bottom: 50px;
	font-size: 200%;
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
	width: 100px;
}

button:hover {
	background: #ffc812;
	color: black;
	border: 2px solid black;
}
</style>
