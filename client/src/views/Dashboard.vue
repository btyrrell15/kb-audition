<template>
  <div>
    <v-divider class="pink ml-4 mr-4 mb-2"></v-divider>
   <v-snackbar v-model="message" top>{{text}}  <v-btn color="pink" text  @click="message = false"> Close</v-btn></v-snackbar>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
            <h2 class="white--text font-weight-light">Welcome {{user.FirstName}}</h2>
            </v-flex>
            <v-flex xs12 class="text-center">
                <v-avatar size="150" class="mb-2 mt-8 grey darken-4">
                <v-img 
                  :src="user.Image"
                  
                  ></v-img>
              </v-avatar>
            </v-flex>
            <v-flex xs12 class="text-center">
                <v-dialog v-model="dialog" max-width="100%">
                    <template v-slot:activator="{ on }">
                    <v-btn class="cyan accent-3 mt-3 white--text" v-on="on" @click="showAdd()" v-if="user.Role=='Company'"
                        >Add Audition</v-btn
                    >
                    </template>
                    <v-card class="grey darken-4" dark>
                    <v-card-title class="pink">
                        <span class="headline white--text">{{ titleForm  }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="newAuditionName"
                                label="Name of Audition"
                            ></v-text-field>
                            <v-textarea
                                v-model="newAuditionDescription"
                                label="Description Of Audition"
                                outlined
                            ></v-textarea>
                            <v-text-field
                                v-model="newLocation"
                                label="Location of Audition"
                            ></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="newRoles"
                                label="How many roles need to be filled?"
                            ></v-text-field>
                            </v-col> -->
                            <v-col cols="12" sm="12">   
                                <v-text-field v-model="newRoleNames" label="Role Names"></v-text-field>
                                <v-btn class="pink ml-8 mt-2" @click="appendRole">Add role to list</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-if="added" v-model="roles" outlined label="Roles"></v-textarea>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                            >
                              <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="date"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="newAuditionDate"
                                    label="Picker in dialog"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="newAuditionDate"
                                  scrollable
                                  color="purple"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="purple"
                                    @click="modal = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="purple"
                                    @click="$refs.dialog.save(date)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                                
                              </v-dialog>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-select
                                label="Select Your Judges"
                                :items="users"
                                item-text="FirstName"
                                item-value="_id"
                                multiple
                                v-model="newJudges"
                              ></v-select>
                              

                            </v-col>
                            
                            <!-- <v-col cols="12" sm="12">
                              <v-card v-if="viewAudition">
                                  <v-img>
                                    <v-avatar></v-avatar>
                                  </v-img>
                                  <span>Judges Name</span>
                                  <v-btn >View Judge's Score</v-btn>
                                </v-card>
                            </v-col> -->
                        </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="cyan accent-3 mb-2" text @click="addAudition()" v-if="newAudition">Save</v-btn
                        >
                        <v-btn class="cyan accent-3 mb-2" text @click="updateAudition()" v-if="editAudition">Update</v-btn
                        >
                        <v-btn class="mb-2" text @click="close">Cancel</v-btn>

                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>

            <v-flex xs12 class="mt-8 mr-4 ml-3 text-center">
              <v-card class="grey darken-4 pb-2">
              <h2 class="font-weight-light white--text">Live Auditions</h2>
              <v-divider class="cyan accent-3 ml-14 mr-14 mb-2 mt-2"></v-divider>
              <v-expansion-panels class="ml-1 pr-2">
                <v-expansion-panel
                  v-for="audition in live"
                  :key="audition._id"
                >
                  <v-expansion-panel-header class="grey darken-4 white--text">{{audition.AuditionName}}</v-expansion-panel-header>
                  <v-expansion-panel-content class="grey darken-4 white--text">
                    <router-link to="/List">
                       <v-btn 
                          class="mt-3"
                          @click="setAuditionID(audition)"
                        >
                          View Audition
                        </v-btn>
                    </router-link>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              </v-card>
            </v-flex>

            <v-flex xs12 class="mt-12 mr-4 ml-3 text-center">
              <v-card class="grey darken-4 pb-2">
                <h2 class="font-weight-light white--text">Upcoming Auditions</h2>
                <v-divider class="cyan accent-3 ml-14 mr-14 mb-2 mt-2"></v-divider>
                <v-expansion-panels focusable dark class="ml-1 pr-2">
                    <v-expansion-panel
                    v-for="audition in upcoming"
                    :key="audition._id"
                    
                    
                    >
                    <v-expansion-panel-header class="grey darken-4 white--text">{{audition.AuditionName}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="grey darken-4 white--text">
                       <div class="ma-1">Amount of Roles to be Filled: {{ audition.RoleNames.length }}</div>
                       <div class="ma-1">Date of Audition: {{ audition.AuditionDate }}</div>
                       <div class="ma-1">Location: {{ audition.Location }}</div>
                       <div v-if="user.Role=='Company'">
                         <v-btn @click="viewAudition(audition)">
                            <v-icon>edit</v-icon>
                            Edit
                          </v-btn>
                          
                          <v-btn @click="deleteAudition(audition)">
                            <v-icon >delete</v-icon>
                            Delete
                          </v-btn>
                          <router-link to="/Scores">
                            <v-btn @click="setAuditionID(audition)" >Scores</v-btn>

                          </router-link>
                       </div>
                       <div v-if="registered">
                          <v-btn v-if="user.Role=='Judge'" @click="registerJudge(audition)">Register</v-btn>
                       </div>
                       <div v-if="user.Role=='Judge'">
                          <v-icon class="green--text">checked</v-icon>
                          Registered
                      </div>
                      <router-link to="/List">
                          <v-btn v-if="user.Role=='Judge'" @click="setAuditionID(audition)">Score Audition</v-btn>
                      </router-link>
                      <div v-if="user.Role=='Performer'"> 
                        <router-link to="/Scores">
                          <v-btn>Sign Up</v-btn>
                        </router-link>
                      </div>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                </v-card>
            </v-flex>
        </v-layout>

         <v-layout row wrap class="mb-8">
            <v-flex xs12 class="mt-12 mr-4 ml-3 text-center">
            <v-card class="grey darken-4 pb-2">

                <h2 class="font-weight-light white--text">Previous Auditions</h2>
                <v-divider class="cyan accent-3 ml-14 mr-14 mb-2 mt-2"></v-divider>

                <v-expansion-panels focusable dark class="ml-1 pr-2">
                    <v-expansion-panel
                    v-for="audition in previous"
                    :key="audition._id"
                    
                    >
                    <v-expansion-panel-header class="grey darken-4 white--text">{{audition.AuditionName}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="grey darken-4 white--text">
                      <div class="ma-1">Amount of Roles to be Filled: {{ audition.Roles }}</div>
                      <div class="ma-1">Date of Audition: {{ audition.AuditionDate }}</div>
                       <div class="ma-1">Performers Signed Up: {{ audition.AuditionDate }}</div>
                       <div v-if="user.Role=='Company'">
                         
                          <v-btn @click="viewAudition(audition)">
                            <v-icon >visibility</v-icon>
                              View
                            </v-btn>

                            <v-btn @click="deleteAudition(audition)">
                               <v-icon>delete</v-icon>
                              Delete
                            </v-btn>

                            <router-link to="/Scores">
                              <v-btn @click="setAuditionID(audition)">Scores</v-btn>

                            </router-link>
                             
                       
                       </div>
                        <v-btn v-if="user.Role=='Judge'" @click="registerJudge(audition)">Register</v-btn>
                        <router-link to="/Performer">
                          <v-btn v-if="user.Role=='Judge'">View Scores</v-btn>
                        </router-link>
                        <v-btn v-if="registered">
                          <v-icon>checked</v-icon>
                          Registered
                        </v-btn>

                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'

const url = require("../client_config/config").url;

export default {
  data: function() {
    return {
      dialog: false,
      judgeDialog: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      message: "",
      text: "",
      titleForm: "New Audition",
      msg: false,
      newAuditionName: "",
      newAuditionDescription: "",
      newLocation: "",
      newRoles: "",
      newRoleNames: "",
      newAuditionDate: "",  
      newJudges: [],
      auditionId: "",
      auditions: [],
      roles: [],
      newAudition: false,
      editAudition: false,
      today: new Date(),
      upcoming: [],
      previous: [],
      live: [],
      attachedAuditions: [],
      item: {},
      compID: localStorage.getItem('user'),
      registered: false,
      added: false,
      judge: "",
      judgeAdded: false,
      tempUsers: [],
      users: [],
      
    }
  }, 

  

  methods: {
    ...mapActions(['getUser']),

    initialize() {
      this.auditions = [];
    },

    getUsers: function() {
      axios.get(`${url}/Users/all`).then(res => {
        this.users = []
        this.tempUsers = res.data.users
        for (var i = 0; i < this.tempUsers.length; i++){
          if(this.tempUsers[i].Role == "Judge"){
            this.users.push(this.tempUsers[i])
          }
        }
      })
    },

    getAuditions: function() {
        axios.get(`${url}/audition`).then(res => {
            this.auditions = []
            this.previous = []
            this.upcoming = []
            this.live = []
            
            this.auditions = res.data.auditions;
            this.today = moment(this.today).format("YYYY-MM-DD")
            for (var i = 0; i < this.auditions.length; i++){
              if (this.user.Role == "Company"){
                if (this.today > this.auditions[i].AuditionDate && this.auditions[i].CompID == this.compID) {
                this.previous.push(this.auditions[i])
                } else if (this.today == this.auditions[i].AuditionDate && this.auditions[i].CompID == this.compID) {
                  this.live.push(this.auditions[i])
                  
                } else if (this.today < this.auditions[i].AuditionDate && this.auditions[i].CompID == this.compID){
                  this.upcoming.push(this.auditions[i])
                } 
              } else if (this.user.Role == "Judge"){
                console.log('true')
                if (this.today > this.auditions[i].AuditionDate ) {
                this.previous.push(this.auditions[i])
                } else if (this.today == this.auditions[i].AuditionDate ) {
                  this.live.push(this.auditions[i])
                  
                } else if (this.today < this.auditions[i].AuditionDate){
                  this.upcoming.push(this.auditions[i])
                } 
              }
              
            }

      
          

            this.attachedAuditions = this.user.AuditionID
            
        });
    },

    addAudition: function() {
      var req_body = {
        AuditionName: this.newAuditionName,
        AuditionDescription: this.newAuditionDescription,
        Location: this.newLocation,
        Roles: this.newRoles,
        RoleNames: this.newRoleNames,
        AuditionDate: this.newAuditionDate,
        Judges: this.newJudges,
        CompID: this.compID,
      };

      axios.post(`${url}/audition`, req_body ).then(res => {
        this.getAuditions();
        if (res.status == 400) {
          res.json().then(function(data) {
            this.text = data.message;
          });
        }
        this.newAuditionName = "";
        this.newAuditionDescription = "";
        this.newLocation = "";
        this.newRoles = [];
        this.newRoleNames = "";
        this.newAuditionDate = "";
        this.newJudges = [];
        this.message =true;
        this.text ="The new audition had been created";
      });
      this.close();

    },

    viewAudition(audition) {
      this.titleForm = "Viewing " + audition.AuditionName;
      this.dialog = true;
      this.editAudition = true;
      this.saveAudition = false;
      this.newAuditionName = audition.AuditionName;
      this.newAuditionDescription = audition.AuditionDescription;
      this.newLocation = audition.Location;
      this.newRoles = audition.Roles;
      this.newRoleNames = audition.RoleNames;
      this.newAuditionDate = audition.AuditionDate;
      this.auditionId = audition._id;
    },

    showAdd() {
      this.titleForm= "New Audition";
      this.newAudition = true;
      this.editAudition  = false;
    },

    showJudge() {
      this.judgedialog = true;
    },

    updateAudition() {
      var req_body = {
        AuditionName: this.newAuditionName,
        AuditionDescription: this.newAuditionDescription,
        Location: this.newLocation,
        Roles: this.newRoles,
        RoleNames: this.newRoleNames,
        AuditionDate: this.newAuditionDate,
      };
      axios.put(`${url}/audition/${this.auditionId}`, req_body)
        .then((response) => {
          this.getAuditions();
          if (response.status == 400) {
            response.json().then(function(data) {
              alert(data.msg);
            });
          }
          this.newAuditionName = "";
          this.newAuditionDescription = "";
          this.newLocation = "";
          this.newRoles = "";
          this.newRoleNames = "";
          this.newAuditionDate = "";
          this.message = true;
          this.text = "The audition has been updated successfully.";
        });
      this.close();
    },

    deleteAudition(audition) {
      const del = audition._id;
      confirm("Are you sure you want to delete this audition?") &&
        this.auditionDelete(del);
    },

    auditionDelete(del) {
      axios.delete(`${url}/audition/${del}`).then((response) => {
        this.getAuditions();
        if (response.status == 400) {
          response.json().then(function(data) {
            return data.msg;
          });
        }
        this.message = true;
        this.text = "The audition has been deleted successfully.";
      });
    },

    close() {
      this.dialog = false;
      this.newAuditionName = "";
        this.newAuditionDescription = "";
        this.newLocation = "";
        this.newRoles = [];
        this.newRoleNames = "";
        this.newAuditionDate = "";
        this.newJudges = [];
    },

    appendRole() {
      this.roles.push(" " + this.newRoleNames )
      this.newRoleNames = "";
      this.added = true;
    },

    appendJudge() {
      this.newJudges.push(" " + this.judge )
      this.judge = "";
      this.judgeAdded = true;
    },

    setAuditionID(audition) {
      this.auditionId = audition._id
      console.log(this.auditionId + "test")
      localStorage.setItem('AuditionID', this.auditionId)
    },

    registerJudge(audition){
      alert('Are you sure you want to register as a judge for this audition?')
      this.attachedAuditions.push(audition._id)
      var req_body = {
        AuditionID: this.attachedAuditions,
      };
      axios.put(`${url}/Users/${this.user._id}`, req_body)
        .then((response) => {
          this.getUser();
          if (response.status == 400) {
            response.json().then(function(data) {
              alert(data.msg);
            });
          }
          console.log("saved")
          this.registered = true;
          this.message = true;
          this.text = "The audition has been updated successfully.";
        });
      this.close();
     
    },
  },

  computed: {
      ...mapGetters(['user'])
  },

  created() {
      this.getAuditions();
      this.getUser()
      this.getUsers()
      
  },

  

  
  
}
</script>
<style>

* {
  text-decoration: none;
}

</style>