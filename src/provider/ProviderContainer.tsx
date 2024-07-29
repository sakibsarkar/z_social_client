import ReduxProvider from "./ReduxProvider";
import SocketProvider from "./SocketProvider";
import { ThemeProvider } from "./theme-provider";

const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxProvider>
        <SocketProvider>{children}</SocketProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
