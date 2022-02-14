import SearchScreen from "../../../components/search/SearchScreen";
import { mount } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import { MemoryRouter } from "react-router-dom";
//estoy reescribinedo todo los metodos, de la libreria y solo necesito modificar el useNavigation
//uso jest.requireActual traerme todos sus valores y no rompa otros test y modificar lo que necesito

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("testing_SearchScreen_component", () => {
  const contextValue = {
    user: {
      name: "John",
      logged: true,
    },
  };
  test("should_render_SearchScreen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search"]}>
          <SearchScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Buscar un heroe.");
  });

  test("should_render_component_with_batman", () => {
    const q = "batman";
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[`/search?q=${q}`]}>
          <SearchScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input").prop("value").trim()).toBe(q);
  });
  test("should_render_a_error_Element_if_heros_name_not exists", () => {
    const q = "batmandasdasdasdasdasdas";
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[`/search?q=${q}`]}>
          <SearchScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.find(".alert-danger").exists()).toBeTruthy();
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `No hay resultados: ${q}`
    );
  });

  test("should_call_navigate", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search`]}>
        <SearchScreen />
      </MemoryRouter>
    );
    wrapper
      .find("input")
      .simulate("change", { target: { name: "searchTerm", value: "batman" } });
    wrapper.find("form").prop("onSubmit")({ preventDefault: jest.fn() });
    expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
