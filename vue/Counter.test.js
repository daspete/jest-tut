import { mount  } from '@vue/test-utils'
import Counter from './Counter.vue'

test('should show "Counter" in an h1 tag', () => {
    const componentInstance = mount(Counter)

    expect(componentInstance.find('h1').text()).toBe('Counter')
})

test('should increment the counter when the button is clicked', () => {
    const componentInstance = mount(Counter)
    expect(componentInstance.vm.count).toBe(0)
    componentInstance.find('.increment').trigger('click')
    expect(componentInstance.vm.count).toBe(1)
})