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
import styled from "styled-components";
import { Card } from "@material-ui/core";
import { PlantInfoModifier, usePlantInfoModifier } from "./modifier";

export default function MyPage(): JSX.Element {
    const plantInfo = usePlantInfoModifier();

    return (
        <Centered>
            <MyPageBox>
                <Title />
                <InfoCard>
                    <BasicInfo />
                    <PlantInfo plant={plantInfo} />
                    <SolarPlantInfo />

                    <FormTimePicker label="데이터 제출시각" />
                </InfoCard>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                    <EditButton>수정</EditButton>
                </div>
            </MyPageBox>
        </Centered>
    );
}

const EditButton = styled(Button)`
    && {
        color: white;
        background-color: ${green[500]};

        :hover {
            background-color: ${green[700]};
        }
    }
`;

const Centered = styled.div`
    display: flex;
    justify-content: center;
`;

const MyPageBox = styled.div`
    width: 35em;
`;

const InfoCard = styled(Card)`
    && {
        padding: 1em 2em;
    }
`;

function Title() {
    return (
        <>
            <div style={{ textAlign: "center", fontSize: 35 }}>마이페이지</div>
            <div style={{ textAlign: "center", fontSize: 20, color: "gray" }}>
                아이디, 비밀번호 등의 개인정보를 수정할 수 있습니다
            </div>
        </>
    );
}

function BasicInfo(): JSX.Element {
    const { username } = useAuth();
    return (
        <>
            <FormFixedText label="아이디">{username}</FormFixedText>
            <FormPasswordField label="비밀번호" />
            <FormPasswordField label="비밀번호 확인" />
        </>
    );
}

interface PlantInfoProps {
    plant: PlantInfoModifier;
}

function PlantInfo(props: PlantInfoProps): JSX.Element {
    const { plant } = props;

    if (plant.isLoading) {
        return <>로딩</>;
    }

    return (
        <>
            {/* {JSON.stringify(plant.data)} */}
            <FormTextField
                label="발전소 이름"
                value={plant.data.name}
                onChange={value => plant.modify("name", value)}
            />
            <FormSelectable
                label="발전 종류"
                items={[
                    { key: "solar", label: "태양광" },
                    { key: "wind", label: "풍력" },
                    { key: "hydro", label: "수력" },
                ]}
                value={plant.data.type}
                onChange={value => plant.modify("type", value as "solar" | "wind")}
            />
            <FormLocationPicker label="발전소 위치" />
        </>
    );
}

function SolarPlantInfo(): JSX.Element {
    return (
        <>
            <FormSelectable
                label="태양광 발전기 종류"
                items={[
                    { key: "fixed", label: "고정형" },
                    { key: "tracked", label: "추적형" },
                ]}
                value=""
                onChange={value => {
                    console.log(value);
                }}
            />

            <FormNumberField label="발전 용량 (kW)" />
            <FormNumberField label="방위각" />
            <FormNumberField label="온도계수" />
            <FormNumberField label="각도" />
        </>
    );
}
