import React, { useContext } from 'react'

const PluginContext = React.createContext()

export const PluginContextProvider = ({ children }) => (
  <PluginContext.Provider value="Plugin">{children}</PluginContext.Provider>
)

export const usePluginContext = () => useContext(PluginContext)
