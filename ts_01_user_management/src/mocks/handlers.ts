import { DefaultRequestMultipartBody, rest } from "msw";

import { baseUrl } from "./../config";
import { Inputs } from "../pages/login-page/login-page.interfaces";

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    // Obtener el cuerpo de la solicitud y asegurarse de que tenga el tipo adecuado
    const body = req.body as DefaultRequestMultipartBody & Inputs;
    const { email, password } = body;
    // Verificar el valor del campo email password y cambiar el estado de la respuesta en consecuencia
    if (email === "error@error.es"){
      return res(ctx.delay(10), ctx.status( parseInt(password, 10))); // Cambiar el estado a 500 Error interno del servidor
    } else {
      return res(ctx.delay(), ctx.status(200)); // Cambiar el estado a 200 OK
    }
  }),
];