import React from 'react'
import './App.css'
import { InputField } from './components/inputField/InputField'
import { Stats } from './components/Stats/Stats'
import { Navbar, NavbarBrand, NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <div className="App">
          <Navbar height={'5vh'} className={'bg-[#282c34]'}>
            <NavbarBrand
              className={'flex justify-start md:justify-center text-3xl'}
            >
              Typing Speed Test
            </NavbarBrand>
          </Navbar>
          <div className={'w-[80%]'}>
            <InputField />
            <Stats />
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default App
