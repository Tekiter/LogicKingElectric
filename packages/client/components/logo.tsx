import Img from "next/image";
import logo from "../statics/logo02.png";
import Link from "next/link";

export interface LogoSize {
    width: number | string;
    height: number | string;
}
export default function Logo(props: LogoSize): JSX.Element {
    return (
        <div style={{ width: "20%", display: "flex" }}>
            <Link href="/">
                <a>
                    <Img src={logo} width={props.width} height={props.height} alt="logo" />
                </a>
            </Link>
        </div>
    );
}
