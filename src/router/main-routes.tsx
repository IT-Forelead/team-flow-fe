import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import AIAgents from '@/pages/ai-agents/AIAgents.tsx';
import Settings from '@/pages/settings/Settings.tsx';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';

// Lazy load all main components for better code splitting
const Home = lazy(() => import('@/pages/home/Home.tsx'));
const Dashboard = lazy(() => import('@/pages/dashboard/index.tsx'));
const Users = lazy(() => import('@/pages/users/Users.tsx'));
const Projects = lazy(() => import('@/pages/projects/Projects.tsx'));

/**
 * Main application routes with required authentication
 */
export const mainRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="home" replace />,
  },
  {
    path: 'home',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.home" />
        <Home />
      </LazyComponent>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.dashboard" />
        <Dashboard />
      </LazyComponent>
    ),
  },
  {
    path: 'users',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.users" />
        <Users />
      </LazyComponent>
    ),
  },
  {
    path: 'ai-agents',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.agents" />
        <AIAgents />
      </LazyComponent>
    ),
  },
  {
    path: 'projects',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.projects" />
        <Projects />
      </LazyComponent>
    ),
  },
  {
    path: 'settings',
    element: (
      <LazyComponent>
        <PageTitle title="navigation.settings" />
        <Settings />
      </LazyComponent>
    ),
  },
];
