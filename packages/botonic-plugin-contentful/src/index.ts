import { Renderer } from "./render/render";
export default class BotonicPluginContentful {
  options: any;

  constructor(options: any) {
    this.options = options;
    let r = new Renderer();
  }

  async pre({ input, session, lastRoutePath }) {
    return { input, session, lastRoutePath };
  }

  async post({ input, session, lastRoutePath, response }) {
    return { input, session, lastRoutePath, response };
  }
}
