<template>
  <div>
    <v-container>
      
        <v-flex xs12>
                <v-img src="../assets/tuacahn.png" height="120" width="200" class="mt-4 ml-auto mr-auto"></v-img>
      </v-flex>
      <v-flex xs12 class="white--text text-center">Audition Name</v-flex>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <v-avatar size="300" class="mb-12 mt-12">
                <v-img 
                    src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                    
                    ></v-img>
                </v-avatar>
            </v-flex>
            <v-flex xs12 class="text-center">
                <h1>{{ performer.Name }} </h1>
            </v-flex>
            <v-flex xs12 class="text-center mt-1 mb-1">
                <v-icon dark class="mr-2">call</v-icon>
                <span class="white--text">{{ performer.Phone }}</span>
            </v-flex>
            <v-flex xs12 class="text-center mb-1 mt-1">
                <v-icon dark class="mr-2">mail</v-icon>
                <span class="white--text">{{ performer.Email }}</span>
            </v-flex>
            <v-flex xs12 class="text-center mb-1 mt-2">
                <v-btn class="pink white--text">View Resume</v-btn>
            </v-flex>

            <v-flex xs12 class="text-center">
                <h1 class="pt-8 font-weight-light">SPECIALTIES</h1>
                <v-divider color="white" class="ml-14 mr-14 mt-2 mb-2"></v-divider>
                <div>
                    <span class="white--text">Specialty 1</span>
                    <span class="white--text">Rating 10/10</span>
                </div>
                <div>
                    <span class="white--text">Specialty 2</span>
                    <span class="white--text">Rating 10/10</span>
                </div>
            </v-flex>
            <v-flex xs12 class="text-center">
                <h1 class="pt-8 font-weight-light">SCORING</h1>
                <v-divider color="white" class="ml-14 mr-14 mt-2 mb-2"></v-divider>

            </v-flex>
            <v-flex xs12 class="text-center mb-2 mt-2">
                <h1>Vocal</h1>
                <v-rating length="10" size="20" hover color="yellow" v-model="newVocal" ></v-rating>
                <span class="white--text" >{{newVocal}}/10</span>
            </v-flex>
            <v-flex xs12 class="text-center mb-2 mt-2">
                <h1>Dance</h1>
                <v-rating length="10" size="20" hover color="yellow" v-model="newDance"></v-rating>
                <span class="white--text" @change="newOverall+=newDance">{{newDance}}/10</span>
            </v-flex>
            <v-flex xs12 class="text-center mb-2 mt-2">
                <h1>Stage Presence</h1>
                <v-rating length="10" size="20" hover color="yellow" v-model="newPresence"></v-rating>
                <span class="white--text">{{newPresence}}/10</span>
            </v-flex>
            <!-- <v-flex xs12 class="text-center mb-2 mt-2">
                <h1>Overall</h1>
                <v-rating length="10" size="20" hover color="yellow"></v-rating>
                <span class="white--text">{{newOverall}}/30</span>
            </v-flex> -->
            <v-flex xs12>
                <v-textarea height="200" dark label="Audition Notes" outlined class="ma-3" v-model="newNotes"></v-textarea>
            </v-flex>
            <v-flex xs12 class="text-center">
                <v-btn class="cyan accent-3 mb-8" @click="addScore()">Save Score</v-btn>
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
      text: "",
      message: false,
      newVocal: 0,
      newDance: 0,
      newPresence: 0,
      newOverall: 0,
      newNotes: "",
      performer: [],
      tempData: [],
      name: "",
      performerId: localStorage.getItem('PerformerID'),
      auditionId: localStorage.getItem('AuditionID'),
      judgeId: localStorage.getItem('user'),
      scored: "",
    }
  }, 

  methods: {
    ...mapActions(['getUser']),


    getPerformer: function() {
        axios.get(`${url}/performer/${this.performerId}`).then(res => {
            this.performer = res.data.performer
            console.log(this.performer + " this is the individual perfoerm")
            this.name = this.performer.Name
            console.log(this.name + " this is what needs to be added to the db")
        });

    },

    addScore: function() {
      this.newOverall = ((parseInt(this.newDance) + parseInt(this.newVocal) + parseInt(this.newPresence)))
      var req_body = {
        Performer: this.performerId,
        Name: this.name,
        Vocal: this.newVocal,
        Dance: this.newDance,
        Presence: this.newPresence,
        Overall: this.newOverall,
        Notes: this.newNotes,
        AuditionID: this.auditionId,
        JudgeID: this.judgeId,
        
      };
        this.message =true;
        this.text ="are you sure you want to continue? Once your score is submitted, you can't edit it";
        console.log(this.newOverall)
      axios.post(`${url}/score`, req_body ).then(res => {
        // this.getScores();
        if (res.status == 400) {
          res.json().then(function(data) {
            this.text = data.message;
          });
        }
        this.name = "";
        this.newVocal = 0;
        this.newDance = 0;
        this.newPresence = 0;
        this.newNotes = "";
        this.message =true;
        this.text ="The score has been added";
        this.$router.go(-1)
      });
      this.appendScore()
        
    },

    appendScore: function() {
      this.scored = true;
      var req_body = {
        Scored: this.scored,
        Overall: this.newOverall,
        JudgeID: this.judgeId,
      };
      
      axios.put(`${url}/performer/${this.performerId}`, req_body)
        .then((response) => {
          this.getPerformer();
          if (response.status == 400) {
            response.json().then(function(data) {
              alert(data.msg);
            });
          }
          console.log("saved")
          this.newOverall = 0
        });
      this.close();
    },

    addTotal: function() {
      console.log("clicked")
      this.newOverall = this.newVocal
    }

  },
  
  computed: {
      ...mapGetters(['user'])

  },
  
  created() {
      this.getUser()
      this.getPerformer()
  }
  
}
</script>