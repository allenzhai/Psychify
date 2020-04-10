import React from "react";
import { render } from "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

it("renders the home page", () => {
  const { container } = render(<BrowserRouter><App /></BrowserRouter>);
  debugger;
  console.log(container);
  expect(container).toBeInTheDOM();
});
