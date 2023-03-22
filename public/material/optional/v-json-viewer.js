JsonViewer.prototype.toString = Object.prototype.toString;

JsonViewer.prototype.isString = function(val) {
    return typeof val === 'string';
}

JsonViewer.prototype.isNumber = function(val) {
    return typeof val === 'number';
}

JsonViewer.prototype.isBoolean = function(val) {
    return typeof val === 'boolean';
}

JsonViewer.prototype.isUndefined = function(val) {
    return typeof val === 'undefined';
}

JsonViewer.prototype.isArray = function(val) {
    return this.toString.call(val) === '[object Array]';
}

JsonViewer.prototype.isObject = function(val) {
    return this.toString.call(val) === '[object Object]';
}

JsonViewer.prototype.isNull = function(val) {
    return this.toString.call(val) === '[object Null]';
}

JsonViewer.prototype.isFirst = true;

function JsonViewer(options) {
    const defaults = {
        theme: 'light',
        container: null,
        data: '{}',
        expand: false,
    };
    this.isFirst = true
    this.options = Object.assign(defaults, options);
    if (this.isNull(options.container)) {
        throw new Error('Container: dom element is required');
    }
    this.render();
}

JsonViewer.prototype.renderRight = function(theme, right, val) {
    if (this.isNumber(val)) {
        right.setAttribute('class', theme + 'rightNumber');
    } else if (this.isBoolean(val)) {
        right.setAttribute('class', theme + 'rightBoolean');
    } else if (val === 'null') {
        right.setAttribute('class', theme + 'rightNull');
    } else {
        right.setAttribute('class', theme + 'rightString');
    }
    right.innerText = val;
}

JsonViewer.prototype.renderChildren = function(theme, key, val, right, indent, left) {
    let self = this
    let folder = this.createElement('span');
    let rotate90 = (this.options.expand || this.isFirst) ? 'rotate90' : '';
    let addHeight = (this.options.expand || this.isFirst) ? 'add-height' : '';
    this.isFirst = false;
    folder.setAttribute('class', theme + 'folder ' + rotate90);
    folder.onclick = function (e) {
        let nextSibling = e.target.parentNode.nextSibling;
        self.toggleItem(nextSibling, e.target);
    }
    let len = 0;
    let isObj = false;
    if (this.isObject(val)) {
        len = Object.keys(val).length;
        isObj = true;
    } else {
        len = val.length;
    }
    left.innerHTML = isObj ? key + '&nbsp;&nbsp{' + len + '}' : key + '&nbsp;&nbsp[' + len + ']';
    left.prepend(folder);
    right.setAttribute('class', theme + 'rightObj ' + addHeight);
    self.parse(val, right, indent + 0, theme);
}
  
JsonViewer.prototype.parse = function(dataObj, parent, indent, theme) {
    let self = this
    this.forEach(dataObj, function (val, key) {
        const { left, right } = self.createItem(indent, theme, parent, key, typeof val !== 'object');
        if (typeof val !== 'object') {
            self.renderRight(theme, right, val);
        } else {
            self.renderChildren(theme, key, val, right, indent, left);
        }
    });
}

JsonViewer.prototype.createItem = function(indent, theme, parent, key, basicType) {
    let self = this
    let current = this.createElement('div');
    let left = this.createElement('div');
    let right = this.createElement('div');
    let wrap = this.createElement('div');

    current.style.marginLeft = indent * 2 + 'px';
    left.innerHTML = `${key}<span class="jv-${theme}-symbol">&nbsp;:&nbsp;</span>`;
    if (basicType) {
        current.appendChild(wrap);
        wrap.appendChild(left);
        wrap.appendChild(right);
        parent.appendChild(current);
        current.setAttribute('class', theme + 'current');
        wrap.setAttribute('class', 'jv-wrap');
        left.setAttribute('class', theme + 'left');
    } else {
        current.appendChild(left);
        current.appendChild(right);
        parent.appendChild(current);
        current.setAttribute('class', theme + 'current');
        left.setAttribute('class', theme + 'left jv-folder');
        left.onclick = function (e) {
            let nextSibling = e.target.nextSibling;
            self.toggleItem(nextSibling, e.target.querySelector('span'));
        }
    }
    
    return {
        left,
        right,
        current,
    };
}

JsonViewer.prototype.render = function () {
    let data = this.options.data;
    let theme = 'jv-' + this.options.theme + '-';
    let indent = 0;
    let parent = this.options.container;
    let key = 'object';
    let dataObj;
    
    parent.setAttribute('class', theme + 'con');
    try {
        dataObj = JSON.parse(data);
    } catch (error) {
        throw new Error('It is not a json format');
    }
    if (this.isArray(dataObj)) {
        key = 'array';
    }
    const { left, right } = this.createItem(indent, theme, parent, key);
    this.renderChildren(theme, key, dataObj, right, indent, left);
}

JsonViewer.prototype.toggleItem = function (ele, target) {
    var oldConsoleLog = console.log
    console.log = function(){}
    ele.classList.toggle('add-height');
    target.classList.toggle('rotate90');
    console.log = oldConsoleLog
}

JsonViewer.prototype.createElement = function (type) {
    return document.createElement(type);
}

JsonViewer.prototype.forEach = function (obj, fn) {
    if (this.isUndefined(obj) || this.isNull(obj)) {
        return;
    }
    if (typeof obj === 'object' && this.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                var aText = ""
                if(this.toString.call(obj[key]) === '[object Null]'){
                    aText = "null"
                } else {
                    aText = obj[key]
                }
                fn.call(null, aText, key, obj);
            }
        }
    }
}

Vue.component('v-json-viewer', {
    props: ['input'],
    mounted (){
        if(this.input != undefined){
            new JsonViewer({
                container: this.$refs.vuejsonviewer,
                data: JSON.stringify(this.input),
                theme: 'light',
                expand: false
            })
        }
    },
    template: `
        <span ref="vuejsonviewer"></span>
    `
})