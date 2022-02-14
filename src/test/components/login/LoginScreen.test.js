import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import LoginScreen from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("testing_login_component", () => {
  test("should _render_login_component", () => {
    const dispatch = jest.fn();
    const contextValue = { logged: false, dispatch };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").text().trim()).toBe("Login");
  });
  test("should _calls_login_action", () => {
    const dispatch = jest.fn();
    const contextValue = { logged: false, dispatch };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").text().trim()).toBe("Login");

    wrapper.find("button").simulate("click");
    const action = {
        type: types.login,
        payload : {
          name: "Jorge",
        }
      };
    expect(dispatch).toHaveBeenCalledWith(action);
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', {replace: true});
    localStorage.setItem('lastPath','/dc');
    wrapper.find("button").simulate("click");
    expect(mockNavigate).toHaveBeenCalledWith('/dc', {replace: true});


  });
});
