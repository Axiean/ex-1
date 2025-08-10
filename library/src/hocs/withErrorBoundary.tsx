import React, { ComponentType } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  const ComponentWithErrorBoundary = (props: P) => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...(props as P)} />
      </ErrorBoundary>
    );
  };

  ComponentWithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithErrorBoundary;
}
