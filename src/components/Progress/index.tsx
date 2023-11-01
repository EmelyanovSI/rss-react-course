import { Component } from 'react';

class Progress extends Component {
  render() {
    return (
      <div className="h-1 bg-red-100">
        <div className="h-full bg-red-300 animate-progress"></div>
      </div>
    );
  }
}

export default Progress;
