import React, {PureComponent} from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import Navigation from './components/Navigation';
import About from './components/About';
import 'normalize.css';
import 'styles/index.scss';
import { Button } from 'react-bootstrap';

class App extends PureComponent {

  render() {
      return (
          <div className='App'>
              <Navigation />
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
              <hr />
              <IntlProvider locale="en">
                  <FormattedMessage
                      id='FindMatchingJournalSearchForm.ArticleInformationInput.label'
                      defaultMessage='no dogs'
                  />
              </IntlProvider>
              <hr />
              <a href="#">
                  <img
                      width="50px"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Xep14nDRAo4K0DUBS6Nvg5AM8eE7eLhBb749fiT1C2IfH6i1OA"
                  />
                  <span>Cool link Yo</span>
              </a>
              <About></About>
          </div>
      );
  }
}


export default App;
