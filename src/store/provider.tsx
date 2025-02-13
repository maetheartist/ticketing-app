import { ToastProvider, AppProvider } from '../store';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AppProvider>{children}</AppProvider>
    </ToastProvider>
  );
}
export default Provider;