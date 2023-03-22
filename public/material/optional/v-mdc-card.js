Vue.component('v-mdc-card', {
    props: ["outlined"],
    computed: {
        isOutlined: function () {
            return this.outlined === "" || this.outlined === "true" || this.outlined === true ? true : false
        },
        cardClass: function () {
            return {
                "mdc-card--outlined": this.isOutlined,
                "mdc-card": true,
            }
        }
    },
    template: `
    <div :class="cardClass">
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-card-media', {
    props: ['image'],
    data: function () {
        return {
        }
    },
    computed: {
        imageStyle: function () {
            return {
                'background-image' : `url("${this.image}")`
            }
        },
    },
    methods: {
    },
    watch: {
    },
    mounted() {
    },
    template: `
    <div class="mdc-card__media mdc-card__media--square" :style="imageStyle">
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-card-actions', {
    template: `
    <div class="mdc-card__actions">
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-card-actions-buttons', {
    template: `
    <div class="mdc-card__action-buttons">
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-card-actions-button', {
    props: ['label'],
    template: `
    <button class="mdc-button mdc-card__action mdc-card__action--button">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">{{label}}</span>
    </button>
    `
})

Vue.component('v-mdc-card-actions-icons', {
    template: `
    <div class="mdc-card__action-icons">
        <slot></slot>
    </div>
    `
})

Vue.component('v-mdc-card-actions-icon', {
    props: ['icon'],
    methods: {
        handleClick: function(e) {
            this.$emit('click', e)
        },
    },
    template: `
    <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" @click="handleClick">{{icon}}</button>
    `
})
