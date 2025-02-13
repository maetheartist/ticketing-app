import AppRoutes from './app-routes';
import ContainerWrapper from './components/common/container-wrapper';
import Navbar from './components/navbar/navbar';
import { GlobalContextProvider } from './store';

const App = () => {
  return (
    <GlobalContextProvider>
      <ContainerWrapper>
        <Navbar />
        <div className='relative flex items-center justify-center w-full h-full'>
          <AppRoutes />
        </div>
      </ContainerWrapper>
    </GlobalContextProvider>
  );
};
export default App;