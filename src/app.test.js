import { fireEvent, render } from "@testing-library/react";
import App from "./App";

// eslint-disable-next-line no-undef
describe("Вод текста", () => {
  const view = render(<App />);

  const input = view.getByTestId("user-input");

  fireEvent.change(input, { target: { value: "Hello" } });

  // eslint-disable-next-line no-undef
  expect(input.value).toBe("Hello");
});
