Vue.component('v-mdc-select', {
    props: ['label', 'width', 'value', 'name', 'disabled'],
    data: function () {
        return {
            mdcelem: null
        }
    },
    methods: {
        clear() {
            if (!this.mdcelem) return
            this.mdcelem.selectedIndex = -1;
        },
        refreshSelect() {
            // This method must be called when mounted or when someone dynamically change the list of options
            if (mdc) {
                this.mdcelem = mdc.select.MDCSelect.attachTo(this.$refs.mdcbind);
                this.mdcelem.value = this.value;
                this.mdcelem.listen('MDCSelect:change', () => {
                    this.$emit("input", this.mdcelem.value);
                });
            } else {
                alert("It seems you are missing material design dependency")
            }
        }
    },
    computed: {
        widthStyle: function () {
            return {
                "width": this.width ? this.width : '250px'
            }
        },
        inputId: function() {
            return this.label ? 'input-select-'+this.label.replace(/\s/g, '-') : "mdc-input-select"
        },
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
        selectClass: function () {
            return {
                'mdc-select--disabled' : this.isDisabled,
            }
        },
    },
    mounted() {
        this.refreshSelect();
    },
    template: `
    <div class="mdc-select mdc-select--outlined" ref="mdcbind" :class="selectClass" v-bind:style="widthStyle">
        <input type="hidden" v-bind:name="name" v-bind:value="value" />
        <div class="mdc-select__anchor" v-bind:style="widthStyle">
            <span class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__notch">
                    <span class="mdc-floating-label" v-bind:id="inputId">
                        {{label}}
                    </span>
                </span>
                <span class="mdc-notched-outline__trailing"></span>
            </span>
            <span class="mdc-select__selected-text-container">
                <span class="mdc-select__selected-text" type="text"/>
            </span>
            <span class="mdc-select__dropdown-icon">
                <svg
                    class="mdc-select__dropdown-icon-graphic"
                    viewBox="7 10 10 5" focusable="false">
                    <polygon
                        class="mdc-select__dropdown-icon-inactive"
                        stroke="none"
                        fill-rule="evenodd"
                        points="7 10 12 15 17 10">
                    </polygon>
                    <polygon
                        class="mdc-select__dropdown-icon-active"
                        stroke="none"
                        fill-rule="evenodd"
                        points="7 15 12 10 17 15">
                    </polygon>
                </svg>
            </span>
        </div>
        <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
            <ul class="mdc-deprecated-list">
                <slot></slot>
            </ul>
        </div>
    </div>
    `
})

Vue.component('v-mdc-option', {
    props: ['value'],
    template: `
    <li v-bind:data-value="value" class="mdc-deprecated-list-item" role="option">
        <span class="mdc-deprecated-list-item__ripple"></span>
        <span class="mdc-deprecated-list-item__text"><slot/></span>
    </li>
    `
})

Vue.component('v-mdc-spinner', {
    props: ['scale', 'backgroundColor', 'spinnerColor'],
    computed: {
        spinnerClass: function () {
            return {
                "mdc-spinner": true
            }
        },
        spinnerStyle: function () {
            return {
                "--mdc-spinner-color": this.spinnerColor ? this.spinnerColor : null,
                "--mdc-spinner-background-color": this.backgroundColor ? this.backgroundColor : null,
                "--mdc-spinner-scale": this.scale ? this.scale : null
            }
        }
    },
    template: `
    <div v-bind:class="spinnerClass" v-bind:style="spinnerStyle">
        <div class="mdc-spinner-wrapper">
            <div class="mdc-rotator">
                <div class="mdc-inner-spin"></div>
                <div class="mdc-inner-spin"></div>
            </div>
        </div>
    </div>
    `
})

