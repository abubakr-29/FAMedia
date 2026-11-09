"use client";

import { Component, type ReactNode } from "react";

/**
 * Isolates optional, decorative UI (e.g. the WebGL hero background) so a
 * failure there — like a device without WebGL — never takes down the page.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Optional component failed and was skipped:", error);
  }

  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}
