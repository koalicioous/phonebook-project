/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HighlightMatch from "../";

describe("HighlightMatch Component", () => {
  it("renders without errors", () => {
    const { getByText } = render(
      <HighlightMatch match="test">This is a test sentence.</HighlightMatch>
    );
    expect(getByText("This is a")).toBeInTheDocument();
  });
  it("renders without errors", () => {
    const { getByText } = render(
      <HighlightMatch match="test">This is a test sentence.</HighlightMatch>
    );
    expect(getByText("test")).toBeInTheDocument();
  });
  it("renders without errors", () => {
    const { getByText } = render(
      <HighlightMatch match="test">This is a test sentence.</HighlightMatch>
    );
    expect(getByText("sentence.")).toBeInTheDocument();
  });

  it("highlights the matching text", () => {
    const { container } = render(
      <HighlightMatch match="test">This is a test sentence.</HighlightMatch>
    );
    const strongElement = container.querySelector("strong");
    expect(strongElement).toBeInTheDocument();
    expect(strongElement?.textContent).toBe("test");
  });

  it("renders without highlighting when match is not provided", () => {
    const { container } = render(
      <HighlightMatch>This is a test sentence.</HighlightMatch>
    );
    const strongElement = container.querySelector("strong");
    expect(strongElement).toBeNull();
  });
});
