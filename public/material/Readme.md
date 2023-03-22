
Include this repo as a submodule of your project if it can be useful for you.

Let's say you make those files available at */public/material*. Then you simply need to include them along with Vue base files:

```
link(href="public/material/material-components-web.min.css" rel="stylesheet")
link(href="https://fonts.googleapis.com/icon?family=Material+Icons", rel="stylesheet")
link(href="public/material/material-override.css" rel="stylesheet")
script(src="public/material/material-components-web.min.js")
```

Also don't hesitate to send PRs but avoid breaking APIs to keep compatibility with other tools using it.

# Components Documentation #

* [v-mdc-icon](#v-mdc-icon)
* [v-mdc-select](#v-mdc-select)
    * [v-mdc-option](#v-mdc-option)
* [v-mdc-text](#v-mdc-text)
* [v-mdc-switch](#v-mdc-switch)
* [v-mdc-button](#v-mdc-button)
* [v-mdc-checkbox](#v-mdc-checkbox)
* [v-mdc-tab-bar](#v-mdc-tab-bar)
    * [v-mdc-tab](#v-mdc-tab)
* [v-mdc-panel](#v-mdc-panel)
* [v-mdc-spinner](#v-mdc-spinner) (Loading circle)
* [v-mdc-snackbar](#v-mdc-snackbar) (Notifications handler)
* [v-mdc-dialog](#v-mdc-dialog)
* [v-mdc-prompt](#v-mdc-prompt)
* [v-mdc-tooltip](#v-mdc-tooltip)
* [v-mdc-pagination](#v-mdc-pagination)
* [v-mdc-list](#v-mdc-list)
    * [v-mdc-list-divider](#v-mdc-list-item)
    * [v-mdc-list-item](#v-mdc-list-item)

<a name="v-mdc-icon"></a>
## v-mdc-icon ##

Represents one item of a list

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| icon | The icon to use  | icon="close" |

### Example :

```html
<div id="app">
    <v-mdc-icon icon="close"/>
</div>
```

<a name="v-mdc-select"></a>
## v-mdc-select ##

```v-mdc-select``` requires to use [```v-mdc-option```](#v-mdc-option) to add values in the select

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| label  | Placeholder to display  | label="Select a type" |
| width  | Apply a width style | width="80%" |
| name  | Name of the select (Useful for forms)  | name="listOfElements" |
| disabled | Set the select to disabled state | disabled |

#### Methods :

| Method  | Effect |
| ------------- | ------------- |
| clear | Set the select to no selected option  |

### Example :

See example of [```v-mdc-option```](#v-mdc-option) to see full usage

<a name="v-mdc-option"></a>
## v-mdc-option ##

```v-mdc-option``` is used to define values in [```v-mdc-select```](#v-mdc-select)

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| value | Value to be assigned to v-mdc-select model when option is selected | value="optionOne" |

### Example :
```html
<v-mdc-select label="Select a type" v-model="selectedType">
        <v-mdc-option value="int">Integer</v-mdc-option>
        <v-mdc-option value="str">String</v-mdc-option>
</v-mdc-select>
```
The variable ```mySelectValue``` is part of the data of the parent component and is updated as the user select different values.

<a name="v-mdc-text"></a>
## v-mdc-text ##

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| label | Dynamic placeholder moving when the user click on the input | label="Username" |
| placeholder | Placeholder that appears when the input is focused and empty | placeholder="Enter a username" |
| list | Bind a basic HTML datalist to the input, for autocomplete purpose (More information [here](https://www.w3schools.com/tags/att_input_list.asp)) | value="optionOne" |
| type | Put a basic HTML type to the input | type="password" |
| multiple | Used in case type="email" to allow multiple emails | multiple |
| textarea | Turn the input text in a textarea | textarea |
| icon | Name of material design icon to display (All icons [here](https://material.io/resources/icons/?style=baseline)) | icon="home" |
| width | Apply a width style | width="100px" |
| height | Apply a height style (Only applicable to text areas) | height="200px" |
| name | Name of the text input (Useful for forms)  | name="username" |
| maxlength | Set the maximum amount of character in the field  | maxlength="30" |
| disabled | Set the input to disabled state | disabled |
| readonly | Set the input to readonly state | readonly |

#### Events :

| Event name  | Trigger | Usage example |
| ------------- | ------------- | ------------- |
| enter | When Enter key is pushed (Not applied to textareas) | @enter="myFunctionOnEnter" |
| keyup | When any key is entered | @keyup="myFunctionOnKeyUp" |


### Example 1 :
```html
<v-mdc-text label="Enter a type" icon="code" list="possibleTypes" v-model="enteredType" @enter="sendData"/>
<datalist id="possibleTypes">
    <option value="Integer"/>
    <option value="String"/>
    <option value="Float"/>
</datalist>
```
The variable ```enteredType``` value is equal to what the user has typed in the ```v-mdc-text```

### Example 2 :
```html
<v-mdc-text label="Enter email addresses" icon="email" type="email" multiple  v-model="enteredMails" maxlength="40"/>
```

<a name="v-mdc-switch"></a>
## v-mdc-switch ##

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| label | Placeholder of the switch | label="Activate super feature" |
| name | Name of the switch (Useful for forms)  | name="activeSuperFeature" |
| disabled | Set the switch to disabled state | disabled |

### Example :
```html
<v-mdc-switch label="Activate dark theme" name="darkThemeSwitch" v-model="isDarkThemeActivated"/>
```
The variable ```isDarkThemeActivated``` will be set to ```true``` or ```false``` depending on if the switch is activated or not.

<a name="v-mdc-button"></a>
## v-mdc-button ##

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| icon | Name of material design icon to display (All icons [here](https://material.io/resources/icons/?style=baseline)) | icon="search" |
| label | The text to display in the button | label="OK" |
| type | Apply a basic HTML type to the button | type="submit" |
| raised | Set the button to raised state  | raised |
| disabled | Set the button to disabled state  | disabled |

#### Events :

| Event name  | Trigger | Usage example |
| ------------- | ------------- | ------------- |
| click | When button is clicked | @click="doSomething" |

### Example :
```html
<v-mdc-button label="Submit" @click="sendAllDatas"/>
```

<a name="v-mdc-checkbox"></a>
## v-mdc-checkbox ##

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| label | The text to display next to the checkbox | label="Enable feature 1" |
| disabled | Set the checkbox to disabled state  | disabled |

### Example :
```html
<v-mdc-checkbox label="Activate feature" v-model="isFeatureActivated"/>
```

<a name="v-mdc-tab-bar"></a>
## v-mdc-tab-bar ##

```v-mdc-tab-bar``` requires to use [```v-mdc-tab```](#v-mdc-tab) to add tabs to the tab bar

### Example :

See example of [```v-mdc-tab```](#v-mdc-tab) to see full usage

<a name="v-mdc-tab"></a>
## v-mdc-tab ##

```v-mdc-tab``` is used to define tabs in [```v-mdc-tab-bar```](#v-mdc-tab-bar)

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| icon | Name of material design icon to display (All icons [here](https://material.io/resources/icons/?style=baseline)) | icon="search" |
| label | The text to display in the tab | label="My Account" |
| tabvalue | The value of the tab | tabvalue="myaccount" |

### Example :
```html
<v-mdc-tab-bar>
        <v-mdc-tab icon="account_box" label="My Account" tabvalue="myaccount" v-model="currentTab"/>
        <v-mdc-tab icon="folder" label="My Datas" tabvalue="mydatas" v-model="currentTab"/>
</v-mdc-tab-bar>
<v-mdc-button label="Delete my datas" @click="deleteDatas" v-if="currentTab == 'mydatas'"/>
```
The variable ```currentTab``` contains the tabvalue of the tab that is currently selected. Use ```v-if```  to make different elements appear depending on which tab is selected

<a name="v-mdc-panel"></a>
## v-mdc-panel ##

Displays a panel in which you can put the content you want. (Similar to a div, but with embed style)

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| icon | Name of material design icon to display (All icons [here](https://material.io/resources/icons/?style=baseline)) | icon="info" |
| title | The title of the panel | title="Welcome to my site !" |
| type | Defines the type of the panel (Influate its color) | type="success" |
| elevation | Set the elevation level (Put a shadow around the panel) | elevation="5" |

##### Available panel types :

| Type | Color |
| ------------- | ------------- |
| primary | Primary color of the website |
| secondary | Secondary color of the website |
| success | Green |
| info | Cyan |
| warning | Orange |
| error | Red |


### Example :
```html
<v-mdc-panel icon="info" title="Welcome !" type="info" elevation="4"/>
```

<a name="v-mdc-spinner"></a>
## v-mdc-spinner ##

Displays a loading spinner

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| scale | The size of the spinner (default is 0.7) | scale="1.3" |
| backgroundColor | Set the background color of the spinner | background-color="#fff" |
| spinnerColor | Set the color of the spinner | spinner-color="blue" |

### Example :

HTML :

```html
<v-mdc-spinner background-color="grey" spinner-color="red" v-if="isLoading"/>
```

And in your Vue component, for example :

```javascript
this.isLoading = true;
fetch(aUri)
.then(response => response.json())
.then(json => {
    // After the call is done, process some datas
    this.isLoading = false;
});
```

<a name="v-mdc-snackbar"></a>
## v-mdc-snackbar ##

Allows to send notification to the user.

#### Attributes:

No attributes needed, but a special setup has to be done in order for this component to catch notifications.

First, you need to define an array that will contain the notifications, and then push an object, such as :
```javascript
{
    message: "An error occured !",
    type: "error", // Will change the color of the notification
    buttons: [{  // This is optionnal
        label: "Retry",
        callback: () => { /* Some code */ }  // If the callback returns false, the notification stays
    }]
    sticky: true // If set to true, the notification will stay until the user click on it, default value is false
}
```
Then push this object in the array you created, the component will automatically consume it.

##### Available notification types :

| Type| Color |
| ------------- | ------------- |
| success | Green |
| error | Red |

### Example :
HTML :
```html
<v-mdc-snackbar v-model="arrayNotif"/>
<v-mdc-button label="Send Notification" @click="sendNotif"/>
```

In your Vue Component :
```javascript
new Vue({
    data: {
        arrayNotif: []
    },
    methods: {
        sendNotif: function() {
            this.arrayNotif.push({
                message: "This is an example notification",
                type: "success"
            });
        }
    }
})
```

<a name="v-mdc-dialog"></a>
## v-mdc-dialog ##

This component shows a pop-up when the ```open()``` function is called on it.
It depends on ```v-mdc-dialog-content```, ```v-mdc-dialog-actions``` and ```v-mdc-dialog-buttons```

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| title | Title of the pop-up  | title="Authentication required" |
| type | Type of pop-up | type="error" |
| disableClose | Makes the dialog impossible to close without an explicit call to close method | disableClose="true" |
| ref | The name to use when opening and closing the pop-up | ref="myDialog" |


#### Methods :

| Method  | Effect |
| ------------- | ------------- |
| open | open the dialog  |
| close | close the dialog |
| isOpen | returns true or false depending on the dialog's status |
| isCloseDisabled | returns true if the dialog can't be closed by default behaviour (clicking outside the dialog, or pushing Esc key) |

### Example :

```html
<v-mdc-button @click="$refs.loginDialog.open()"/>
<v-mdc-dialog ref="loginDialog" title="Authentication required" type="info">
    <v-mdc-dialog-content>
        <div> Some connection form </div>
    </v-mdc-dialog-content>
    <v-mdc-dialog-actions>
        <v-mdc-dialog-button label="Connect" @click="connect()" disabled="true"/>
        <v-mdc-dialog-button label="Close" @click="$refs.loginDialog.close()"/>
    </v-mdc-dialog-actions>
</v-mdc-dialog>
```

### Example :
```html
<v-mdc-button label="Submit" @click="sendAllDatas"/>
```

<a name="v-mdc-prompt"></a>
## v-mdc-prompt ##

This component is a simplified ```v-mdc-dialog```

### Example :

First simply set this component in one of your components
```html
<v-mdc-prompt ref="genericPrompt"></v-mdc-prompt>
```

Then you can simply ask to open a simple prompt with a title, a text content and buttons

```javascript
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
```

Or you can also put some text before and after a list of element (notice ```openPromptContentList``` instead of ```openPromptContentText```) :

```javascript
this.$refs.genericPrompt.openPromptContentList(
    "This is another test Prompt",
    'warning',
    "We detected some risks",
    ['Risk1', "Risk2", "Risk1000"],
    "Are you sure to do so ?",
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
            location.href = '/home'
        }
    }]
)
```

<a name="v-mdc-tooltip"></a>
## v-mdc-tooltip ##

Shows a tooltip on mouse hover

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| id | id of the element associated to this tooltip  | label="my-associated-element" |
| delay | (Optional) Delay to show the tooltip | delay="1000" |
| xpos | (Optional) Force position of the tooltip | xpos="center" |
| ypos | (Optional) Force position of the tooltip | ypos="end" |

### Example :

You can then put the content you want within the ```v-mdc-tooltip``` tag.

```html
<a aria-describedby="my-associated-element" href="www.google.com"> Link </a>
<v-mdc-tooltip id="my-associated-element" delay="1000">
    Some tooltip content
</v-mdc-tooltip>
```

<a name="v-mdc-pagination"></a>
## v-mdc-pagination ##

Display a set of buttons to select a page.

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| value | Model that will be updated, must contain "current" and "pageSize"  | v-model="pagination" |
| total | Total amount of elements to paginate | :total="myArrayOfElements.length" |
| allowPageSizeUpdate | NOT IMPLEMENTED Allow the user to change the amount of elements per page | allowPageSizeUpdate |
| nbButtonsPerSide | Defines how many buttons to display (will be in total nbButtonsPerSide*2 + 3). Must be at least 3, defaults to 3 if not set. | nbButtonsPerSide=4 |
| align | Choose how buttons are aligned (Optional. Defaults to 'center')  | align="right" |

### Example :

```javascript
var app = new Vue({
    el: '#app',
    data: {
        pagination: {
            current: 1,
            pageSize: 10
        },
        elements: []
    },
    computed: {
        elementsDisplayed : function() {
            return this.elements.slice(
                (this.pagination.current-1)*this.pagination.pageSize,
                this.pagination.current*this.pagination.pageSize
            )
        }
    },
    created: function() {
        let fakeData = []
        for (let i=0 ; i<125 ; i++) fakeData.push(i)
        this.elements = fakeData
    }
})
```

```html
<div id="app">
    <v-mdc-pagination v-model="pagination" :total="elements.length" />
    <ul>
        <li>curPage = {{pagination.current}}</li>
        <li>pageSize = {{pagination.pageSize}}</li>
        <li v-for="(val, id) of elementsDisplayed" v-bind:key="id">{{val}}</li>
    </ul>
</div>
```

<a name="v-mdc-list"></a>
## v-mdc-list ##

Display a list of item.

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| twoLine | Tells that the list is a two line list  | twoLine |

### Example :

See example of [```v-mdc-list-item```](#v-mdc-list-item) to see full usage

<a name="v-mdc-list-divider"></a>
## v-mdc-list-divider ##

Represents one item of a list

#### Attributes:
No attributes

### Example :

See example of [```v-mdc-list-item```](#v-mdc-list-item) to see full usage

<a name="v-mdc-list-item"></a>
## v-mdc-list-item ##

Represents one item of a list

#### Attributes:

| Prop  | Effect | Usage example |
| ------------- | ------------- | ------------- |
| text | The text contained in the item  | text="My item" |
| secondaryText | A secondary text contained under the main text  | secondaryText="My item" |

### Example :

```html
<div id="app">
    <v-mdc-list twoLine>
        <v-mdc-list-item text="My Item" secondaryText="This item is really cool"/>
        <v-mdc-list-divider/>
        <v-mdc-list-item text="My Second Item" secondaryText="This one, not really"/>
    </v-mdc-list>
</div>
```