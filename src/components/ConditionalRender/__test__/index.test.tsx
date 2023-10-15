/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import ConditionalRender from "../";
import "@testing-library/jest-dom";

describe("ConditionalRender Component", () => {
  it("renders children when condition is true", () => {
    const { getByText } = render(
      <ConditionalRender condition={true}>Rendered Content</ConditionalRender>
    );
    expect(getByText("Rendered Content")).toBeInTheDocument();
  });

  it("renders fallback when condition is false and fallback is provided", () => {
    const { getByText } = render(
      <ConditionalRender condition={false} fallback="Fallback Content">
        <div></div>
      </ConditionalRender>
    );
    expect(getByText("Fallback Content")).toBeInTheDocument();
  });

  it("renders null when condition is false and no fallback is provided", () => {
    const { container } = render(
      <ConditionalRender condition={false}>Rendered Content</ConditionalRender>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders null when condition is true and no fallback is provided", () => {
    const { container } = render(
      <ConditionalRender condition={true}>{null}</ConditionalRender>
    );
    expect(container.firstChild).toBeNull();
  });
});
