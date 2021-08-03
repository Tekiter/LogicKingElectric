import styled from "styled-components";
import { green } from "@material-ui/core/colors";
import { Radio, FormControlLabel, RadioGroup, TextField, Typography, withStyles } from "@material-ui/core";
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
            <TextField variant="outlined" size="small" type="number"></TextField>
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
}

export function FormLocationPicker(props: FormLocationPickerProps): JSX.Element {
    return <FormLine label={props.label}>위경도</FormLine>;
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
