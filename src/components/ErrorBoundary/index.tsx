/*
 * @Description: 错误边界组建
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-19 20:56:55
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-21 19:59:20
 */

import React, { Component } from 'react';

type IProps = {};
type IState = {
  hasError: boolean;
};
export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
