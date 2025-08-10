import React, { ComponentType, useEffect } from "react";

export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  const ComponentWithLogger = (props: P) => {
    useEffect(() => {
      console.log(
        `Component mounted: ${
          WrappedComponent.displayName || WrappedComponent.name
        }`
      );

      return () => {
        console.log(
          `Component unmounted: ${
            WrappedComponent.displayName || WrappedComponent.name
          }`
        );
      };
    }, []);

    return <WrappedComponent {...(props as P)} />;
  };

  ComponentWithLogger.displayName = `WithLogger(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithLogger;
}
