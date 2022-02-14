import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import DashboardRoutes from "../../../components/routers/DashboardRoutes";

describe("testing_DashboardRoutes", () => {
  const contextValue = {
    user: {
      name: "John",
      logged: true,
    },
  };
  test("should_render_DashboardRoutes_on_marvel", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(
      contextValue.user.name
    );
    expect(wrapper.find(".container").find("h1").text().trim()).toBe(
      "MarvelScreen"
    );
  });
  test("should_render_DashboardRoutes_on_marvel", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/dc"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
   
  });
});
