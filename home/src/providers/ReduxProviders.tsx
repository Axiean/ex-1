import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";
import { Spin } from "antd";
import React from "react";

interface ReduxProvidersProps {
  children: React.ReactNode;
}

/**
 * @component ReduxProviders
 * @description A single component to encapsulate all Redux-related context providers.
 * This component is responsible for setting up the Redux store and Redux Persist,
 * keeping the main `_app.tsx` clean and focused on layout.
 */
export const ReduxProviders: React.FC<ReduxProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spin fullscreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
