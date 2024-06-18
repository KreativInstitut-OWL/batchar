import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { LanguageProvider } from "../LanguageProvider";

test("renders header", () => {
  render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>,
  );
  const headerElement = screen.getByAltText("KIO Logo");
  expect(headerElement).not.toBeNull();
});
