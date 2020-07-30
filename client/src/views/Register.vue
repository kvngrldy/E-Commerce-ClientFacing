<template>
  <section id="register" style="overflow: hidden;">
    <div class="wrapper-test">
      <div class="message"></div>
      <form @submit.prevent="register" method="post" class="form-signin">
        <h2 class="form-signin-heading text-center">Register</h2>
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email-register"
          type="text"
          class="form-control"
          name="email"
          placeholder="eg: example@email.com"
          required
          autofocus
        />

        <label for="email">Password</label>
        <input
          v-model="password"
          id="password-register"
          type="password"
          class="form-control"
          name="password"
          placeholder="Sssstttt"
          required
        />
        <label for="email">Confirm Password</label>
        <input
          v-model="confirmpassword"
          id="confirmpassword-register"
          type="password"
          class="form-control"
          name="confirmpassword"
          placeholder="Re-enter password"
          required
        />
        <button class="btn btn-lg btn-primary btn-block">Register</button>
        <small>
          Already have an account?
          <a href="" @click.prevent="toLogin">Login</a>
        </small>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmpassword: "",
    };
  },
  methods: {
      toLogin() {
          this.$store.dispatch('toLogin')
      },
      register() {
          this.$store.dispatch('register', {
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            })
      }
  }
};
</script>

<style>
#register {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(72, 161, 118, 1) 100%
  );
  min-height: 100vh;
}
.wrapper-test {
  margin: 80px;
}

.form-signin {
  max-width: 380px;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px 40px 50px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
}

.form-signin input[type="text"],
.form-signin input[type="password"] {
  margin-bottom: 20px;
}
.form-signin .form-control {
  padding: 10px;
}
.list-group-item:hover {
  background-color: beige;
}

</style>