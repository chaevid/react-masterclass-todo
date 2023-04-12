import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/react-masterclass-todo',
    element: <App />,
  },
]);

export default router;
