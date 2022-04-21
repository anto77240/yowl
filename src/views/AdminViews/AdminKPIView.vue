<template>
    <NavBar />
    <div>
        <h1>Welcome to the Key Performance Indicator Page</h1>
        <div class="controls">
            <router-link to="/admin"><button>Back Admin Page</button></router-link>
        </div>

        <div class="KPI">
            <h2>Age spread</h2>
            <div class="chartBoxBar">
                <canvas id="UserAgeGrouped"></canvas>
            </div>


            <div class="chartBoxPie">
                <h2>Post category distribution</h2>
                <canvas id="PostsbyCategory"></canvas>
            </div>
            <div class="chartBox">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    </div>
</template> 


<script>
import axios from 'axios'
import Chart from 'chart.js/auto';
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'BirthdayUser',
    components: {
        NavBar,
    },
    data() {
        return {
            //////////////////
            //UserAgeGrouped//
            //////////////////
            users: [],
            birthday: [],
            Age: [],
            GroupedAge: [0, 0, 0, 0, 0, 0, 0],
            /////////////////
            //GenderGrouped//
            /////////////////
            GenderGrouped: [0, 0],
            ///////////////////
            //PostsbyCategory//
            ///////////////////
            post: [],
            category: [],
            SelectedCategory: [0, 0, 0, 0, 0, 0, 0],
        }
    },
    mounted() {

        //////////////////
        //UserAgeGrouped//
        //////////////////

        axios.get('http://146.59.157.162:3000/api/v1/users')
            .then((response) => {
                this.users = response.data
                // console.log(response.data[0].birthday)
                this.birthday = response.data[0].birthday
                for (let i = 0; i < response.data.length - 1; i++) {
                    var t = new Date(response.data[i].birthday)
                    // console.log(response.data[i].birthday); // MULTIVALEURS
                    this.Age.push(new Date().getFullYear() - t.getFullYear())
                    // console.log(this.Age);
                }

                this.Age.forEach(element => {
                    // console.log(element);
                    if (element >= 13 && element <= 15) {
                        this.GroupedAge[0] += 1
                    } else if (element > 15 && element <= 18) {
                        this.GroupedAge[1] += 1
                    } else if (element > 18 && element <= 20) {
                        this.GroupedAge[2] += 1
                    } else if (element > 20 && element <= 25) {
                        this.GroupedAge[3] += 1
                    } else if (element > 25 && element <= 30) {
                        this.GroupedAge[4] += 1
                    } else if (element > 30 && element <= 35) {
                        this.GroupedAge[5] += 1
                    } else {
                        this.GroupedAge[6] += 1
                    }
                });

                const ctx = document.getElementById('UserAgeGrouped');
                const UserAgeGrouped = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        labels: ['13 - 15', '15 - 18', '18 - 20', '20 - 25', '25 - 30', '30 - 35', '35+'],
                        datasets: [{
                            label: 'Number of users grouped by age',
                            data: [this.GroupedAge[0], this.GroupedAge[1], this.GroupedAge[2], this.GroupedAge[3], this.GroupedAge[4], this.GroupedAge[5], this.GroupedAge[6]],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 186, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(0, 159, 64, 0.5)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 186, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(0, 159, 64, 1)'
                            ],
                            borderWidth: 1.5
                        }]
                    },
                });
                UserAgeGrouped;
            })
            .catch((error) => {
                console.log(error);
            })



        /////////////////
        //GenderGrouped//
        /////////////////

        axios.get('http://146.59.157.162:3000/api/v1/users')
            .then((response) => {
                this.gender = []
                for (let i = 0; i < response.data.length - 1; i++) {
                    var g = response.data[i].gender
                    this.gender.push(g)
                    // console.log(g);
                }

                this.gender.forEach(element => {
                    if (element == "M") {
                        this.GenderGrouped[0] += 1
                    } else if (element == "F") {
                        this.GenderGrouped[1] += 1
                    } else {
                        this.GenderGrouped[2] += 1
                    }
                    // console.log(this.GenderGrouped[0]);
                });

                const ctx = document.getElementById('GenderGrouped');
                const GenderGrouped = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Male', 'Female'],
                        datasets: [{
                            label: "User Gender",
                            data: [this.GenderGrouped[0], this.GenderGrouped[1], this.GenderGrouped[2]],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(154, 62, 235, 0.5)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(154, 62, 235, 1)',

                            ],
                            borderWidth: 1.5
                        }]
                    },
                });
                GenderGrouped;
            })

        ///////////////////
        //PostsbyCategory//
        ///////////////////

        axios.get('http://146.59.157.162:3000/api/v1/post')
            .then((response) => {
                this.posts = response.data
                // console.log(response.data)

                // var category = []
                // console.log(category);
                // console.log(this.category) // = news or null
                //let i = 0;
                //while ( i < response.data.length - 1) {
                for (let i = 0; i < response.data.length - 1; i++) {
                    var c = response.data[i].category
                    // console.log(response.data[0].category)
                    // console.log(response.data[1].category)
                    // console.log(response.data[i].category); // 1 valeur
                    //  i++;
                    // console.log(this.category);
                    this.category.push(c)
                    // console.log("TEST126")
                    console.log(c);
                }


                this.category.forEach(element => {
                    if (element == "Travels") {
                        this.SelectedCategory[0] += 1
                    } else if (element == "news" || element == "News") {
                        this.SelectedCategory[1] += 1
                    } else if (element == "Social" || element == "social") {
                        this.SelectedCategory[2] += 1
                    } else if (element == "Video" || element == "Video games") {
                        this.SelectedCategory[3] += 1
                    } else if (element == "Sports" || element == "sport") {
                        this.SelectedCategory[4] += 1
                    } else if (element == "Humour" || element == "Humor" || element == "humour") {
                        this.SelectedCategory[5] += 1
                    } else {
                        this.SelectedCategory[6] += 1
                    }
                })
                // console.log(this.SelectedCategory[5]);


                const ctx = document.getElementById('PostsbyCategory').getContext('2d');
                const PostsbyCategory = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Travels', 'News', 'Social', 'Video', 'Sports', 'Humour', 'N/A'],
                        datasets: [{
                            label: 'Repartition of posts',
                            data: [this.SelectedCategory[0], this.SelectedCategory[1], this.SelectedCategory[2], this.SelectedCategory[3], this.SelectedCategory[4], this.SelectedCategory[5], this.SelectedCategory[6],],
                            backgroundColor: [
                                'rgba(255, 0, 0, 0.6)',
                                'rgba(255, 255, 0, 0.6)',
                                'rgba(255, 255, 255, 0.6)',
                                'rgba(0, 255, 255, 0.6)',
                                'rgba(0, 0, 255, 0.6)',
                                'rgba(255, 0, 255, 0.6)',
                                'rgba(0, 0, 0, 0.6)'
                            ],
                            borderColor: [
                                'rgba(255, 0, 0, 1)',
                                'rgba(255, 255, 0, 1)',
                                'rgba(255, 255, 255, 1)',
                                'rgba(0, 255, 255, 1)',
                                'rgba(0, 0, 255, 1)',
                                'rgba(255, 0, 255, 1)',
                                'rgba(0, 0, 0, 1)'

                            ],
                            borderWidth: 1
                        }]
                    },

                });
                PostsbyCategory;

            })
            .catch((error) => {
                console.log(error);
            })
    },
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

.chartBoxBar {
    width: 70%;
    height: 60%;
    margin-left: 15%;
    margin-right: 15%;
}

.chartBoxPie {
    width: 40%;
    height: 40%;
    margin-left: 30%;
    margin-top: 10%;
    margin-right: 30%;
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 50px;
    margin-bottom: 0px;
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

h1 {
    font-family: "Rock Salt", cursive;
    margin-bottom: 50px;
    font-size: 200%;
    margin-top: 10px;
}

.KPI {
    background-color: #ffc812;
}
</style>