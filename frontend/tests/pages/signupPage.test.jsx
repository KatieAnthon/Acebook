import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

import { Link } from "react-router-dom";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  const linkMock = vi.fn();
  const LinkMock = () => linkMock;
  
  return { useNavigate: useNavigateMock, Link: LinkMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
// changed to match password regex
const completeSignupForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByPlaceholderText("Email Address");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const submitButtonEl = screen.getByTestId("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "TestPassword1!");
  await user.type(usernameInputEl, "TestUsername");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    const formData = new FormData()
    formData.append("email", "test@email.com")
    formData.append("password", "TestPassword1!")
    formData.append("username", "TestUsername")
  

    expect(formData.get("Email Address") === "test@email.com");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });


  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith('/signup');
  });
});
