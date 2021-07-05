import Link from "next/link";
import { ReactNode } from "react";

export default function TestPageHome(): JSX.Element {
    return (
        <div>
            <h1>This is a test page!!!</h1>
            <ul>
                <li>
                    <Link href="testpage/login">
                        <a>Login</a>
                    </Link>
                </li>
                <li>
                    <Link href="testpage/register">
                        <a>Register</a>
                    </Link>
                </li>
                <TestLink href="testpage/needauth">NeedAuth</TestLink>
            </ul>
        </div>
    );
}

function TestLink(props: { href: string; children: ReactNode }) {
    const { href, children } = props;
    return (
        <li>
            <Link href={href}>
                <a>{children}</a>
            </Link>
        </li>
    );
}
