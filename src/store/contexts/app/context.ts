import React from 'react';

import { AppContext } from './provider';

import type { AppContextType } from './provider';

export const useAppContext = () => {
  return React.useContext(AppContext) as AppContextType;
};