import { theme } from "@globals/theme";
import { GlobalStyle } from "@globals/index";

import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "@contexts/AuthContext";
import { ModalProvider } from "@contexts/ModalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
