// mock/list.mock.ts
import { defineMock } from "vite-plugin-mock-dev-server/helper";
import Mock from "mockjs";
var list_mock_default = defineMock([
  {
    url: "/dev-api/list/get",
    delay: 1e3,
    body: {
      code: 0,
      message: "OK",
      result: Mock.mock({
        "list|10": [
          {
            "id|+1": 1
          }
        ]
      })
    }
  },
  {
    url: "/dev-api/list/error",
    delay: 1e3,
    body: {
      code: 1,
      message: "ERROR",
      result: null
    }
  }
]);
export {
  list_mock_default as default
};
