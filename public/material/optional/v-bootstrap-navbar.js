Vue.component('v-bootstrap-navbar', {
    props: ['title', 'logo', 'tabs', 'isDebug', 'homeUrl', 'currentTabId', 'username', 'isAuthenticated', 'modalTitle'],
    computed: {
        isUserAuthenticated: function () {
            return this.isAuthenticated == "true"
        },
        isServerDebugMode: function () {
            return this.isDebug == "true"
        },
        getModalTitle: function () {
            return this.modalTitle ? this.modalTitle : "Authentication"
        },
        iconStyle: function () {
            return {
                "width": "40px",
                "height": "40px",
                "float": "left",
                "margin-top": "10px",
                "margin-right": "-5px"
            }
        },
    },
    methods: {
        handleLoginButton: function (e) {
            this.openLoginDialog();
            e.preventDefault();
            return false;
        },
        openLoginDialog: function () {
            this.$refs.loginDialog.open();
        },
        handleLogout: function (e) {
            this.$emit('request-logout')
            e.preventDefault();
            return false;
        },
        tabIconClass: function(tabData) {
            let iconClass = {
                'glyphicon': true
            }
            iconClass['glyphicon-' + tabData.icon] = true;
            return iconClass;
        },
        linkTarget: function(linkData) {
            return linkData.openInNewTab ? "_blank" : ""
        },
        tabClass: function(tabData) {
            return {
                "dropdown" : tabData.dropdown ? true : false,
                "active" : tabData.id == this.currentTabId
            }
        }
    },
    template: `
        <div>
            <v-mdc-dialog ref="loginDialog" :title="getModalTitle">
                <v-mdc-dialog-content style="margin-top:5px">
                    <slot></slot>
                </v-mdc-dialog-content>
                <v-mdc-dialog-actions>
                    <v-mdc-dialog-button label="Close" @click="$refs.loginDialog.close()" />
                </v-mdc-dialog-actions>
            </v-mdc-dialog>

            <nav role="navigation" class="navbar navbar-default mdc-elevation--z4" style="padding-left: 10px;padding-right: 10px;">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#dropdown_menu" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a v-if="logo" :href="homeUrl"><img :src="logo" :style="iconStyle"></a>
                    <a class="navbar-brand" :href="homeUrl">{{title}}<span v-if="isServerDebugMode"> (Debug)</span></a>
                </div>
                <div class="collapse.navbar-collapse" id="dropdown_menu">
                    <ul class="nav navbar-nav">
                        <!-- Tabs -->
                        <li v-for="tab in tabs" :key="tab.id" :class="tabClass(tab)" v-if="!tab.authenticatedOnly || isUserAuthenticated">
                            <!-- Normal button -->
                            <a v-if="!tab.dropdownList" :href="tab.url" :target="linkTarget(tab)">
                                <span style="top: 2px;" :class="tabIconClass(tab)"/>
                                &nbsp; {{tab.text}}
                            </a>
                            
                            <!-- Dropdown button -->
                            <a v-if="tab.dropdownList" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                <span style="top: 2px;" :class="tabIconClass(tab)"/>
                                &nbsp; {{tab.text}}
                                <span class="caret" />
                            </a>
                            <ul v-if="tab.dropdownList" class="dropdown-menu" role="menu">
                                <li v-for="choice in tab.dropdownList" :key="choice.url" v-if="!choice.isHidden">
                                    <a :href="choice.url" :target="linkTarget(choice)">{{choice.text}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav" style="float:right;font-size:1.1em">
                        <!-- User part -->
                        <li v-if="isUserAuthenticated">
                            <a style="font-size:14px" href="#" @click="handleLogout($event)"> {{username}} (Logout)</a>
                        </li>
                        <li v-else>
                            <a href="#" @click="handleLoginButton($event)"> Login <i style="font-size:14px">(Not authenticated)</i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    `
})
