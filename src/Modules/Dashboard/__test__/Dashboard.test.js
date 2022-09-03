import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import renderer from "react-test-renderer";

test("Dashboard renders", () => {
    render(<Dashboard />);
    const textElement = screen.getByText(/Services/i);
    expect(textElement).toBeInTheDocument();
});


test("matches dashboar snapshot", () => {
    const component = renderer.create(<Dashboard />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});