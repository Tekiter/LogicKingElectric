import Img from "next/image";
import logo from "../statics/logo01.png";

export interface LogoSize {
    width: number | string;
    height: number | string;
}
export default function Logo(props: LogoSize): JSX.Element {
    return (
        <>
            <a href="./mainpage">
                <Img src={logo} width={props.width} height={props.height} alt="logo" />
            </a>
        </>
    );
}
