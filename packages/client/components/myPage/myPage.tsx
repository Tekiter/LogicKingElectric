import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { useAuth } from "@/api/hooks";
import {
    FormFixedText,
    FormHeader,
    FormLocationPicker,
    FormNumberField,
    FormPasswordField,
    FormSelectable,
    FormTextField,
} from "./forms";
import styled from "styled-components";
import { Card, Snackbar, Typography } from "@material-ui/core";
import { PlantInfoModifier, SolarPlantInfoModifier, usePlantInfoModifier, useSolarPlantInfoModifier } from "./modifier";
import { useSubmitter } from "./submitter";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Switcher } from "./switcher";

export default function MyPage(): JSX.Element {
    const plantInfo = usePlantInfoModifier();
    const solarPlantInfo = useSolarPlantInfoModifier();

    const submitter = useSubmitter(plantInfo.data, solarPlantInfo.data);

    const [isError, setIsError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [isSuccessSnackOpen, setIsSuccessSnackOpen] = useState(false);
    function closeSuccessSnack() {
        setIsSuccessSnackOpen(false);
    }

    const isValid = submitter.isValid;

    async function submit() {
        try {
            setIsProcessing(true);
            await submitter.submit();

            setIsSuccessSnackOpen(true);
        } catch {
            setIsError(true);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Centered>
            <MyPageBox>
                <Title />
                <InfoCard>
                    <BasicInfo />
                    <PlantInfo plant={plantInfo} />

                    <Switcher match={plantInfo.data.type}>
                        <SolarPlantInfo key="solar" solarPlant={solarPlantInfo} />
                        <WindPlantInfo key="wind" />
                        <HydroPlantInfo key="hydro" />
                    </Switcher>

                    <FieldError showError={isError} />
                </InfoCard>
                <Centered style={{ marginTop: "1em" }}>
                    <EditButton onClick={submit} disabled={!isValid || isProcessing}>
                        수정
                    </EditButton>
                </Centered>
            </MyPageBox>
            <Snackbar open={isSuccessSnackOpen} autoHideDuration={6000} onClose={closeSuccessSnack}>
                <Alert onClose={closeSuccessSnack} severity="success">
                    정보를 저장했습니다!
                </Alert>
            </Snackbar>
        </Centered>
    );
}

function FieldError({ showError }: { showError: boolean }): JSX.Element {
    if (showError) {
        return <Typography color="error">정보 저장에 실패했습니다.</Typography>;
    } else {
        return <></>;
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
            <FormHeader>기본 정보</FormHeader>
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
            <FormHeader>발전소 정보</FormHeader>
            <FormTextField
                label="발전소 이름"
                value={plant.data.name}
                onChange={value => plant.modify("name", value)}
            />
            <FormLocationPicker label="발전소 위치" />
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
        </>
    );
}

interface SolarPlantInfoProps {
    solarPlant: SolarPlantInfoModifier;
}

function SolarPlantInfo(props: SolarPlantInfoProps): JSX.Element {
    const { solarPlant } = props;
    return (
        <>
            <FormHeader>태양광 발전소 정보</FormHeader>
            <FormSelectable
                label="태양광 발전기 종류"
                items={[
                    { key: "fixed", label: "고정형" },
                    { key: "track", label: "추적형" },
                ]}
                value={solarPlant.data.arrayType}
                onChange={value => solarPlant.modify("arrayType", value)}
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

function WindPlantInfo(): JSX.Element {
    return (
        <>
            <FormHeader>풍력 발전소 정보</FormHeader>
        </>
    );
}

function HydroPlantInfo(): JSX.Element {
    return (
        <>
            <FormHeader>수력 발전소 정보</FormHeader>
        </>
    );
}
