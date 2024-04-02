// List.test.js

import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { Constants } from "../utils/appConstants";
import PhotoItem from "../PhotoItem"; // Mock PhotoItem if needed
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import List from "../List";
import { ALBUM_DATA } from "../utils/testMocks/albumdata";

jest.mock("../utils/appConstants");

window.scrollTo = jest.fn();
beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(ALBUM_DATA),
  });
});

describe("List component", () => {
  test("should load", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await list();

    const listLayout = getByTestId("list-page");
    expect(listLayout).toBeDefined();
  });
  test("should have back(string) button", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await list();

    const backButton = getByTestId("list-back-button");
    expect(backButton).toBeDefined();
  });
  test("should load dashboard on back(string) click", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
              <Dashboard />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await list();
    const backButton = getByTestId("list-back-button");
    await act(() => {
      fireEvent.click(backButton);
    });
    const dashboardPage = getByTestId("dashboard");
    expect(dashboardPage).toBeDefined();
  });
  test("should have list of photos on load , each photo should have Add to favorites(String) button with thumbnail and title", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getAllByTestId } = await list();

    const photos = getAllByTestId("photo-item");
    expect(photos.length).toBe(10);

    const photosTitle = getAllByTestId("photo-title");
    expect(photosTitle[4].innerHTML).toBe(
      "natus nisi omnis corporis facere molestiae rerum in",
    );

    const photosThumnails = getAllByTestId("photo-thumbnail");
    expect(photosThumnails[4].src).toBe(
      "https://via.placeholder.com/150/f66b97",
    );

    const photosButtons = getAllByTestId("photo-button");
    expect(photosButtons[4].innerHTML).toBe("Add to favorites");
  });
  test("should update button text to Remove from favorites(String) on click of Add to favorites(String) button", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getAllByTestId } = await list();

    const photosButtons = getAllByTestId("photo-button");
    await act(() => {
      fireEvent.click(photosButtons[4]);
    });
    expect(photosButtons[4].innerHTML).toBe("Remove from favorites");

    await act(() => {
      fireEvent.click(photosButtons[7]);
    });
    expect(photosButtons[7].innerHTML).toBe("Remove from favorites");
  });

  test("should load dashboard page with favorites added on list page and with no button", async () => {
    const list = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <List />
              <Dashboard />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getAllByTestId, getByTestId } = await list();

    const photosButtons = getAllByTestId("photo-button");
    await act(() => {
      fireEvent.click(photosButtons[4]);
    });

    const backButton = getByTestId("list-back-button");
    await act(() => {
      fireEvent.click(backButton);
    });

    const dashboardPage = getByTestId("dashboard");
    expect(dashboardPage).toBeInTheDocument();

    const dashboardFavoritesPhotos = getAllByTestId("dashboard-photo-list");
    expect(dashboardFavoritesPhotos.length).toBe(1);
  });
});
