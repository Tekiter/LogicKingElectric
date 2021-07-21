import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";

interface InnerAlertProps {
    handleAlertClose: (event: React.SyntheticEvent) => void;
    alert_string: string;
    alert_state: string;
}

function InnerAlert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Alert(props: InnerAlertProps): JSX.Element {
    if (props.alert_state == "error") {
        return (
            <>
                <InnerAlert onClose={props.handleAlertClose} severity="error">
                    {props.alert_string}
                </InnerAlert>
            </>
        );
    } else {
        return (
            <>
                <InnerAlert onClose={props.handleAlertClose} severity="success">
                    {props.alert_string}
                </InnerAlert>
            </>
        );
    }
}
