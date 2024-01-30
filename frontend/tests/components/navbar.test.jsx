import { render, screen } from "@testing-library/react";

import NavBar from "../../src/components/NavBar";

describe("NavBar", () => {
    test("displays the navbar on the posts page", () => {
        render(<NavBar />);

        expect(screen.getByText(/Acebook/i)).toBeDefined()
    });
});