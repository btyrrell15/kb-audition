<template>
  <div>
   <v-snackbar v-model="message" top>{{text}}  <v-btn color="pink" text  @click="message = false"> Close</v-btn></v-snackbar>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-img src="../assets/tuacahn.png" height="120" width="200" class="mt-4 ml-auto mr-auto"></v-img>
            </v-flex>
            <v-flex xs12 class="ma-4">
                {{auditionName}}
            <div v-if="user.Role == 'Company'">

                <v-select
                    label="Select a judge to view their scores"
                    dark
                    :items="judgeList"
                    item-text="FirstName"
                    item-value="FirstName"
                > 
                </v-select>
            </div>

            </v-flex>
            <v-flex xs12 class="white--text">
                <v-card 
                    class="ma-4 grey darken-4" 
                    height="125px"
                    v-for="judge in currentJudge"
                    :key="judge._id"
                    dark
                    >
                    <v-layout v-if="page='judges'">
                        <v-row>
                            <v-flex xs4>
                                <v-avatar size="98px" class="ml-6 mt-6">
                                    <v-img :src="judge.Image">
                                    </v-img>
                                </v-avatar>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-title class="mb-0 pb-0 ml-6">{{judge.Name}} </v-card-title>
                                <v-divider class="cyan accent-3 ml-7 mr-16"></v-divider>
                                <v-card-text class="pt-1 pb-1">
                                    <h1 class="ml-10 mt-2">{{judge.Overall}}/30</h1>
                                </v-card-text>
                                <v-btn class="pink ml-9 mt-2" @click="page='scores'">Callback</v-btn>

                            </v-flex>
                        </v-row>
                    </v-layout>

                    <v-layout v-if="page=='scores'">
                           <v-row>
                            <v-flex xs4>
                                <v-avatar size="72px" class="ml-4 mt-6">
                                    <v-img src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" height="100" width="100">
                                    </v-img>
                                </v-avatar>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-title>{{judge.FirstName}}  {{judge.LastName}}</v-card-title>
                                <v-card-content>
                                    <v-btn>View Judge Scores</v-btn>
                                </v-card-content>
                            </v-flex>
                        </v-row> 
                    </v-layout>              
                </v-card>
            </v-flex>        
        </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

const url = require("../client_config/config").url;

export default {
  data: function() {
    return {
      page: "judges",
      dialog: false,
      judgeDialog: false,
      modal: false,
      message: "",
      text: "",
      titleForm: "New Audition",
      msg: false,
      newAuditionName: "",
      newRoles: "",
      newRoleNames: "",
      newAuditionDate: "",  
      newJudges: [],
      auditionId: localStorage.getItem('AuditionID'),
      auditions: [],
      roles: [],
      newAudition: false,
      editAudition: false,
      today: new Date(),
      upcoming: [],
      previous: [],
      item: {},
      compID: localStorage.getItem('user'),
      judgeId: localStorage.getItem('user'),
      judges: [],
      judgeList: [],
      auditionName: '',
      currentJudge: [],
      judgesScores: [],
      descending: [],
    }
  }, 

  created() {
      this.getAuditions();
      this.getUser()
      this.getJudges()
      this.individualScores()
  },

  methods: {
    ...mapActions(['getUser']),

    initialize() {
      this.auditions = [];
    },
    getAuditions: function() {
        axios.get(`${url}/audition/${this.auditionId}`).then(res => {
            this.judges = res.data.auditions
        });
    },

     getJudges: function() {
        axios.get(`${url}/Users/all`).then(res => {
            this.judges = []
            this.judges = res.data.users;
            for (var i = 0; i < this.judges.length; i++){
                if (this.judges[i].Role == 'Judge'){
                    this.judgeList.push(this.judges[i])
                }   
            }
            
        });
    },

    individualScores: function() {
        axios.get(`${url}/score`).then(res => {
            this.currentJudge = []
            this.judgesScores = res.data.scores
            console.log(this.judgeId)
            for (var i =0; i < this.judgesScores.length; i++){
                if (this.auditionId == this.judgesScores[i].AuditionID){
                        this.currentJudge.push(this.judgesScores[i])
                        this.currentJudge.sort(function(a, b){return b.Overall-a.Overall})
                }
            }
            
        })
    },

    callback: function() {
        var req_body = {
            Callback: this.Callback
        }
        axios.put(`${url}/score/${this.scoreId}`, req_body).then((response) => {
            if (response.status == 400) {
            response.json().then(function(data) {
                alert(data.message);
            });
        }

        })
    },

    
  },

  computed: {
      ...mapGetters(['user'])
  },

  

  
  
}
</script>