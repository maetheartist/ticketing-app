import { lazy } from 'react';

export const TICKET_PAGE = '/my-tickets';
export const EVENTS_PAGE = '/';
export const ABOUT_PAGE = '/about';

export const routes = [
  {
    path: EVENTS_PAGE,
    component: lazy(() => import('../pages/events')),
  },
  {
    path: TICKET_PAGE,
    component: lazy(() => import('../pages/my-tickets')),
  },
  {
    path: ABOUT_PAGE,
    component: lazy(() => import('../pages/about')),
  },
];