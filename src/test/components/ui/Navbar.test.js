import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";
const mockNavigate = jest.fn();
jest.mock('react-router-dom',() =>(
    {
        ...jest.requireActual('react-router-dom'),
        useNavigate: ()=> mockNavigate
    }
));

describe("first", () => {
  test("should_render_Navbar_component", () => {
    const dispatch = jest.fn();
    const contextValue = {
      user: { logged: true, name: "Jorge" },
      dispatch,
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(
      contextValue.user.name
    );
  });
  test("should_render_login_component_later_logout_Action", () => {
    const dispatch = jest.fn();

    const contextValue = {
      user: { logged: true, name: "Jorge" },
      dispatch
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(
      contextValue.user.name
    );

    wrapper.find("button").simulate("click");
    expect(dispatch).toHaveBeenCalledWith({
        type: types.logout
    });
    expect(mockNavigate).toHaveBeenCalledWith("login", {"replace": true});
  });
});
