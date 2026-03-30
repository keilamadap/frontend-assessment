'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface Props {
  children: ReactNode
}

export function ReactQueryProvider({ children }: Props) {
  const queryClientObject = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const [queryClient] = useState(queryClientObject)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="right" buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}
