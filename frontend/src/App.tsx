
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Board } from './pages/Board/index'
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={
                <Board />
              } />
              
          </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
