import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { types } from "../../../types/types";
import HeroScreen from "../../../components/hero/HeroScreen";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("test_HeroScreen", () => {
  test("should_not_render_heroScreen_if_there_is_not_a_hero_on URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe"]}>
        <Routes>
          <Route path="/heroe" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find('h1').text().trim()).toBe('No hero page');
  });
  test("should_render_heroScreen_if_there_is_a_hero_on URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/marvel-spider"]}>
        <Routes>
          <Route path="/heroe/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find('.row').exists()).toBe(true);
  });
  test("should_render_previuos_component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/marvel-spider"]}>
        <Routes>
          <Route path="/heroe/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    wrapper.find("button").simulate("click");
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  test("should_not_render_heroScreen_if_there_is_not_a_hero_by_name_on URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/marvel-spider2"]}>
        <Routes>
          <Route path="/heroe/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find('h1').text().trim()).toBe('No hero page');

  });
  
});
