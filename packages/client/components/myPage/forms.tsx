import styled from "styled-components";
import { green } from "@material-ui/core/colors";
import {
    Radio,
    FormControlLabel,
    RadioGroup,
    TextField,
    Typography,
    withStyles,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import { ReactNode, useState } from "react";

const { FormLine } = (function () {
    const FormBox = styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem;
    `;

    const LabelBox = styled.div`
        width: 10em;
        font-size: 1.05rem;
        color: grey;
    `;

    const ContentBox = styled.div`
        flex-grow: 1;
    `;

    interface FormLineProps {
        label: string;
        children: ReactNode;
    }

    function FormLine(props: FormLineProps): JSX.Element {
        return (
            <FormBox>
                <LabelBox>{props.label}</LabelBox>
                <ContentBox>{props.children}</ContentBox>
            </FormBox>
        );
    }

    return { FormLine };
})();

export const FormHeader = styled.div`
    color: black;
    font-size: 1.2em;
    margin-top: 2em;
    margin-bottom: 0.5em;
    padding-bottom: 0.2em;
    border-bottom: 1px solid grey;
`;

interface FormTextFieldProps {
    label: string;
    value?: string;
    onChange?(value: string): void;
}

export function FormTextField(props: FormTextFieldProps): JSX.Element {
    return (
        <FormLine label={props.label}>
            <TextField
                variant="outlined"
                size="small"
                value={props.value}
                onChange={e => {
                    props.onChange?.call(null, e.target.value);
                }}></TextField>
        </FormLine>
    );
}

export function FormPasswordField(props: FormTextFieldProps): JSX.Element {
    return (
        <FormLine label={props.label}>
            <TextField variant="outlined" size="small" type="password"></TextField>
        </FormLine>
    );
}

export function FormNumberField(props: FormTextFieldProps): JSX.Element {
    return (
        <FormLine label={props.label}>
            <TextField
                variant="outlined"
                size="small"
                type="number"
                value={props.value}
                onChange={e => props.onChange?.call(null, e.target.value)}></TextField>
        </FormLine>
    );
}

interface FormTextOnlyShowProps {
    label: string;
    children: ReactNode;
}

export function FormFixedText(props: FormTextOnlyShowProps): JSX.Element {
    return (
        <FormLine label={props.label}>
            <Typography variant="subtitle1">{props.children}</Typography>
        </FormLine>
    );
}

interface FormTimePickerProps {
    label: string;
}

export function FormTimePicker(props: FormTimePickerProps): JSX.Element {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <FormLine label={props.label}>
            <TimePicker
                size="small"
                inputVariant="outlined"
                variant="inline"
                value={selectedDate}
                onChange={date => handleDateChange(date ?? new Date())}
            />
        </FormLine>
    );
}

interface FormLocationPickerProps {
    label: string;
    name: string;
    latitude: string;
    longitude: string;
    onChange(name: string, latitude: string, longitude: string): void;
}

export function FormLocationPicker(props: FormLocationPickerProps): JSX.Element {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [name, setName] = useState(props.name);
    const [latitude, setLatitude] = useState(props.latitude);
    const [longitude, setLongitude] = useState(props.longitude);

    const submitable = latitude !== "" && longitude !== "";

    function openDialog() {
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
        setLatitude(props.latitude);
        setLongitude(props.longitude);
        setName(props.name);
    }

    function submitDialog() {
        setIsDialogOpen(false);
        props.onChange?.call(null, name, latitude, longitude);
    }

    return (
        <FormLine label={props.label}>
            <Button variant="outlined" onClick={openDialog}>
                선택
            </Button>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>발전소 위치</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="위치 이름"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        type="number"
                        label="위도"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        type="number"
                        label="경도"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        margin="dense"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>취소</Button>
                    <Button onClick={submitDialog} color="primary" disabled={!submitable}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </FormLine>
    );
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        "&$checked": {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const LandscapeRadioGroup = styled(RadioGroup)`
    display: flex;
    && {
        flex-direction: row;
    }
`;

interface FormSelectableProps {
    label: string;
    items: { key: string; label: string }[];
    value: string;
    onChange(value: string): void;
}

export function FormSelectable(props: FormSelectableProps): JSX.Element {
    return (
        <FormLine label={props.label}>
            <LandscapeRadioGroup
                value={props.value}
                onChange={e => {
                    props.onChange?.call(null, e.target.value);
                }}>
                {props.items.map(item => (
                    <FormControlLabel key={item.key} value={item.key} control={<GreenCheckbox />} label={item.label} />
                ))}
            </LandscapeRadioGroup>
        </FormLine>
    );
}
