import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'

export const ClientPathRenderer = ({ element, clientPaths = [] }) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    const asyncEffect = async () => {
      const dynamicComponents = clientPaths.map(async path => {
        const { default: Comp } = await import(
          /* webpackMode: "eager" */
          `src/pages${path}.js`
        )

        return Comp
      })

      setComponents(await Promise.all(dynamicComponents))
    }

    asyncEffect()
  }, [clientPaths])

  return (
    <Router>
      {React.cloneElement(element, { default: true })}
      {components.map((Comp, i) => (
        <Comp key={clientPaths[i]} path={clientPaths[i]} />
      ))}
    </Router>
  )
}
