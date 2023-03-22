Vue.component('v-login', {
    props: ['defaultusername', 'customMessage'],
    data: function () {
        return {
            username: this.defaultusername ? this.defaultusername : "",
            password: ""
        }
    },
    methods: {
        submitLogin: function () {
            if (this.username == '' || this.password == '') {
                vCommon.utils.addSimpleNotif("You must fill username and password", 'error');
            } else {
                this.handleAsyncLogin();
            }
        },
        handleAsyncLogin: function () {
            let vueObj = this
            let callTimer = setTimeout(() => {
                vCommon.utils.addSimpleNotif("Login call is still on-going ...", 'info');
            }, 1000);
            $.post("/api/v1/security/getAuthToken", {
                type: this.curtab,
                username: this.username,
                password: this.password
            }, function(data) {
                clearTimeout(callTimer)
                if (data.status == 'OK' && data.authToken) {
                    vueObj.$emit('loggedin')
                } else {
                    vCommon.utils.addSimpleNotif(data.message+". "+(data.error ? data.error : ""), 'error');
                }
            }, "json").fail(function(reply) {
                clearTimeout(callTimer)
                if (reply.status == 400 || reply.status == 401) {
                    vCommon.utils.addSimpleNotif(reply.responseJSON.message+". "+reply.responseJSON.error, 'error');
                } else {
                    vCommon.utils.addSimpleNotif("Unknown error. HTTP "+reply.status+" replied by server", 'error');
                }
            });
        }
    },
    watch: {
        
    },
    created() {
    },
    template: `
    <div>
        <p v-if="customMessage">{{customMessage}}</p>
        <form action="" method="post" ref="loginform" style="margin:0">
            <v-mdc-text style="margin-top:10px" key="loginuser" name="username" v-model="username" label="Username" width="300px" icon="perm_identity" @enter="submitLogin"></v-mdc-text>
            <v-mdc-text style="margin-top:10px" key="loginpass" type="password" name="password" v-model="password" width="300px" label="Password" icon="vpn_key" @enter="submitLogin"></v-mdc-text>
            <br/>
            <v-mdc-button style="margin-top:10px" raised icon="login" label="Login" @click="submitLogin"></v-mdc-button>
        </form>
    </div>
    `
})