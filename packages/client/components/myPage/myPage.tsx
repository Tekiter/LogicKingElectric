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
import { PlantInfoModifier, SolarPlantInfoModifier, usePlantInfoModifier, useSolarPlantInfoModifier } from "./modifier";
import { usePlantInfoSubmitter, useSolarPlantInfoSubmitter } from "./submitter";
import { useState } from "react";

export default function MyPage(): JSX.Element {
    const plantInfo = usePlantInfoModifier();
    const solarPlantInfo = useSolarPlantInfoModifier();

    const plantInfoSubmit = usePlantInfoSubmitter();
    const solarPlantInfoSubmit = useSolarPlantInfoSubmitter();

    const [isError, setIsError] = useState(false);

    const isValid = solarPlantInfoSubmit.check(solarPlantInfo.data);

    async function submit() {
        try {
            await plantInfoSubmit.submit(plantInfo.data);
            await solarPlantInfoSubmit.submit(solarPlantInfo.data);
        } catch {
            setIsError(true);
        }
    }

    return (
        <Centered>
            <MyPageBox>
                <Title />
                <InfoCard>
                    <BasicInfo />
                    <PlantInfo plant={plantInfo} />
                    <SolarPlantInfo solarPlant={solarPlantInfo} />

                    <FormTimePicker label="데이터 제출시각" />

                    <FieldError showError={isError} />
                </InfoCard>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                    <EditButton onClick={submit} disabled={!isValid}>
                        수정
                    </EditButton>
                </div>
            </MyPageBox>
        </Centered>
    );
}

function FieldError({ showError }: { showError: boolean }): JSX.Element {
    if (showError) {
        return <div>정보 저장에 실패했습니다.</div>;
    } else {
        return <>asdf</>;
    }
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
        return <div>로딩</div>;
    }

    function plantTypeChanged(value: string) {
        if (value === "wind") {
            plant.modify("type", value);
        } else if (value === "solar") {
            plant.modify("type", value);
        }
    }

    return (
        <>
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
                onChange={plantTypeChanged}
            />
            <FormLocationPicker label="발전소 위치" />
        </>
    );
}

interface SolarPlantInfoProps {
    solarPlant: SolarPlantInfoModifier;
}

function SolarPlantInfo(props: SolarPlantInfoProps): JSX.Element {
    const { solarPlant } = props;

    function arrayTypeChanged(value: string) {
        if (value === "fixed") {
            solarPlant.modify("arrayType", value);
        } else if (value === "track") {
            solarPlant.modify("arrayType", value);
        }
    }

    return (
        <>
            <FormSelectable
                label="태양광 발전기 종류"
                items={[
                    { key: "fixed", label: "고정형" },
                    { key: "track", label: "추적형" },
                ]}
                value={solarPlant.data.arrayType}
                onChange={arrayTypeChanged}
            />

            <FormNumberField
                label="발전 용량 (kW)"
                value={solarPlant.data.capacity + ""}
                onChange={value => solarPlant.modify("capacity", value)}
            />
            <FormNumberField
                label="방위각"
                value={solarPlant.data.meridianAngle}
                onChange={value => solarPlant.modify("meridianAngle", value)}
            />
            <FormNumberField
                label="온도계수"
                value={solarPlant.data.temperatureCoefficientPmpp}
                onChange={value => solarPlant.modify("temperatureCoefficientPmpp", value)}
            />
            <FormNumberField
                label="각도"
                value={solarPlant.data.tiltAngle}
                onChange={value => solarPlant.modify("tiltAngle", value)}
            />
        </>
    );
}
