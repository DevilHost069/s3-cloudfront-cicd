import App from "./App";
import React from "react";

it("should return a fragment", () => {
  const result = App();
  expect(result.type).toBe(React.Fragment);
});

it("should not have any children", () => {
  const result = App();
  const routerProvider = result.props.children;
  expect(routerProvider.props.children).toBeUndefined();
});

it("should have data-testid attribute with value 'router-provider'", () => {
  const result = App();
  const routerProvider = result.props.children;
  expect(routerProvider.props["router"]).toBeDefined();
});
