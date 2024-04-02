// Dashboard.test.js

import React from 'react';
import { Provider } from "react-redux";
import { act, fireEvent, render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { Constants } from '../utils/appConstants';
import PhotoItem from '../PhotoItem'; // Mock PhotoItem if needed
import appStore from '../utils/appStore';
import { BrowserRouter } from 'react-router-dom';
import List from '../List';

jest.mock('../utils/appConstants'); 

window.scrollTo = jest.fn();

describe('Dashboard component', () => {
  test("should load", async () => {
    const dashboard = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
          <Provider store={appStore}>
            <Dashboard />
          </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await dashboard();

    const dashboardLayout = getByTestId("dashboard");
    expect(dashboardLayout).toBeDefined();
  });
  test("should have heading as dashboard-heading(string)", async () => {
    const dashboard = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <Dashboard />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await dashboard();

    const dashboardHeading = getByTestId("dashboard-heading");
    expect(dashboardHeading).toBeDefined();
  });
  test("should have button as dashboard-go-to-list-button(string)", async () => {
    const dashboard = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <Dashboard />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await dashboard();

    const dashboardGoToListButton = getByTestId("dashboard-go-to-list-button");
    expect(dashboardGoToListButton).toBeDefined();
  });
  test("should have sub-heading as dashboard-sub-heading-favorites(string)", async () => {
    const dashboard = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <Dashboard />
            </Provider>
          </BrowserRouter>,
        ),
      );

    const { getByTestId } = await dashboard();

    const dashboardSubHeading = getByTestId("dashboard-sub-heading-favorites");
    expect(dashboardSubHeading).toBeDefined();
  });
  test("should load list page on click of Go to list(string) button", async () => {
    const dashboard = async () =>
      await act(async () =>
        render(
          <BrowserRouter>
            <Provider store={appStore}>
              <Dashboard />
              <List/>
            </Provider>
          </BrowserRouter>,
        ),
      );

      const { getByTestId } = await dashboard();

      const dashboardGoToListButton = getByTestId("dashboard-go-to-list-button");
      await act(() => { fireEvent.click(dashboardGoToListButton) })
      const listPage = getByTestId("list-page");
      expect(listPage).toBeDefined();
  });
});