Vue.component('v-mdc-text', {
    props: ['label', 'width', 'height', 'value', "name", 'list',
            "type", "multiple", "textarea", 'icon', 'placeholder', 
            'maxlength', 'disabled', 'readonly'],
    data: function () {
        return {
            inputval: this.value,
            mdcelem: null
        }
    },
    computed: {
        mainStyle: function () {
            return {
                "min-width": this.width ? this.width : null,
                "margin-right": "5px",
                "margin-top": "2px"
            }
        },
        inputStyle: function () {
            return {
                "min-width": this.width ? this.width : null,
                "min-height": (this.isTextarea && this.height) ? this.height : null,
                "font-size": "14px"
            }
        },
        inputId: function() {
            return this.label ? 'input-text-'+this.label.replace(/\s/g, '-') : "mdc-input-text"
        },
        mainClass: function () {
            return {
                "mdc-inputs": true,
                "mdc-text-field": true,
                "mdc-text-field--outlined": true,
                "mdc-text-field--textarea": this.isTextarea,
                "mdc-text-field--no-label": !this.hasLabel,
                "mdc-text-field--with-leading-icon" : this.icon
            }
        },
        isTextarea: function() {
            return this.textarea !== undefined && this.textarea !== "false" ? true : false
        },
        hasLabel: function() {
            return this.label !== undefined && this.label !== "";
        },
        inputType: function() {
            return this.type ? this.type : "text"
        },
        inputIsMultiple: function() {
            return this.multiple !== undefined && this.multiple !== "false" ? true : false
        },
        inputMaxLength: function() {
            return this.maxlength !== undefined && this.maxlength !== "" ? this.maxlength : ""
        },
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
        isReadonly: function () {
            return this.readonly === "" || this.readonly === "true" || this.readonly === true ? true : false
        },
    },
    methods: {
        emitEnter: function (event) {
            if (!this.isTextarea && event.keyCode === 13) {
                this.$emit("enter");
            }
        },
        focus: function (){
            if (this.mdcelem) {
                this.mdcelem.focus()
            }
        }
    },
    watch: {
        "inputval": function(newVal) {
            this.$emit("input", newVal);
        },
        "value": function(newVal) {
            this.inputval = newVal
        }
    },
    created() {
    },
    mounted() {
        // Prevent browser from filling inputs with previous data
        let nb_check_previous = 0
        let cleanInputInterval = setInterval(()=>{
            ++nb_check_previous;
            if (this.$refs.content && this.$refs.content.value !== this.value) {
                this.$emit("input", this.$refs.content.value);
                this.mdcelem.value = this.$refs.content.value
                clearInterval(cleanInputInterval)
            }
            if (nb_check_previous >= 20) {
                clearInterval(cleanInputInterval)
            }
        }, 50)
        if (mdc) {
            this.mdcelem = mdc.textField.MDCTextField.attachTo(this.$refs.mdcbind);
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <label ref="mdcbind" :class="mainClass" :style="mainStyle">
        <i v-if="icon" style="margin-right: -5px;z-index:10;" class="material-icons mdc-text-field__icon mdc-text-field__icon--leading">{{icon}}</i>
        <span class="mdc-text-field__resizer" v-if="isTextarea">
            <textarea
                ref="content"
                :placeholder="placeholder"
                :aria-labelledby="inputId"
                class="mdc-text-field__input"
                :name="name"
                :style="inputStyle"
                :maxlength="inputMaxLength"
                :readonly="isReadonly"
                :disabled="isDisabled"
                v-model="inputval"
                @keyup="$emit('keyup', $event)"
                @focus="$emit('focus', $event)"
                @focusout="$emit('focusout', $event)"
            ></textarea>
        </span>
        <input
            v-else
            ref="content"
            :placeholder="placeholder"
            :aria-labelledby="inputId"
            :list="list"
            class="mdc-text-field__input"
            :name="name"
            :type="inputType"
            :multiple="inputIsMultiple"
            :style="inputStyle"
            :maxlength="inputMaxLength"
            :readonly="isReadonly"
            :disabled="isDisabled"
            v-model="inputval"
            @keyup="$emit('keyup', $event)"
            @keyup.enter="$emit('enter', $event)"
            @focus="$emit('focus', $event)"
            @focusout="$emit('focusout', $event)"
        />
        <div class="mdc-text-field-helper-line" v-if="inputMaxLength != ''">
          <div class="mdc-text-field-character-counter" style="font-size: 13px; margin-right:10px">0 / {{inputMaxLength}}</div>
        </div>
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span v-if="hasLabel" class="mdc-notched-outline__notch">
                <span class="mdc-floating-label" :id="inputId">{{label}}</span>
            </span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
    </label>
    `
})

Vue.component('v-mdc-switch', {
    props: ['label', 'value', "name", "disabled"],
    data: function () {
        return {
            inputval: this.value,
            mdcelem: null
        }
    },
    computed: {
        inputId: function() {
            return this.label ? 'mdc-switch-'+this.label.replace(/\s/g, '-') : "mdc-switch"
        },
        isDisabled: function () {
            let ret = this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
            if (this.mdcelem)
            {
                this.mdcelem.disabled = ret
            }
            return ret
        }
    },
    watch: {
        "inputval": function(newVal) {
            this.$emit("input", newVal);
        },
        "value": function(newVal) {
            this.inputval = newVal ? true : false
            this.updateMdcObject()
        }
    },
    methods: {
        toogle: function(){
            this.$emit('click', !this.value)
            this.$emit('input', !this.value)
        },
        updateMdcObject: function() {
            if (this.mdcelem && this.mdcelem.selected !== this.inputval) {
                this.mdcelem.selected = this.inputval
            }
        }
    },
    created() {
    },
    mounted() {
        if (mdc) {
            this.mdcelem = mdc.switchControl.MDCSwitch.attachTo(this.$refs.mdcbind);
            this.updateMdcObject()
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <div>
        <button v-bind:id="inputId" class="mdc-switch mdc-switch--unselected" type="button" role="switch" v-bind:aria-labelledby="inputId" :aria-checked="inputval" ref="mdcbind" @click="toogle" :disabled="isDisabled">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__handle-track">
                <div class="mdc-switch__handle">
                    <div class="mdc-switch__shadow">
                        <div class="mdc-elevation-overlay"></div>
                    </div>
                    <div class="mdc-switch__ripple"></div>
                    <div class="mdc-switch__icons">
                        <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
                        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
                        </svg>
                        <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
                        <path d="M20 13H4v-2h16v2z" />
                        </svg>
                    </div>
                </div>
            </div>
            <input type="hidden" v-bind:name="name" v-model="inputval">
        </button>
        <label v-bind:for="inputId" style="margin-left:10px">{{label}}</label>
    </div>
    `
})


Vue.component('v-mdc-tab-bar', {
    props: ['width'],
    data: function() {
        return {
            needScrollLeft: false
        }
    },
    computed: {
        mainStyle: function () {
            return {
                "width": this.width ? this.width : null
            }
        },
    },
    methods: {
        scrollRightAfterUpdate: function() {
            this.needScrollLeft = true
        },
        scrollLeft: function() {
            let e = this.$refs.scrollcontent
            e.scrollLeft = 0
        }
    },
    update: function() {
        if (this.needScrollLeft) {
            this.needScrollLeft = true
            let e = this.$refs.scrollcontent
            e.scrollLeft = e.scrollWidth
        }
    },
    mounted() {
        if (mdc) {
            let tabbar = mdc.tabBar.MDCTabBar.attachTo(this.$refs.mdcbind);
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <div class="mdc-tab-bar" role="tablist" ref="mdcbind">
      <div class="mdc-tab-scroller">
        <div ref="scrollcontent" class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            <slot/>
          </div>
        </div>
      </div>
    </div>
    `
})

Vue.component('v-mdc-tab', {
    props: ['icon', 'label', 'value', 'tabvalue'],
    data: function () {
        return {
            mdctab: null
        }
    },
    computed: {
        buttonClass: function () {
            return {
                "mdc-tab": true,
                "mdc-tab--active": this.mdctab ? this.mdctab.active : false
            }
        },
        indicatorClass: function () {
            return {
                "mdc-tab-indicator": true,
                "mdc-tab-indicator--active": this.mdctab ? this.mdctab.active : false
            }
        },
    },
    watch: {
        "value": function(newVal) {
            if (!this.mdctab) return;
            if (!this.mdctab.active && newVal == this.tabvalue) {
                this.mdctab.activate()
                this.$refs.mdcbind.blur()
            } else if (this.mdctab.active && newVal != this.tabvalue) {
                this.mdctab.deactivate()
            }
        }
    },
    mounted() {
        if (mdc) {
            this.mdctab = mdc.tab.MDCTab.attachTo(this.$refs.mdcbind);
            this.mdctab.focusOnActivate = false;
            if (this.tabvalue == this.value) {
                this.mdctab.activate()
            }
            this.mdctab.listen('MDCTab:interacted', (e) => {
                this.$emit("input", this.tabvalue);
            });
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <button v-bind:class="buttonClass" role="tab" aria-selected="true" tabindex="0" ref="mdcbind">
      <span class="mdc-tab__content">
        <span class="mdc-tab__icon material-icons" aria-hidden="true">{{icon}}</span>
        <span class="mdc-tab__text-label">{{label}}</span>
      </span>
      <span v-bind:class="indicatorClass">
        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
      </span>
      <span class="mdc-tab__ripple"></span>
    </button>
    `
})

Vue.component('v-mdc-button', {
    props: ['label', 'icon', 'type', 'raised', 'disabled'],
    methods: {
        handleClick: function() {
            this.$emit('click')
            this.$refs.main.blur()
        },
    },
    computed: {
        buttonType: function () {
            return this.type ? this.type : "button"
        },
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
        isRaised: function () {
            return this.raised === "" || this.raised === "true" || this.raised === true ? true : false
        },
        buttonClass: function () {
            return {
                'mdc-elevation--z2' : true,
                'mdc-button' : true,
                'mdc-button--raised' : this.isRaised,
                'mdc-button--outlined' : !this.isRaised,
            }
        },
        iconStyle: function () {
            return {
                'margin' : this.label ? "" : "0"
            }
        },
    },
    template: `
    <button ref="main" v-bind:type="buttonType" v-bind:class="buttonClass" :disabled="isDisabled" @click="handleClick">
        <div class="mdc-button__ripple"></div>
        <i v-if="icon" aria-hidden="true" class="material-icons mdc-button__icon" :style="iconStyle">{{icon}}</i>
        <span class="mdc-button__label">{{label}}</span>
    </button>
    `
})

Vue.component('v-mdc-checkbox', {
    props: ['label', 'value', 'disabled'],
    data: function () {
        return {
            inputval: this.value
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
        checkboxClass: function () {
            return {
                'mdc-checkbox': true,
                'mdc-checkbox--disabled': this.isDisabled
            }
        },
    },
    watch: {
        "inputval": function(newVal) {
            this.$emit("input", newVal);
        }
    },
    template: `
    <div class="mdc-form-field">
      <div v-bind:class="checkboxClass">
        <input  type="checkbox"
                class="mdc-checkbox__native-control"
                v-model="inputval"
                :disabled="isDisabled"/>
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
               viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
      </div>
      <label style="font-size: 15px">{{label}}</label>
    </div>
    `
})

Vue.component('v-mdc-panel', {
    props: ['title', 'type', 'elevation', 'icon'],
    computed: {
        panelClasses: function () {
            let panelType = this.type ? this.type : "primary";
            let elevation = this.elevation ? parseInt(this.elevation) : 4;
            if (isNaN(elevation)) {
                elevation = 4
            }
            let classes = {
                'mdc-panel' : true
            }
            classes['mdc-elevation--z'+elevation] = true
            classes['mdc-panel-'+panelType] = true
            return classes
        },
    },
    template: `
    <div :class="panelClasses">
        <span v-if="icon" class="material-icons material-icon-panel-header" aria-hidden="true">{{icon}}</span>
        <h4>{{title}}</h4>
        <hr>
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-snackbar', {
    props: ['value'],
    data: function () {
        return {
            mdcelem: null,
            notif: null,
            message: "",
            buttons: [],
            lastOpenTimestamp: 0,
            lastObservedNotifSize: -1,
            autoCloseTimeout: 4000
        }
    },
    computed: {
        mainStyle: function() {
            return {
                "left": "auto",
                "bottom":"auto",
                "top":0,
                "right":0
            }
        },
        surfaceStyle: function() {
            let color = "#ffffff"
            if (this.notif) {
                if (this.notif.type == 'error') color = '#f06050'
                if (this.notif.type == 'success') color = '#60f080'
                if (this.notif.type == 'info') color = 'rgb(140, 207, 251)'
            }
            return {
                "background-color": color
            }
        },
        textStyle: function() {
            let color = "#333"
            if (this.notif) {
                if (this.notif.type == 'error') color = '#eee'
            }
            return {
                "color": color,
                "font-size": "13px"
            }
        }
    },
    methods: {
        closeNotif: function() {
            this.mdcelem.close()
        },
        handleNextNotif: function() {
            if (!this.mdcelem) return;
            if (this.value.length == 0) {
                this.notif = null
            } else {
                let isChainingNotifs = this.notif !== null;
                while (this.notif && this.value.length>0 && this.notif.message == this.value[0].message) {
                    this.value.shift()
                }
                this.notif = this.value.shift()
                setTimeout(()=>{
                    this.goToNextNotif()
                }, isChainingNotifs ? 500 : 0);
            }
        },
        goToNextNotif: function() {
            if(!this.notif){
                return;
            }
            if (this.notif.sticky) {
                this.mdcelem.timeoutMs = -1;
            } else {
                this.mdcelem.timeoutMs = this.autoCloseTimeout;
            }
            this.mdcelem.labelText = this.notif.message
            this.mdcelem.open()
            this.lastOpenTimestamp = Date.now()
        },
        buttonLabelStyle: function(buttonData) {
            let color = "#383"
            if (buttonData.color) {
                color = buttonData.color
            } else {
                if (this.notif.type == 'error') color = 'white'
                if (this.notif.type == 'success') color = '#222'
                if (this.notif.type == 'info') color = '#222'
            }

            let backgroundColor = "rgba(0, 0, 0, 0.1)";
            if (buttonData.backgroundColor) {
                backgroundColor = buttonData.backgroundColor
            }

            return {
                "color": color,
                "background-color": backgroundColor,
                "font-size": "14px"
            }
        },
        handleButtonClick: function(e, buttonData) {
            if (buttonData.callback && buttonData.callback() === false) {
                e.preventDefault()
                e.stopPropagation()
                return false
            }
            return true
        },
    },
    watch: {
        "value": {
            immediate: true,
            handler: function(newVal) {
                if (!this.mdcelem) return
                if (this.lastObservedNotifSize == -1) {
                    this.lastObservedNotifSize = newVal.length
                }
                let isAddedNotif = this.lastObservedNotifSize < newVal.length;
                this.lastObservedNotifSize = newVal.length
                if (!this.mdcelem.isOpen && this.notif == null) {
                    // No notif on going, we simply open it
                    this.handleNextNotif()
                } else if (isAddedNotif) {
                    // Speed up previous notif closing in case a new one arrive
                    let timeSinceOpened = Date.now() - this.lastOpenTimestamp
                    let timeBeforeNaturalCloseMs = this.autoCloseTimeout - timeSinceOpened
                    if (timeSinceOpened < 1000) {
                        setTimeout(() => {
                            this.mdcelem.close()
                        }, 1000 - timeSinceOpened);
                    } else {
                        if (timeBeforeNaturalCloseMs > 500) {
                            this.mdcelem.close()
                        }
                    }
                }
            }
        }
    },
    mounted() {
        if (mdc) {
            this.mdcelem = mdc.snackbar.MDCSnackbar.attachTo(this.$refs.mdcbind);
            this.mdcelem.listen('MDCSnackbar:closed', () => {
                this.handleNextNotif()
            });
            this.handleNextNotif()
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <div ref="mdcbind" class="mdc-snackbar mdc-snackbar--leading" v-bind:style="mainStyle" @click="closeNotif">
      <div class="mdc-snackbar__surface" dir="ltr" v-bind:style="surfaceStyle">
        <div class="mdc-snackbar__label" role="status" aria-live="polite" v-bind:style="textStyle"></div>
        <div class="mdc-snackbar__actions">
          <span v-if="notif">
              <button v-for="(button, index) in notif.buttons" v-bind:key="index" type="button" class="mdc-button mdc-snackbar__action" v-bind:style="buttonLabelStyle(button)" @click="handleButtonClick($event, button)">
                <div class="mdc-button__ripple"></div>
                <span class="mdc-button__label">{{button.label}}</span>
              </button>
          </span>
        </div>
      </div>
    </div>
    `
})

Vue.component('v-mdc-dialog', {
    props: ['title', 'type', 'disableClose'],
    data: function () {
        return {
            mdcelem: null,
            copyEscapeKeyAction: null,
            copyScrimClickAction: null
        }
    },
    methods: {
        open: function () {
            if (!this.mdcelem) return
            this.mdcelem.open()
        },
        close: function () {
            if (!this.mdcelem) return
            this.mdcelem.close()
        },
        isOpen: function () {
            if (!this.mdcelem) return false
            return this.mdcelem.isOpen
        },
        isCloseDisabled: function () {
            return this.disableClose === "" || this.disableClose === "true" || this.disableClose === true ? true : false
        }
    },
    computed: {
        titleClass: function() {
            return {
                'mdc-dialog__title': true,
                'mdc-text-error': this.type == 'error',
                'mdc-text-info': this.type == 'info',
                'mdc-text-success': this.type == 'success',
                'mdc-text-standard': this.type !== 'success' && this.type !== 'info' && this.type !== 'error' ,
            }
        }
    },
    watch: {
        disableClose: function (){
            if(this.isCloseDisabled()){
                this.mdcelem.escapeKeyAction = "";
                this.mdcelem.scrimClickAction = "";
            } else {
                this.mdcelem.escapeKeyAction = this.copyEscapeKeyAction
                this.mdcelem.scrimClickAction = this.copyScrimClickAction
            }
        }
    },
    mounted() {
        if (mdc) {
            this.mdcelem = mdc.dialog.MDCDialog.attachTo(this.$refs.mdcbind);
            this.copyEscapeKeyAction = this.mdcelem.escapeKeyAction
            this.copyScrimClickAction = this.mdcelem.scrimClickAction
            if(this.isCloseDisabled()){
                this.mdcelem.escapeKeyAction = "";
                this.mdcelem.scrimClickAction = "";
            }
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <div class="mdc-dialog" ref="mdcbind">
      <div class="mdc-dialog__container" style="transform: none;">
        <div class="mdc-dialog__surface"
          role="alertdialog"
          aria-modal="true">
          <h2 v-bind:class="titleClass" style="font-size:20px">{{title}}</h2>
          <slot></slot>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>
    `
})

Vue.component('v-mdc-dialog-content', {
    props: [],
    data: function () {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    watch: {
        
    },
    mounted() {
        
    },
    template: `
    <div class="mdc-dialog__content" style="padding-bottom:6px; font-size: 14px;">
      <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-dialog-actions', {
    props: [],
    data: function () {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    watch: {
        
    },
    mounted() {
        
    },
    template: `
    <div class="mdc-dialog__actions">
      <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-dialog-button', {
    props: ['label', 'disabled'],
    data: function () {
        return {
            
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
    },
    methods: {
        
    },
    watch: {
        
    },
    mounted() {
        
    },
    template: `
    <button type="button" :disabled="isDisabled" class="mdc-button mdc-dialog__button" v-on:click="$emit('click')">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">{{label}}</span>
    </button>
    `
})

/*
    Exemple:
    - First simply set this component in one of your components
        <v-mdc-prompt ref="genericPrompt"></v-mdc-prompt>

    - Then you can simply ask to open a prompt
        this.$refs.genericPrompt.openPromptContentText(
            "This is a test Prompt",
            'info',
            "Prompt content!",
            [{
                label:'Yes',
                style: {color:'red'},
                callback: () => {
                    // Do something
                }
            },
            {
                label:'No',
            }]
        )

    - Or a more complex one:
        this.$refs.genericPrompt.openPromptContentList(
            "This is an other test Prompt",
            'info',
            "Some text before list",
            ['Truc1', "Truc2", "Truc 1000"],
            "Some text after list",
            [{
                label:'Do something dangerous',
                style: {color:'red'},
                callback: () => {
                    // Do whatever
                }
            },{
                label:'Return to main page',
                style: {color:'purple'},
                callback: () => {
                    location.href = '/pim'
                }
            }]
        )
*/
Vue.component('v-mdc-prompt', {
    data: function () {
        return {
            title: "",
            type: "default",
            contentText: "",
            contentList: [],
            contentListTextBefore: "",
            contentListTextAfter: "",
            showWhiteSpaces: false,
            buttons: []
        }
    },
    computed: {
        contentStyle: function() {
            return {
                "white-space": this.showWhiteSpaces ? "pre-wrap" : "inherit"
            }
        }
    },
    methods: {
        // If no button is set we add a Close button
        defaultButtons: function () {
            return [{
                label:"Close"
            }]
        },
        openPromptContentText: function(title, type, content, buttons, showWhiteSpaces) {
            this.title = title
            this.type = type
            this.contentText = content
            this.contentList = []
            this.buttons = buttons ? buttons : this.defaultButtons()
            this.showWhiteSpaces = showWhiteSpaces ? true : false;
            this.$refs.promptDialog.open()
        },
        openPromptContentList: function(title, type, textBeforeList, list, textAfterList, buttons, showWhiteSpaces) {
            this.title = title
            this.type = type
            this.contentText = ""
            this.contentList = list
            this.contentListTextBefore = textBeforeList
            this.contentListTextAfter = textAfterList
            this.buttons = buttons ? buttons : this.defaultButtons()
            this.showWhiteSpaces = showWhiteSpaces ? true : false;
            this.$refs.promptDialog.open()
        },
        handleButtonClick: function (buttonCallback) {
            if(buttonCallback){
                buttonCallback();
            }
            this.closePrompt();
        },
        closePrompt: function() {
            this.$refs.promptDialog.close()
        }
    },
    mounted() {

    },
    template: `
    <v-mdc-dialog ref="promptDialog" v-bind:title="title" v-bind:type="type">
        <v-mdc-dialog-content :style="contentStyle">
            <div v-if="contentText">{{contentText}}</div>
            <div v-else="v-else">
                <p v-if="contentListTextBefore" style="margin-top:0">{{contentListTextBefore}}</p>
                <ul style="margin:0">
                    <li v-for="(line, index) in contentList" v-bind:key="index">{{line}}</li>
                </ul>
                <p v-if="contentListTextAfter" style="margin-bottom:0">{{contentListTextAfter}}</p>
            </div>
        </v-mdc-dialog-content>
        <v-mdc-dialog-actions>
            <v-mdc-dialog-button v-for="(button, index) in buttons" v-bind:key="index" v-bind:label="button.label" v-bind:style="button.style" @click="handleButtonClick(button.callback)"></v-mdc-dialog-button>
        </v-mdc-dialog-actions>
    </v-mdc-dialog>
    `
})

Vue.component('v-mdc-tooltip', {
    props: ['id', 'delay', 'xpos', 'ypos', 'persistant', 'maxWidth'],
    data: function () {
        return {
            mdcelem: null,
        }
    },
    computed: {
        tooltipSurfaceStyle: function () {
            return {
                'max-width': this.maxWidth === undefined ? 'inherited' : this.maxWidth,
            }
        },
    },
    methods: {
    },
    watch: {
    },
    mounted() {
        if (mdc) {
            this.mdcelem = mdc.tooltip.MDCTooltip.attachTo(this.$refs.mdcbind);
            this.mdcelem.setShowDelay(this.delay ? parseInt(this.delay) : 100)
            this.mdcelem.setHideDelay(this.delay ? parseInt(this.delay) : 100)
            if (this.xpos || this.ypos) {
                this.mdcelem.setTooltipPosition(this.xpos, this.ypos)
            }
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <div v-bind:id="id" class="mdc-tooltip" role="tooltip" aria-hidden="true" ref="mdcbind">
        <div class="mdc-tooltip__surface mdc-tooltip__surface-animation" :style="tooltipSurfaceStyle">
            <slot></slot>
        </div>
    </div>
    `
})

/*
    Value should be an object with:
        - current: The current page (stars at 1)
        - pageSize: The amount of elements to be displayed per page
    > prop total is mandatory.
    > allowPageSizeUpdate is not implemented
    > nbButtonsPerSide must be at least 3 (if set)
*/
Vue.component('v-mdc-pagination', {
    props: ['value', 'total', 'allowPageSizeUpdate', 'nbButtonsPerSide', 'align'],
    data: function () {
        return {
        }
    },
    computed: {
        nbElements: function() {
            return parseInt(this.total)
        },
        isPreviousDisabled: function() {
            return this.value.current == 1
        },
        isNextDisabled: function() {
            return this.value.current == this.lastPage
        },
        lastPage: function() {
            return Math.max(Math.ceil(this.nbElements / this.value.pageSize), 1)
        },
        mainStyle: function () {
            return {
                "text-align": this.align ? this.align : "center"
            }
        },
        buttonsStyle: function() {
            return {
                "min-width": "60px"
            }
        },
        buttonFirstPageStyle: function() {
            return {
                "min-width": "60px",
                "margin-right" : this.lastPage <= 2 ? "3px" : ""
            }
        },
        pageSizeUpdateAllowed: function () {
            return this.allowPageSizeUpdate === "" || this.allowPageSizeUpdate === "true" || this.allowPageSizeUpdate === true ? true : false
        },
        optionalPagesButtons: function() {
            let ret = []
            for (let i=2 ; i<this.lastPage ; ++i) {
                ret.push(i)
            }
            return ret
        }
    },
    methods: {
        isCurrentPage: function(page) {
            return page == this.value.current
        },
        setPage: function(page) {
            this.$emit("input", {
                current: page,
                pageSize: this.value.pageSize
            });
        },
        setPageSize: function(pageSize) {
            this.$emit("input", {
                current: 0,
                pageSize: pageSize
            });
        },
        // Logic to display always 2*nbButtonsBySide+1 buttons
        isPageButtonDisplayed: function(page) {
            let safeNbButtonsPerSide = 3;
            if (this.nbButtonsPerSide && parseInt(this.nbButtonsPerSide) >= 3) {
                safeNbButtonsPerSide = parseInt(this.nbButtonsPerSide)
            }
            if (this.lastPage <= 1+(safeNbButtonsPerSide*2)) {
                return true
            }
            // Special behavior when current page is close to the edge
            if (page <= (safeNbButtonsPerSide*2)-1 && this.value.current < safeNbButtonsPerSide+2) {
                return true
            }
            if (page >= this.lastPage-(safeNbButtonsPerSide-1)*2 && this.value.current > this.lastPage-safeNbButtonsPerSide-1) {
                return true
            }
            return Math.abs(page - this.value.current) <= safeNbButtonsPerSide-2
        },
    },
    watch: {
        "lastPage": function(newVal, oldVal) {
            if (newVal < this.value.current) {
                this.value.current = newVal
            }
        }
    },
    mounted() {
    },
    template: `
    <div :style="mainStyle" v-if="lastPage!=1">
        <v-mdc-button :style="buttonsStyle" raised :disabled="isPreviousDisabled" icon="navigate_before" @click="setPage(value.current-1)"/>
        <v-mdc-button :style="buttonFirstPageStyle" :raised="!isCurrentPage(1)" label="1" @click="setPage(1)"/>

        <v-mdc-button :style="buttonsStyle" v-if="!isPageButtonDisplayed(3)" raised disabled icon="more_horiz"/>
        <v-mdc-button
            :style="buttonsStyle"
            v-for="(val, id) of optionalPagesButtons"
            :key="val"
            v-if="isPageButtonDisplayed(val)"
            :raised="!isCurrentPage(val)"
            :label="val" @click="setPage(val)"
            style="margin-right:3px"
        />
        <v-mdc-button :style="buttonsStyle" v-if="!isPageButtonDisplayed(lastPage-2)" raised disabled icon="more_horiz" style="margin-right:3px;margin-left:-3px"/>

        <v-mdc-button :style="buttonsStyle" v-if="lastPage != 1" :raised="!isCurrentPage(lastPage)" :label="lastPage" @click="setPage(lastPage)" style="margin-right:3px;margin-left:-3px"/>
        <v-mdc-button :style="buttonsStyle" raised :disabled="isNextDisabled" icon="navigate_next" @click="setPage(value.current+1)" style="margin-left:-3px"/>
    </div>
    `
})


Vue.component('v-mdc-chip', {
    props: ['label', 'disabled'],
    data: function () {
        return {
            
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled === "" || this.disabled === "true" || this.disabled === true ? true : false
        },
    },
    methods: {
        
    },
    watch: {
        
    },
    mounted() {
        
    },
    template: `
    <span class="mdc-evolution-chip" role="row">
      <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
        <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="-1" :disabled="isDisabled">
          <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
          <span class="mdc-evolution-chip__text-label">{{label}}</span>
        </button>
      </span>
    </span>
    `
})

Vue.component('v-mdc-list', {
    props: ["twoLine"],
    data: function () {
        return {
            mdcelem: null
        }
    },
    methods: {
        isTwoLine: function(){
            return this.twoLine === "" || this.twoLine === "true" || this.twoLine === true ? true : false
        }

    },
    computed: {
        listClass: function() {
            return {
                'mdc-list': true,
                'mdc-list--two-line': this.isTwoLine()
            }
        }
    },
    watch: {

    },
    mounted() {
        if (mdc) {
            this.mdcelem = mdc.list.MDCList.attachTo(this.$refs.mdcbind);
            console.log(this.mdcelem)
        } else {
            alert("It seems you are missing material design dependency")
        }
    },
    template: `
    <ul v-bind:class="listClass" ref="mdcbind">
        <slot></slot>
    </ul>
    `
})

Vue.component('v-mdc-list-item', {
    props: ["text", "secondaryText"],
    data: function () {
        return {
            mdcelem: null
        }
    },
    methods: {
        isTwoLine: function(){
            return this.secondaryText !== undefined && this.secondaryText !== ""
        }
    },
    watch: {
    },
    mounted() {
    },
    template: `
    <li class="mdc-list-item" tabindex="0">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text" v-if="isTwoLine()">
            <span class="mdc-list-item__primary-text">{{text}}</span>
            <span class="mdc-list-item__secondary-text" >{{secondaryText}}</span>
        </span>
        <span class="mdc-list-item__text" v-else>{{text}}</span>
    </li>
    `
})

Vue.component('v-mdc-list-divider', {
    props: [],
    template: `
    <li role="separator" class="mdc-list-divider"></li>
    `
})

Vue.component('v-mdc-icon', {
    props: ["icon"],
    template: `
    <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">{{icon}}</i>
    `
})
