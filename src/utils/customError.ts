export class ApiEror extends Error {
  info: unknown;
  status: number;

  constructor(message: string, info: unknown, status: number) {
    super(message);
    this.name = "ApiEror";
    this.info = info;
    this.status = status;
  }
}
