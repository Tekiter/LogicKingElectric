import EnvTab from "../envTab";
import { withStyles } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { useAuth } from "@/api/hooks";
import {
    FormFixedText,
    FormLocationPicker,
    FormNumberField,
    FormPasswordField,
    FormSelectable,
    FormTextField,
    FormTimePicker,
} from "./forms";

const GreenButton = withStyles({
    root: {
        color: "white",
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
})(Button);

export default function MyPage(): JSX.Element {
    const { username } = useAuth();

    return (
        <div style={{ display: "flex", marginTop: "1.5%" }}>
            <div style={{ display: "inherit", flexDirection: "row" }}>
                <div style={{ marginLeft: "53%", minWidth: 600, flexBasis: 600 }}>
                    <div style={{ textAlign: "center", fontSize: 35 }}>마이페이지</div>
                    <div style={{ textAlign: "center", fontSize: 20, color: "gray" }}>
                        아이디, 비밀번호 등의 개인정보를 수정할 수 있습니다
                    </div>
                    <div
                        style={{
                            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
                            padding: 8,
                        }}>
                        <FormFixedText label="아이디">{username}</FormFixedText>
                        <FormPasswordField label="비밀번호" />
                        <FormPasswordField label="비밀번호 확인" />
                        <FormTextField label="발전소 이름" />
                        <FormSelectable
                            label="발전 종류"
                            items={[
                                { key: "solar", label: "태양광" },
                                { key: "wind", label: "풍력" },
                                { key: "hydro", label: "수력" },
                            ]}
                        />
                        <FormLocationPicker label="발전소 위치" />
                        <FormSelectable
                            label="태양광 발전기 종류"
                            items={[
                                { key: "fixed", label: "고정형" },
                                { key: "tracked", label: "추적형" },
                            ]}
                        />

                        <FormNumberField label="발전 용량 (kW)" />
                        <FormNumberField label="방위각" />
                        <FormNumberField label="온도계수" />
                        <FormNumberField label="각도" />
                        <FormTimePicker label="데이터 제출시각" />
                    </div>
                    <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                        <GreenButton>수정</GreenButton>
                    </div>
                </div>
                <div style={{ display: "flex", marginLeft: "20%" }}>
                    <EnvTab></EnvTab>
                </div>
            </div>
        </div>
    );
}
