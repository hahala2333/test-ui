// ButtonComponent.test.js
import { mount } from '@vue/test-utils'
import ButtonComponent from '../index.vue'
import { describe, it, expect } from 'vitest'

describe('ButtonComponent', () => {
  it('渲染默认 slot 内容', () => {
    const wrapper = mount(ButtonComponent)
    expect(wrapper.text()).toBe('默认内容')
  })

  it('渲染传入的 slot 内容', () => {
    const wrapper = mount(ButtonComponent, {
      slots: {
        default: '点击我'
      }
    })
    expect(wrapper.text()).toBe('点击我')
  })
})
