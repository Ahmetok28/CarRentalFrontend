import { ResponseModel } from "../models/responseModel"; 

export interface SingleResponseModel<T> extends ResponseModel {
    data: T;
}
