import AppRoutes from './app-routes';
import ContainerWrapper from './components/common/container-wrapper';
import Navbar from './components/navbar/Navbar';
import { GlobalContextProvider } from './store';

const App = () => {
  return (
    <GlobalContextProvider>
        <Navbar />
      <ContainerWrapper>
        <div className='relative flex items-center justify-center w-full h-full'>
          <AppRoutes />
        </div>
      </ContainerWrapper>
    </GlobalContextProvider>
  );
};
export default App;