import { mount, shallow } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import AppRouter from "../../../components/routers/AppRouter";

describe("testing_AppRouter", () => {
  
  test("should_render_login_component_if_user_is_not_logged", () => {
    const contextValue = {
        user: { logged: false },
      };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe("Login");
  });
  test("should_render_marvel_component_if_user_is_not_logged", () => {
    const contextValue = {
        user: { logged: true, name: "Jorge"},
      };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".navbar").exists()).toBeTruthy();
  });
});
