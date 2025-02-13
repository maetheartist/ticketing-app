import { Route, Routes } from 'react-router-dom';
import { routes } from './config/routes';
import { Suspense } from 'react';
import Loading from './components/common/loading';
import NotFound from './pages/404';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {routes.map((routes, index) => (
          <Route
            key={index}
            path={routes.path}
            element={
              <Suspense fallback={<Loading />}>{<routes.component />}</Suspense>
            }
          />
        ))}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default AppRoutes;