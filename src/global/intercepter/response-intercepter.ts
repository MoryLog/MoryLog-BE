import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { APIResponse } from "../dto/api-response";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, APIResponse<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<APIResponse<T>> | Promise<Observable<APIResponse<T>>> {
        return next.handle().pipe(
            map((data: T | APIResponse<T>) => {
                if(data instanceof APIResponse){
                    return data;
                }

                return APIResponse.sucess(data);
            }),
        );
    }
}