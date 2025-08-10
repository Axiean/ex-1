import React, { ComponentType, useEffect } from "react";

// This is the HOC function.
// It takes a component (WrappedComponent) and returns a new component.
export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  // The new component with the logging logic.
  const ComponentWithLogger = (props: P) => {
    // Use useEffect to log when the component mounts and unmounts.
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

    // Render the original component with its props.
    return <WrappedComponent {...(props as P)} />;
  };

  // Set a display name for easier debugging in React DevTools.
  ComponentWithLogger.displayName = `WithLogger(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithLogger;
}
