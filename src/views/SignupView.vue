<!-- @format -->

<template>
  <body>
    <nav></nav>
    <div class="home">
      <div class="controls">
        <h1>To share your ideas with us, please create an account !</h1>
        <div class="signup">
          <form @submit.prevent="createAccount">
            <label> Username </label>
            <input
              class="input is-primary is-rounded"
              type="text"
              v-model="username"
              required
            />
            <label> E-mail </label>
            <input
              class="input is-primary is-rounded"
              type="email"
              v-model="email"
              required
            />
            <label> Password </label>
            <input
              class="input is-primary is-rounded"
              type="Password"
              v-model="password"
              required
            />
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
            <label> Confirm Password </label>
            <input
              class="input is-primary is-rounded"
              type="Password"
              v-model="passwordConfirmation"
              required
            />
            <label> Birthday </label>
            <input
              class="input is-primary is-rounded"
              type="date"
              v-model="birthday"
              required
            />

            <label> Profile picture </label>
            <input
              class="input is-primary is-rounded"
              type="test"
              v-model="avatar"
              required
            />

            <label> Gender </label>
            <div class="inputRadio">
              <div>
                <input
                  type="radio"
                  id="Male"
                  value="M"
                  name="gender"
                  v-model="gender"
                />
                <label class="radio" for="Male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Female"
                  value="F"
                  name="gender"
                  v-model="gender"
                />
                <label class="radio" for="Female">Female</label>
              </div>
            </div>
            <div class="button">
              <button type="submit" v-if="status == 'loading'">Loading</button>

              <button type="submit" v-else>Create an account</button>
              <router-link to="/"><button>Back to Home</button></router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Login />
  </body>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "SignupView",
	data() {
		return {
			username: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			birthday: "",
			avatar: "",
			gender: "M",
			passwordError: "",
		};
	},
	computed: {
		...mapState(["status"]),
	},
	methods: {
		createAccount() {
			//const self = this;
			//Validate password field length
		
			this.passwordError =
				this.password.length < 5
					? "Password should be more than 6 characters long!"
					: this.password === this.passwordConfirmation
					? ""
					: "Password are not similar";

			console.log("password length", this.password.length);
			if (this.password.length < 5) {
				this.passwordError = "Password should be more than 6 characters long!";
			} else if (this.password != this.passwordConfirmation) {
				this.passwordError = "Password are not similar";
			} else {
				this.$store
					.dispatch("createAccount", {
						username: this.username,
						email: this.email,
						password: this.password,
						birthday: this.birthday,
						avatar: this.avatar,
						gender: this.gender,
						admin: 0,
						banned: 1,
					})
					.then(
						function (response) {
							//self.login();
							console.log(response);
						},
						function (error) {
							console.log(error);
						}
					);
				if(this.birthday){
					let age = new Date(this.birthday);
					let date = new Date();
					let AgeVerif = new Date().getFullYear() - age.getFullYear();
					console.log("age, date, AgeVerif", age, date, AgeVerif);
					if(AgeVerif < 13) {
						alert("You must be over 13 years old to sign up !");
						this.$router.push("/");

					}else{
						this.$router.push("/signin");
					}
				}
			}
		},
	}
};
</script>

<style scoped>
body {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffc812;
  width: 100%;
}
.is-primary.input {
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
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.inputRadio input {
  margin: 0 10px;
}

.input {
  margin-bottom: 10px;
}

form {
  align-items: center;
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
  width: 140px;
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

.error {
  color: #ff0000;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
