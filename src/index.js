import ColorPicker from './ColorPicker.vue'

export default {
  install (app) {
    app.component('ColorPicker', ColorPicker)
  },
}

export { ColorPicker }
