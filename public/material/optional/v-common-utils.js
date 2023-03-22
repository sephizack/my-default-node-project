/*
    Doc:

*/
Vue.component('v-common-utils', {
    props: [],
    data: function () {
        return {
            notifs: []
        }
    },
    methods: {
        openPromptContentText: function(title, type, content, buttons, showWhiteSpaces) {
            this.$refs.genericPrompt.openPromptContentText(title, type, content, buttons, showWhiteSpaces)
        },
        openPromptContentList: function(title, type, textBeforeList, list, textAfterList, buttons, showWhiteSpaces) {
            this.$refs.genericPrompt.openPromptContentList(title, type, textBeforeList, list, textAfterList, buttons, showWhiteSpaces)
        },
        addSimpleNotif: function (text, type, isSticky) {
            this.notifs.push({
                message: text,
                type: type,
                sticky: isSticky ? true : false
            });
        },
        areObjectEquals: function(obj1, obj2) {
            //Loop through properties in object 1
            for (var p in obj1) {
                //Check property exists on both objects
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

                switch (typeof (obj1[p])) {
                    //Deep compare objects
                    case 'object':
                        if (!this.areObjectEquals(obj1[p], obj2[p])) return false;
                        break;
                    //Compare function code
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                        break;
                    //Compare values
                    default:
                        if (obj1[p] != obj2[p]) return false;
                }
            }

            //Check object 2 for any extra properties
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined') return false;
            }
            return true;
        },
        addNotif: function (notifData) {
            this.notifs.push(notifData);
        },
        desktopNotif: function(title, content, icon) {
            console.log("Sending desktop notif...", title, content)
            let thisComp = this
            Notification.requestPermission(function(status) {
                if (status == "denied") {
                    thisComp.addSimpleNotif("(Desktop Notifications are blocked on non HTTPS domains)\n"+title+": "+content, 'info')
                } else {
                    let data = {body: content}
                    if (icon) {
                        data['icon'] = icon
                    }
                    var n = new Notification(title, data);
                    n.onclick = function () {window.focus();n.close();};
                }
            });
        },
        dateToGmtStr: function(myDate) {
            return myDate.toLocaleString('en-GB', {timeZone: 'UTC'}) + " GMT"
        },
        convertDateStrToTimestamp: function(datestr) {
            let ret = 0
            try {
                ret = new Date(datestr).getTime()
                if (isNaN(ret)) {
                    ret = 0
                }
            } catch(e) {
                console.warn(e)
            }
            if (ret == 0) {
                console.log("Date received", datestr)
                this.addSimpleNotif("Date is not correct, unable to convert it to timestamp", "error")
            }
            return ret
        },
        copyToClipboard: function(textToCopy, message, eventToStopPropagation) {
            if (message === undefined) {
                message = "Text"
            }
            if (eventToStopPropagation) {
                eventToStopPropagation.stopPropagation()
                eventToStopPropagation.preventDefault()
            }
            let textareaToCopy = document.getElementById('copyToClipboardTextarea');
            if (!textareaToCopy) {
                let textarea = document.createElement('textarea');
                textarea.id = 'copyToClipboardTextarea'
                textarea.style.position = 'fixed'
                textarea.style.top = '-200px'
                document.body.appendChild(textarea)
                textareaToCopy = document.getElementById('copyToClipboardTextarea');
            }
            if (textareaToCopy) {
                textareaToCopy.innerHTML = textToCopy;
                textareaToCopy.select();
                var autoCopySuccessful = false;
                try {
                    autoCopySuccessful = document.execCommand('copy');
                } catch (err) {
                    console.log('Unable to copy: ', err);
                }
                if (autoCopySuccessful) {
                    this.addSimpleNotif(message, 'success')
                } else {
                    openPromptContentText(
                        'Unable to automatically copy to clipboard:',
                        'info',
                        textToCopy
                    )
                }
            } else {
                openPromptContentText(
                    'Unable to automatically copy to clipboard:',
                    'info',
                    textToCopy
                )
            }
            return false // for users to be able to return this return value to stop propagation
        }
    },
    computed: {
    },
    mounted: function() {
    },
    template: `
    <div style="margin:0">
        <v-mdc-snackbar v-model="notifs" />
        <v-mdc-prompt ref="genericPrompt" />
    </div>
    `
})
