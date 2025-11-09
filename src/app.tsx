import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRootRoute, createRoute, Router, RouterProvider, Outlet, createHashHistory } from '@tanstack/react-router';
import { Button } from './components/ui/button';
import { useCounterStore, useLocalUser } from './store/counter';
import { useToggle, useRequest } from 'ahooks';
import './index.css';

const rootRoute = createRootRoute({
  component: () => (
    <div className="p-6">
      <Outlet />
    </div>
  ),
});

function Home() {
  const { count, inc, dec, reset } = useCounterStore();
  const [user, updateUser] = useLocalUser();
  const [on, { toggle }] = useToggle();
  const { data, loading } = useRequest(async () => {
    await new Promise((r) => setTimeout(r, 300));
    return { message: 'Hello from useRequest' };
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Hello World</h1>
      <p className="text-sm text-gray-500">TanStack Router + Zustand + use-immer + ahooks + shadcn</p>
      <div className="flex items-center gap-2">
        <Button onClick={dec} variant="secondary">-</Button>
        <span className="w-12 text-center font-mono">{count}</span>
        <Button onClick={inc}>+</Button>
        <Button onClick={reset} variant="outline">Reset</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => updateUser((d) => void (d.age += 1))}>Age +1 ({user.age})</Button>
        <Button onClick={toggle} variant="ghost">Toggle: {on ? 'ON' : 'OFF'}</Button>
      </div>
      <div className="text-sm">{loading ? 'Loading…' : data?.message}</div>
    </div>
  );
}

function About() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">About</h2>
      <p className="text-sm text-gray-500">This is a secondary route.</p>
    </div>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);
const router = new Router({ routeTree, history: createHashHistory() });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById('root')!;
if (!rootEl.children.length) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<RouterProvider router={router} />);
}
