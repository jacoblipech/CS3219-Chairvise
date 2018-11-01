import { shallowMount } from '@vue/test-utils'
import WelcomeMessage from '@/components/homePageDetail/WelcomeMessage.vue'

describe('WelcomeMessage.vue', () => {
  it('renders welcome msg correctly', () => {
    const msg = 'Welcome to Conference Management System'
    const wrapper = shallowMount(WelcomeMessage, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
