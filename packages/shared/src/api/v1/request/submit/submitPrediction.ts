import { defineEndpoint } from "../../util";
import { defineValidator, va } from "../../util/validation";

interface Request {
    targetDate: string;

    /** 발전 예측량 */
    amount: number;
}

const validator = defineValidator<Request>({
    targetDate: va().dateString(),
    amount: va().number(),
});

/**
 * 발전량 예측치 데이터를 제출하는 Endpoint
 *
 * 제출하면 서버에도 예측치 히스토리가 저장된다.
 */
export const endpoint = defineEndpoint<Request, null>({
    method: "POST",
    path: "/submit/prediction",
    validator,
});
