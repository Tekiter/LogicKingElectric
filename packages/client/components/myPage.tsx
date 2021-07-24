import { useState, ChangeEvent, useEffect } from "react";
import EnvTab from "./envTab";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { authorize } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import Typography from "@material-ui/core/Typography";

const formStyles = makeStyles((theme: Theme) =>
    createStyles({
        formLine: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
        },
    }),
);
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        "&$checked": {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
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
    const { request } = useAPIRequest(authorize.endpoint, {
        onSuccess(res) {
            setUserName(res.username);
        },
    });
    useEffect(() => {
        request(null);
    }, []);
    const [userName, setUserName] = useState("No login");
    const [plantType, setPlantType] = useState({
        solar: false,
        wind: false,
    });
    const [generatorType, setGeneratorType] = useState({
        fixed: false,
        tracked: false,
    });
    const formStyle = formStyles();
    const handlePlantType = (event: ChangeEvent<HTMLInputElement>) => {
        setPlantType({ ...plantType, [event.target.name]: event.target.checked });
    };
    const handleGeneratorType = (event: ChangeEvent<HTMLInputElement>) => {
        setGeneratorType({ ...generatorType, [event.target.name]: event.target.checked });
    };
    return (
        <div style={{ display: "flex", marginTop: "1.5%" }}>
            <div style={{ display: "inherit", flexDirection: "row" }}>
                <div style={{ marginLeft: "53%", minWidth: 600, flexBasis: 600 }}>
                    <div style={{ textAlign: "center", fontSize: 35 }}>마이페이지</div>
                    <div style={{ textAlign: "center", fontSize: 20, color: "gray" }}>
                        아이디, 비밀번호 등의 개인정보를 수정할 수 있습니다
                    </div>
                    <div style={{ boxShadow: "3px 3px 0px 0px #e8e8e8", padding: 8 }}>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>사진</div>
                            <div>설정하지 않을 시 기본이미지로 설정됩니다.</div>
                            <div>
                                <IconButton edge="end" color="inherit" aria-haspopup="true">
                                    <AccountCircle fontSize="large" />
                                </IconButton>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ fontSize: 16, color: "gray" }}>아이디</div>
                            <div style={{ marginLeft: 83 }}>
                                <Typography variant="subtitle1">{userName}</Typography>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>비밀번호</div>
                            <div style={{ marginRight: "46%" }}>
                                <TextField label="password"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>비밀번호 확인</div>
                            <div style={{ marginRight: "46%" }}>
                                <TextField label="password_check"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>발전소 이름</div>
                            <div style={{ marginRight: "46%" }}>
                                <TextField label="plant_name"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>발전정보</div>
                            <div style={{ marginRight: "47%" }}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                checked={plantType.solar}
                                                onChange={handlePlantType}
                                                name="solar"
                                            />
                                        }
                                        label="태양광"
                                    />
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                checked={plantType.wind}
                                                onChange={handlePlantType}
                                                name="wind"
                                            />
                                        }
                                        label="풍력"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>발전소 위치</div>
                            <div style={{ marginRight: "16%", display: "flex" }}>
                                <div>
                                    <TextField label="위도"></TextField>
                                </div>
                                <div>
                                    <TextField label="경도"></TextField>
                                </div>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>발전기 타입</div>
                            <div style={{ marginRight: "44.5%" }}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                checked={generatorType.fixed}
                                                onChange={handleGeneratorType}
                                                name="fixed"
                                            />
                                        }
                                        label="고정형"
                                    />
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                checked={generatorType.tracked}
                                                onChange={handleGeneratorType}
                                                name="tracked"
                                            />
                                        }
                                        label="추적형"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>발전용량</div>
                            <div style={{ marginRight: "46.5%" }}>
                                <TextField label="발전용량(kW)"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>방위각</div>
                            <div style={{ marginRight: "46.5%" }}>
                                <TextField label="방위각(°)"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>온도계수</div>
                            <div style={{ marginRight: "46.5%" }}>
                                <TextField label="온도계수(°C)"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>각도</div>
                            <div style={{ marginRight: "46.5%" }}>
                                <TextField label="각도(°)"></TextField>
                            </div>
                        </div>
                        <div className={formStyle.formLine}>
                            <div style={{ fontSize: 16, color: "gray" }}>데이터 제출시각</div>
                            <div style={{ marginRight: "16%", display: "flex" }}>
                                <div>
                                    <TextField label="시"></TextField>
                                </div>
                                <div>
                                    <TextField label="분"></TextField>
                                </div>
                            </div>
                        </div>
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
