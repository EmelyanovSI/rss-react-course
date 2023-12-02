import { Component } from 'react';

interface AppState {}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return <div>Hello world!!!</div>;
  }
}

export default App;
