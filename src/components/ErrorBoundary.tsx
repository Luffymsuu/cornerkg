"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  /** Element to render when a descendant component throws. Can be a
   *  static node or a render-prop with the captured error + a reset
   *  callback that re-mounts the children. */
  fallback: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /** Children rendered when no error has been captured. */
  children: ReactNode;
  /** Optional hook for telemetry / Sentry-style reporting. */
  onError?: (error: Error, info: { componentStack: string }) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Generic class-based React error boundary. Use this around any
 * client subtree that talks to localStorage, third-party SDKs, or
 * other inherently-fallible code so a single render error does not
 * blank the entire page. The Next.js App Router provides per-route
 * `error.tsx` files for server-thrown errors — this component is for
 * client component crashes that happen *after* the route mounted
 * (e.g. inside an Embla carousel or a Zustand subscriber).
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    // We deliberately do not log to console.error here — Next.js
    // already does that in development. Surface the error through
    // the onError prop so callers can pipe it to Sentry / Datadog.
    this.props.onError?.(error, {
      componentStack: info.componentStack ?? "",
    });
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      const { fallback } = this.props;
      if (typeof fallback === "function") {
        return fallback(this.state.error, this.reset);
      }
      return fallback;
    }
    return this.props.children;
  }
}
