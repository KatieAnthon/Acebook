import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { expect, it } from "vitest"

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate, createBrowserRouter } from "react-router-dom";


// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
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

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");


    const mockPosts = [{ _id: "12345", message: "Test Post 1", comments:[], likes:[], date: 
    "2024-02-08T15:10:29.364Z" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByTestId("post-test1");

    
  
    expect(post.textContent).toEqual("Test Post 13:10:29 PM");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
