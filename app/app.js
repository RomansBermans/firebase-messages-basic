/* */


/* ********* CONFIGURE FIREBASE ********* */


const config = {
  apiKey: 'AIzaSyBbtZEaaqqhvp5r7eYbxaEigCT1CInXedM',
  authDomain: 'prototype-f8013.firebaseapp.com',
  databaseURL: 'https://prototype-f8013.firebaseio.com',
  projectId: 'prototype-f8013',
  storageBucket: 'prototype-f8013.appspot.com',
  messagingSenderId: '1077602867778',
};

firebase.initializeApp(config);

const timestamp = firebase.database.ServerValue.TIMESTAMP;


/* ********* CONFIGURE VUE ********* */


Vue.use(VueMaterial);

const themes = {
  default: {
    primary: 'black',
    accent: 'grey',
    warn: 'red',
  },
};

Vue.material.registerTheme(themes);


/* ********* DEFINE VUE FILTERS ********* */


Vue.filter('ago', v => {
  let ago = Math.max(0, (Date.now() - v) / 1000);

  if (ago >= 86400) {
    ago = `${Math.round(ago / 86400)}d ago`;
  } else if (ago >= 3600) {
    ago = `${Math.round(ago / 3600)}h ago`;
  } else if (ago >= 60) {
    ago = `${Math.round(ago / 60)}m ago`;
  } else {
    ago = `${Math.round(ago)}s ago`;
  }

  return ago;
});


/* ********* DEFINE VUE MIXINS ********* */


const ListScroller = {
  mounted() {
    this.scroll();
  },

  updated() {
    this.scroll();
  },

  methods: {
    scroll() {
      const last = this.$el.querySelector('.md-list .md-list-item:last-child');

      last && last.scrollIntoView({ block: 'start', behavior: 'instant' });
    },
  },
};


/* ********* DEFINE VUE COMPONENTS ********* */


const Messages = {
  mixins: [ListScroller],

  template: `
    <section>
      <div class="scroll">
        <md-list v-if="messages.length">
          <md-list-item v-for="message in messages" :key="message['.key']">
            <div class="md-list-text-container">
              <span>{{ message.text }}</span>
              <span>{{ message.created | ago }}</span>
            </div>
          </md-list-item>
        </md-list>
      </div>
      <footer>
        <md-whiteframe md-elevation="4">
          <input ref="text" v-model="text" type="text" placeholder="send a message..." @keyup.enter="send"/>
          <md-button @click.native="send" class="md-icon-button">
            <md-icon>arrow_upward</md-icon>
          </md-button>
        </md-whiteframe>
      </footer>
    </section>
  `,

  data() {
    return {
      text: '',
    };
  },

  firebase: {
    messages: firebase.database().ref('messages').limitToLast(100),
  },

  methods: {
    send() {
      if (!this.text) {
        return;
      }

      this.$refs.text.focus();

      const { text } = this;
      this.text = '';

      this.$firebaseRefs.messages.push({ created: timestamp, text });
    },
    remove() {
      this.$firebaseRefs.messages.remove();
    },
  },
};


/* ********* INITIALIZE VUE ********* */


// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: '#app',

  data: {
    ready: false,
  },

  mounted() {
    this.ready = true;
  },

  components: {
    Messages,
  },
});
