import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Post/Post";
import { useNavigate, createBrowserRouter } from "react-router-dom";

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  const linkMock = vi.fn();
  const LinkMock = () => linkMock;
  const createbrowserrouterMock = vi.fn();
  const createBrowserRouterMock = () => createbrowserrouterMock;
  return { 
    useNavigate: useNavigateMock,
    Link: LinkMock,
    createBrowserRouter: createBrowserRouterMock
   };
});

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message", comments:[], likes:[], date: 
    "2024-02-08T15:10:29.364Z"};
    render(<Post post={testPost} />);

    const article = screen.getByTestId("post-test1");
    expect(article.textContent).toEqual("test message3:10:29 PM");
  });
});
