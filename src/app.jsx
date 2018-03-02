import React from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';
import 'styles/index.scss';
import { Button } from 'react-bootstrap';

const App = () => (
  <div className='App'>
    <Navigation/>
    <div>
      <h1>It Works!</h1>
      <p>This React project just works including <span className="redBg">module</span> local styles.</p>
      <p>Enjoy!</p>
    </div>
      <Button>
          <span>
            Cool button Yo
          </span>
      </Button>
      <a href="#">
        <img
            width="50px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Xep14nDRAo4K0DUBS6Nvg5AM8eE7eLhBb749fiT1C2IfH6i1OA"
        />
        <span>Cool link Yo</span>
      </a>
  </div>
);

export default App;
