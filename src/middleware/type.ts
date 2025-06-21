import { Request } from "express";

export interface IExtendedRequest extends Request {
  user?: {
    email: string;
    id: string;
    role: string;
    userName: string | null;
    currentInstituteNumber: string | number | null;
  };
}
