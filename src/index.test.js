// TO DO: For some reason, the following import resolves to `Vue === undefined`.
// import Vue from 'vue'
import * as Vue from 'vue'

describe('index.js', () => {
  test('default export has “install” function', async () => {
    const { default: ColorPickerPlugin } = await import('./index.js')

    expect(typeof ColorPickerPlugin.install).toBe('function')
  })

  test('calling default export’s “install” method calls “app.component” correctly', async () => {
    jest.spyOn(global.console, 'warn').mockImplementation()
    const { default: ColorPickerPlugin, ColorPicker } = await import('./index.js')
    const app = Vue.createApp({})
    jest.spyOn(app, 'component')

    ColorPickerPlugin.install(app)

    expect(app.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)

    ColorPickerPlugin.install(app)

    expect(global.console.warn).toHaveBeenCalledWith('[Vue warn]: Component "ColorPicker" has already been registered in target app.')
    expect(app.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)
  })

  test('Using “app.use(plugin)” calls “app.component” correctly', async () => {
    jest.spyOn(global.console, 'warn').mockImplementation()
    const { default: ColorPickerPlugin, ColorPicker } = await import('./index.js')
    const app = Vue.createApp({})
    jest.spyOn(app, 'component')

    app.use(ColorPickerPlugin)

    expect(app.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)

    app.use(ColorPickerPlugin)

    expect(global.console.warn).toHaveBeenCalledWith('[Vue warn]: Plugin has already been applied to target app.')
    expect(app.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)
  })
})
