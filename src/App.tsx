import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Task from './pages/Task';
import { ApolloClient, InMemoryCache, ApolloProvider, gql , DefaultOptions } from '@apollo/client';
import { AuthProvider } from './providers/AuthProvider';
import RequireAuth from './components/RequireAuth';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(
  ),
  defaultOptions: defaultOptions
});
function App() {

  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <AuthProvider>
            <ApolloProvider client={client}>
              <Router >
                <Routes>
                  <Route path="/" element={ <RequireAuth><Home /></RequireAuth>} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={ <SignUp />} />
                  <Route path="/task/:id" element={<Task />} />
                </Routes>
              </Router>
            </ApolloProvider>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
