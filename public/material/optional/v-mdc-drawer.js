Vue.component('v-mdc-drawer', {
    props: ['id'],
    data: function () {
        return {
            selectedTab: null
        }
    },
    computed: {
    },
    methods: {
        unselectCurrentTab: function(){
            this.selectedTab.classList.remove("mdc-deprecated-list-item--activated")
            this.selectedTab = null;
        }
    },
    watch: {
    },
    mounted() {
        this.$on('drawer-item-click', function(event) {
            if(this.selectedTab){
                this.selectedTab.classList.remove("mdc-deprecated-list-item--activated")
            }
            this.selectedTab = event.target
            this.selectedTab.classList.add("mdc-deprecated-list-item--activated")
            this.$emit('click', this.selectedTab)
        })
    },
    template: `
    <aside class="mdc-drawer" style="width:150%; height:500px">
        <div class="mdc-drawer__content">
            <nav class="mdc-deprecated-list" v-bind:id="id">
                <slot></slot>
            </nav>
      </div>
    </aside>
    `
})

Vue.component('v-mdc-drawer-item', {
    props: ['icon', 'selected'],
    data: function () {
        return {
        }
    },
    computed: {
        isSelected: function () {
            return this.selected === "" || this.selected === "true" || this.selected === true ? true : false
        },
        itemClass: function () {
            return {
                "mdc-deprecated-list-item--activated": this.isSelected ? true : false,
                "mdc-deprecated-list-item": true,
                "mdc-ripple-upgraded": true,
            }
        }
    },
    methods: {
        handleClick: function(event){
            this.$parent.$emit('drawer-item-click', event)
            this.$emit('click', event)
        }
    },
    watch: {
    },
    mounted() {
    },
    template: `
    <a v-bind:class="itemClass"
        @click="handleClick($event)"
        aria-current="page"
    >
        <span class="mdc-deprecated-list-item__ripple"></span>
        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">{{icon}}</i>
        <slot></slot>
    </a>
    `
})

Vue.component('v-mdc-drawer-item-text', {
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
    <span class="mdc-deprecated-list-item__text">
        <slot></slot>
    </span>
    `
})

Vue.component('v-mdc-drawer-item-meta', {
    props: [],
    data: function () {
        return {
        }
    },
    computed: {
    },
    methods: {
        preventClick: function () {
            event.target.blur()
            event.stopPropagation()
            return false;
        }
    },
    watch: {
    },
    mounted() {
    },
    template: `
    <span class="mdc-deprecated-list-item__meta" aria-hidden="true" @click="preventClick($event)">
        <slot></slot>
    </span>
    `
})