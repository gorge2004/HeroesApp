import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/authContext';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../../../components/routers/PrivateRoute';
const text = 'Saliendo de aqui';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: ()=> (<span>{text}</span>)
}))
describe("testing_privateRoute", () => {
  Storage.prototype.setItem = jest.fn();

  test("should_render_correct_components", () => {
    const contextValue = {
      user: { logged: true, name: "Jorge" },
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <h1>Private Route</h1>
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Private Route');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('lastPath', '/');
  });
  test("should_not_render_correct_components", () => {
    const contextValue = {
      user: { logged: false },
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <h1>Private Route</h1>
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text().trim()).toBe(text);
  });
});
