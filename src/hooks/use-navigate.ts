import React from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export default function useNavigation() {
  const router = useNavigate();

  const navigate = React.useCallback(
    (route: string, options?: NavigateOptions) => {
      router(route, options);
    },
    [router]
  );

  const goBack = React.useCallback(() => {
    router(-1);
  }, [router]);

  return {
    navigate,
    goBack,
  };
}