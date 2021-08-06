import { ReactElement } from "react";

interface SwitcherProps {
    match: string;
    children: ReactElement[];
}

export function Switcher(props: SwitcherProps): ReactElement {
    return <>{props.children.find(child => props.match === child.key)}</>;
}
