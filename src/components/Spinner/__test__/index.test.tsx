/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LoadingAnimation from "../";

describe("LoadingAnimation Component", () => {
  it("renders without errors", () => {
    const { container } = render(<LoadingAnimation />);
    expect(container).toBeInTheDocument();
  });

  it("renders SpinnerContainer and Spinner", () => {
    const { getByTestId } = render(<LoadingAnimation />);
    const spinnerContainer = getByTestId("spinner-container");
    const spinner = getByTestId("spinner");

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it("applies correct styles to Spinner", () => {
    const { getByTestId } = render(<LoadingAnimation />);
    const spinner = getByTestId("spinner");

    expect(spinner).toHaveStyle({
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #334155",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
    });
  });
});
