import { createRoutes, str } from "typesafe-routes";

export const r = createRoutes({
  register: {
    path: ["register"],
  },
  login: {
    path: ["login"],
  },
  forgotPassword: {
    path: ["forgot-password"],
  },
  updatePassword: {
    path: ["update-password"],
  },
  orgs: {
    path: ["orgs"],
    children: {
      create: {
        path: ["create"],
      },
      edit: {
        path: ["edit", str("id")],
      },
      show: {
        path: ["show", str("id")],
      },
    },
  },
  custom: {
    path: ["custom"],
  },
});
