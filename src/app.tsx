import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'
import { HelmetProvider } from 'react-helmet-async'
import { Inspector } from 'react-dev-inspector'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={createRouter()} />
        <ReactQueryDevtools />
        <Inspector keys={['ctrl', 'q']} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
