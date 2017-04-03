/* eslint-disable no-undef, no-unused-vars, no-unused-expressions */


/* ********* CONFIGURE FIREBASE ********* */


const config = {
  apiKey: 'AIzaSyBbtZEaaqqhvp5r7eYbxaEigCT1CInXedM',
  authDomain: 'prototype-f8013.firebaseapp.com',
  databaseURL: 'https://prototype-f8013.firebaseio.com',
  storageBucket: 'prototype-f8013.appspot.com',
  messagingSenderId: '1077602867778',
};

firebase.initializeApp(config);


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
  let ago = (Date.now() - v) / 1000;

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

      <md-list v-if="messages.length">
        <md-list-item v-for="message in messages" :key="message['.key']">
          <div class="md-list-text-container">
            <span>{{ message.text }}</span>
            <span>{{ message.created | ago }}</span>
          </div>
        </md-list-item>
      </md-list>

      <footer>
        <md-whiteframe md-elevation="4">
          <input v-model="text" type="text" placeholder="Type a message..." @keyup.enter="add"/>
          <a @click="add">⬆️</a>
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
    add() {
      const created = firebase.database.ServerValue.TIMESTAMP;
      const text = this.text;

      this.$firebaseRefs.messages.push({ created, text });

      this.text = '';
    },
  },
};


/* ********* INITIALIZE VUE ********* */


const vm = new Vue({
  el: '#app',

  components: {
    Messages,
  },
});
