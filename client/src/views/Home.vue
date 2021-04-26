<template>
  <div>
    <v-snackbar v-model="message" top>{{text}}<v-btn color="pink" text @click="message = false">Close</v-btn></v-snackbar>
    <v-img
      src="../assets/dance.jpeg"
      height="820px"
    >
      <!-- <h1 class="white--text text-center mt-8">KB AUDITION</h1> -->
      <v-img src="../assets/q5.png" height="130" width="170" class="mr-auto ml-auto mt-7"></v-img>
      <v-layout row wrap>
        <v-flex md4></v-flex>
        <v-flex xs12 md4>

      <v-card
        class="mt-16 mr-12 ml-12 mb-12 pa-6"
        dark
        color="rgba(0,0,0,0.6)"
        height="325px"
      >
          <v-flex xs1 md4></v-flex>
          <v-flex xs10 md4> 
            <v-card-title class="text-center">LOGIN</v-card-title>
          </v-flex>
         
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-flex xs12>
              <v-text-field
                label="Username"
                class="ma-4"
                  v-model="username"
                :rules="usernameRules"
              ></v-text-field>
            </v-flex>
           
            <v-flex xs12>
              <v-text-field
              type="password"
              label="Password"
              class="ma-4"
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>
            </v-flex>
          </v-form>
          <v-flex xs1>
            <v-btn to="/Register" class="ml-4" dark absolute left>
              Register
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn class="cyan accent-3 mr-4" absolute right @click="loginUser()">Login</v-btn>
          </v-flex>
           </v-card>
        <v-flex md4></v-flex>

        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      valid: true,
      text:"",
      username: "",
      password: "",
      loading: false,
      message: false,
      usernameRules: [(v) => !!v || "Username is required",],
      passwordRules: [(v) => !!v || "Password is required"],
    }
  }, 

  methods: {
    ...mapActions(["login"]),
    validate() {
      return this.$refs.form.validate();
    },
    loginUser() {
      this.loading = true;
      if (this.validate()) {
        let user = {
          Username: this.username,
          Password: this.password,
        };
        this.login(user)
          .then((res) => {
            if (res) {
              if(res.data.user.Role == "Company"){
                this.$router.push("/Dashboard");
              } else if (res.data.user.Role == "Judge"){
                this.$router.push("/Dashboard");
              } else if ( res.data.user.Role == "Performer"){
                this.$router.push("/Audition")
              } 
              this.message = true;
              this.text = "Logged in Successfully"
              console.log("logged in");
            } else {
              this.message = true;
              this.loading = false;
              console.log("message");
            }
          }).catch((err) => {
            console.log(err);
             this.message = true;
             this.text = "Incorrect credentials. Try again"
          });
      } else if (this.username == ""){
        this.message = true;
        this.text = "Enter a username"
        console.log("message")
      } else {
        this.message = true;
        this.text = "Enter a password"
      }
    },
  }
  
}
</script>
