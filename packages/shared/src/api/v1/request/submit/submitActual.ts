import { defineEndpoint } from "../../util";
import { defineValidator, va } from "../../util/validation";

interface Request {
    targetDate: string;

    /** 발전된 양 */
    amount: number;
}

const validator = defineValidator<Request>({
    targetDate: va().dateString(),
    amount: va().number(),
});

/**
 * 실제 발전량 데이터를 입력하는 Endpoint
 */
export const endpoint = defineEndpoint<Request, null>({
    method: "POST",
    path: "/submit/actual",
    validator,
});
