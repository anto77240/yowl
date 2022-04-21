<template>
    <NavBar/>
    <div class="color">
    <div class="header">
    <div class="title">My posts :</div>
    <button class="comeback" type="button" @click="goBack(this.id)">Come Back</button>
    </div>
    <div id="app">
        <div class="controls" v-for="myPosts in this.posts" :key="myPosts.username_id">
            <div class="post-user">
                <ul class="post-details">
                    <li><strong>{{ myPosts.post_title }}</strong> </li>
                    <li><strong>Posted on:</strong> {{ format_date(myPosts.posted_on) }}</li>
                    <li class="content"><strong>Content:</strong> {{ myPosts.post_body }}</li>
                    <li><img class="post_image" :src="myPosts.post_image"/></li>
                    <div class="btn">
                    <div class="editbtn">
                    <img class="edit" src="@/assets/editing.png" @click="goToMyPost(myPosts.id)"/>
                    </div>
                    <div class="binbtn">
                    <img class="bin" src="@/assets/bin.png" @click="deletePost(myPosts.id)"/>
                    </div>
                    </div>
                </ul>
            </div>
      </div>
     </div> 
     </div>
</template>

<script>
import moment from "moment";
import NavBar from "../components/NavBar.vue"
import { useRoute } from "vue-router"

export default {
    components:{
        NavBar,
    },

data () {
    return {
        posts:[],
        myPosts:[],
        id: Number,
    }
},
async mounted() {
    const route = useRoute();
    let id = route.params.id;
    let array = await fetch (`http://146.59.157.162:3000/api/v1/post/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'            
            },
        });
        this.posts = await array.json();
        /* this.posts = this.posts[0]; */
       /*  console.log("array = ", array);
        console.log("this.myPosts = ", this.posts);
        console.log("id = ", id);  */
},
methods : {
    format_date(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},
    async deletePost(id) {
			await fetch(`http://146.59.157.162:3000/api/v1/post/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			location.reload();
	},
    goToMyPost(id) {
        localStorage.setItem("Post", id);
        this.$router.push(`/mypost/${id}`);
    },
    goBack(id) {
		this.$router.push(`/UserAccount/${id}`);
	},
}
}
</script>
<style scoped>
#app {
	position: relative;
	width: 100%;
	margin-left: 15%;
	margin-right: 15%;
    height: 100%;
    align-items: center;

}
.comeback{
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

.post-user {
    background : #ffc812;
    width : 70%;
}

.post-details{
    width : 60%;
    margin : auto;
    background : #ccc;
    justify-content : center;
    border-radius: 5px;
}

.post_image {
    width : 60%;
}

.title{
	font-family: "Rock Salt", cursive;
	font-size: 16px;
	padding-top: 20px;
}

.btn {
    display : flex;
    padding-bottom : 3%;
}

.editbtn {
    width: 85%;
    margin-left: 5%; 
    display: flex;
}

.binbtn {
    display : flex;
}

.edit {
	background-color: none;
	cursor: pointer;
    width : 30px;
    justify-items: left;
}

.bin {
    background-color: none;
	cursor: pointer;
    width : 30px;
    justify-items: right;
}

.controls {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
    width: 100%;
}

.color {
    background:#ffc812;
}

</style>