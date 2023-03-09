import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './button.component'

describe('Button', () => {
    it('renders', () => {
        render(<Button>CLICK ME</Button>)
        screen.debug()
        expect(screen.getByRole('button')).toBeInTheDocument()
        return screen.findByRole('button')
    })
})
