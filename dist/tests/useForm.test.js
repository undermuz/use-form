// src/tests/useForm.test.ts
import "@testing-library/jest-dom";
import {
  act,
  renderHook
} from "@testing-library/react-hooks/pure";
import { useCallback, useMemo, useState } from "react";
import useForm from "../useForm.js";
var renderCounter = { current: 0 };
var useControlledForm = (props) => {
  const [value, setValue] = useState(() => {
    return Object.keys(props.fields).reduce(
      (acc, name) => {
        acc[name] = props.fields[name].initialValue;
        return acc;
      },
      {}
    );
  });
  const onChange = useCallback((v) => {
    console.log("setValue", v);
    setValue(v);
  }, []);
  const formConfig = useMemo(() => {
    return {
      ...props,
      value,
      onChange: (v) => onChange(v)
    };
  }, [value]);
  const form = useForm(formConfig);
  renderCounter.current++;
  console.log("Rendered: ", renderCounter.current);
  return [value, onChange, form];
};
describe("useForm", () => {
  const FORM_CONFIG = {
    fields: {
      username: {
        label: "Login",
        rules: [[[Boolean], "Username is required"]],
        initialValue: ""
      },
      password: {
        label: "Password",
        rules: [[[Boolean], "Password is required"]],
        initialValue: ""
      }
    }
  };
  let renderHookResults;
  beforeAll(() => {
    renderHookResults = renderHook((config) => useForm(config), {
      initialProps: FORM_CONFIG
    });
  });
  test("initials values", () => {
    const { result } = renderHookResults;
    expect(result.current.values.username).toBe("");
    expect(result.current.values.password).toBe("");
  });
  test("set values", () => {
    const { result } = renderHookResults;
    act(() => result.current.setValue("username", "some_user_name"));
    act(() => result.current.setValue("password", "some_password"));
    expect(result.current.values.username).toBe("some_user_name");
    expect(result.current.values.password).toBe("some_password");
  });
  test("validate values without any error", () => {
    const { result } = renderHookResults;
    act(() => result.current.setTouchedByName("username"));
    act(() => result.current.setTouchedByName("password"));
    expect(result.current.errors).toEqual({});
  });
  test("validate values with errors", () => {
    const { result } = renderHookResults;
    act(() => result.current.setValue("username", ""));
    act(() => result.current.setValue("password", ""));
    expect(result.current.errors).toEqual({
      password: ["Password is required"],
      username: ["Username is required"]
    });
  });
  test("correct errors", () => {
    const { result } = renderHookResults;
    act(() => result.current.setValue("username", "some_user_name_2"));
    act(() => result.current.setValue("password", "some_password_2"));
    expect(result.current.values.username).toBe("some_user_name_2");
    expect(result.current.values.password).toBe("some_password_2");
    expect(result.current.errors).toEqual({});
  });
});
describe("useControlledForm", () => {
  const FORM_CONFIG = {
    fields: {
      username: {
        label: "Login",
        rules: [[[Boolean], "Username is required"]],
        initialValue: ""
      },
      password: {
        label: "Password",
        rules: [[[Boolean], "Password is required"]],
        initialValue: ""
      }
    },
    options: {
      debug: true
    }
  };
  let renderHookResults;
  beforeAll(() => {
    const username = FORM_CONFIG.fields.username;
    const password = FORM_CONFIG.fields.password;
    username.initialValue = "123";
    password.initialValue = "321";
    renderHookResults = renderHook((config) => useControlledForm(config), {
      initialProps: FORM_CONFIG
    });
  });
  test("initials values", () => {
    const { result } = renderHookResults;
    expect(result.current[2].values.username).toBe("123");
    expect(result.current[2].values.password).toBe("321");
    expect(renderCounter.current).toBe(1);
  });
  test("set values by external state", async () => {
    const { result } = renderHookResults;
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    act(
      () => result.current[1]({
        username: "some_user_name",
        password: "some_password"
      })
    );
    expect(renderCounter.current).toBe(2);
    expect(result.current[2].values.username).toBe("some_user_name");
    expect(result.current[2].values.password).toBe("some_password");
  });
  test("set values by internal methods", async () => {
    const { result } = renderHookResults;
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    act(() => result.current[2].setValue("username", "some_user_name_2"));
    act(() => result.current[2].setValue("password", "some_password_2"));
    expect(renderCounter.current).toBe(4);
    expect(result.current[2].values.username).toBe("some_user_name_2");
    expect(result.current[2].values.password).toBe("some_password_2");
    expect(result.current[0].username).toBe("some_user_name_2");
    expect(result.current[0].password).toBe("some_password_2");
  });
  test("validate values without any error", () => {
    const { result } = renderHookResults;
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    act(() => result.current[2].setTouchedByName("username"));
    act(() => result.current[2].setTouchedByName("password"));
    expect(renderCounter.current).toBe(2);
    expect(result.current[2].errors).toEqual({});
  });
  test("validate values with errors", async () => {
    const { result } = renderHookResults;
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    act(
      () => result.current[1]({
        username: "",
        password: ""
      })
    );
    expect(renderCounter.current).toBe(2);
    expect(result.current[2].errors).toEqual({
      password: ["Password is required"],
      username: ["Username is required"]
    });
  });
  test("correct errors", async () => {
    const { result } = renderHookResults;
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    act(
      () => result.current[1]({
        username: "some_user_name_3",
        password: "some_password_3"
      })
    );
    expect(renderCounter.current).toBe(2);
    expect(result.current[2].values.username).toBe("some_user_name_3");
    expect(result.current[2].values.password).toBe("some_password_3");
    expect(result.current[2].errors).toEqual({});
  });
  test("send form error", async () => {
    const { result } = renderHookResults;
    const mockOnSend = jest.fn(() => Promise.reject());
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    await act(async () => {
      await expect(
        result.current[2].send(mockOnSend)
      ).rejects.toThrowError("Request has failed");
    });
    expect(mockOnSend.mock.calls.length).toBe(1);
    expect(mockOnSend.mock.calls[0][0]).toEqual({
      username: "some_user_name_3",
      password: "some_password_3"
    });
    expect(result.current[2].values.username).toBe("some_user_name_3");
    expect(result.current[2].values.password).toBe("some_password_3");
    expect(result.current[2].errors).toEqual({});
    expect(renderCounter.current).toBe(4);
  });
  test("send form success", async () => {
    const { result } = renderHookResults;
    const mockOnSend = jest.fn(() => Promise.resolve());
    renderCounter.current = 0;
    console.log("[Rendered]", 0);
    await act(async () => {
      await result.current[2].send(mockOnSend);
    });
    expect(mockOnSend.mock.calls.length).toBe(1);
    expect(mockOnSend.mock.calls[0][0]).toEqual({
      username: "some_user_name_3",
      password: "some_password_3"
    });
    expect(result.current[2].values.username).toBe("some_user_name_3");
    expect(result.current[2].values.password).toBe("some_password_3");
    expect(result.current[2].errors).toEqual({});
    expect(renderCounter.current).toBe(5);
  });
});
