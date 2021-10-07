import React from 'react';
import { Router } from '@reach/router';   /* this is new */
import Main from './views/Main';
import Detail from './views/Detail';
import Edit from './views/Edit';
function App() {
  return (
    <div className="App">
      <Router> 
        <Main path="/product/"/>
        <Detail path="/product/:id" />
        <Edit path="/product/:id/edit" />
      </Router>
    </div>
  );
}
export default App;

