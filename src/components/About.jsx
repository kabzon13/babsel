import React, {PureComponent} from 'react';
import dog from '../images/dog.png';

class About extends PureComponent {

  render() {
      return (
          <div>
            Hello
        		<img src={dog} className="small-img"/>
          </div>
      );
  }
}

export default About;
