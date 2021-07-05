import { useAuth } from "@/api/hooks";

export default function NeedAuthPage(): JSX.Element {
    useAuth();

    return (
        <div>
            <h1>This page need auth.</h1>
        </div>
    );
}
