<template>
  <div>
   <v-snackbar v-model="message" top>{{text}}  <v-btn color="pink" text  @click="message = false"> Close</v-btn></v-snackbar>
    <v-container>
    <v-layout row wrap class="ma-3">
      <v-btn class="black" fab depressed small @click="$router.go(-1)">
                <v-icon class="white--text">keyboard_backspace</v-icon>
      </v-btn>
      <v-flex xs12 class="text-center">
        
      <v-img src="../assets/q1.png" height="100" width="100" class="mr-auto ml-auto"></v-img>

        <h1 class="mb-4 font-weight-light">KB Audition Registration</h1>
      </v-flex>
      <v-flex xs12>
        <v-select 
          :items="roles"
          label="What are you register as?"
          v-model="newRoles"
          dark
          class="black white--text"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="ma-3">
      <v-flex xs12>
        <v-text-field label="Name of File" dark v-model="name"></v-text-field>

      </v-flex>
      <v-flex xs12 class="mb-2 mt-2">
        <input  label="Upload File" type="file" v-on:change="selectFile($event)" class="grey">
        <!-- <v-file-input dark label="Upload File" v-model="file" v-on:change="selectFile($event)"></v-file-input> -->
      </v-flex>
      <v-flex xs12 class="mb-2 mt-2">
        <v-btn class="pink white--text" @click="sendFile()">Send</v-btn>
        
      </v-flex>
    </v-layout>

    <v-layout row wrap class="ma-3" v-if="uploaded">
      <v-flex xs12>
        <!-- <v-avatar size="300" class="mb-12 mt-12 deep-purple accent-1">
          <! <v-img 
            src="https://kbaudition.s3.us-west-1.amazonaws.com/images/1618068810692-q5.png"
            
            ></v-img> -->
            <!-- <div id="adobe-dc-view"></div> -->
            <!-- <pdf src="https://kbaudition.s3.us-west-1.amazonaws.com/images/1618069435073-Tyrell paperwork.pdf"></pdf>
        </v-avatar> --> -->
        
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Company Name" v-model="CompanyName" v-if="newRoles =='Company'"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-file-input dark label="Company Logo" v-model="Image" v-if="newRoles =='Company'"></v-file-input>
        <v-file-input dark label="Headshot" v-model="Image" v-if="newRoles =='Performer' || newRoles == 'Judge'"></v-file-input>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="First Name" v-model="FirstName"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Last Name" v-model="LastName"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Phone" v-model="Phone"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Email" v-model="Email"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Address" v-model="Address"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="City" v-model="City"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="State" v-model="State"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Zip" v-model="Zip"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark label="Username" v-model="Username"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark type="password" label="Password" v-model="Password"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field dark type="password" label="Confirm Password" v-model="ConfirmPassword"></v-text-field>
      </v-flex>
      <v-btn class="cyan accent-3 mt-4 mb-4" @click="registerUser()">Save</v-btn>

    </v-layout>

    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'


const url = require("../client_config/config").url;


export default {
  components: {
    
  },
  
  data: function() {
    return {
      text: "",
      message: false,
      dialog: false,
      roles: ["Company", "Performer", "Judge"],
      newRoles: "",
      CompanyName: "",
      Image: "",
      FirstName: "",
      LastName: "",
      Phone: "",
      Email: "",
      Address: "",
      City: "",
      State: "",
      Zip: "",
      Birthday: "",
      Username: "",
      Password: "",
      ConfirmPassword: "",
      file: null,
      name: '',
      images: [],
      uploaded: false,
    }
  }, 

  

  methods: {
    ...mapActions(['register']),

    sendFileToServer: function (name, file) {
      var data = new FormData();
      data.append('name', name);
      data.append('image', file);
      console.log("first")
      fetch(`${url}/users/posts`, {
          method: 'POST',
          body: data
        }).then(function () {
          console.log(' second file sent');

        });
        console.log("3rd")
    },

    registerUser() {

        let user = {
        CompanyName: this.CompanyName,
        Image: this.images.image[this.images.image.length -1].Location,
        FirstName: this.FirstName,
        LastName: this.LastName,
        Phone: this.Phone,
        Email: this.Email,
        Address: this.Address,
        City: this.City,
        State: this.State,
        Zip: this.Zip,
        Role: this.newRoles,
        Birthday: this.Birthday,
        Username: this.Username,
        Password: this.Password,
        ConfirmPassword: this.ConfirmPassword

      }
      this.getImages()
      this.register(user).then(res => {
        console.log(res)
        if(res.status == 200){
          this.message = true;
          this.text="You are now registered.";
          // this.$router.push("/");
          this.resetForm();
        } else if (res.status == 400) {
          res.json().then(function(data) {
            this.text = data.message;
          });
        }
        
      })
    },
    resetList: function() {
      this.roles = ["Company", "Performer", "Judge"]
    },
    resetForm: function() {
      this.CompanyName = "";
      this.Image = "";
      this.FirstName = "";
      this.LastName = "";
      this.Phone = "";
      this.Email = "";
      this.Address = "";
      this.City = "";
      this.Zip = "";
      this.Username = "";
      this.Password = "";
      this.ConfirmPassword = "";
      this.newRole = "";
      this.name = "";
    },

    close() {
      this.dialog = false;
    },

    selectFile: function (event) {
      this.file = event.target.files[0];
    },

    sendFile: function () {
        if(this.name == ""){
          this.message = true;
          this.text = "Please add a name for the image"
        } else if (this.file == null){
          this.message = true;
          this.text = "Please select a file"
        } else {
          this.sendFileToServer(this.name, this.file);
          this.getImages()
          this.uploaded = true;
          this.message = true;
          this.text = "Image Uploaded Successfully"
        }
        
    },

    getImages: function() {
       return fetch(`${url}/users/posts`)
      .then(response => response.json())
      .then(data => {
        this.images = [];
        this.images = data;
        console.log("it worked")
        console.log(this.images )
        console.log(this.images.image[this.images.image.length -1].Location)
      })
    },

    

  },

  created() {

    }
  
}
</script>