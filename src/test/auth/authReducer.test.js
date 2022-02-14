import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas_authReducer", () => {
  test("should_return_initialState", () => {
    const initialState = { logged: false };
    const action = {};
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  test("should_return_a_user_logged_and_add_data_user", () => {
    const initialState = { logged: false };
    const action = {
      type: types.login,
      payload: { name: "Jorge" },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ ...action.payload, logged: true });
  });
  test("should_remove_a_user", () => {
    const initialState = { logged: true, name: "Jorge"  };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({logged: false });
  });
});
