import React from 'react'

import { ClientPathRenderer } from './components/ClientPathRenderer'

export const wrapRootElement = ({ element }, { clientPaths = [] }) => (
  <ClientPathRenderer element={element} clientPaths={clientPaths} />
)
