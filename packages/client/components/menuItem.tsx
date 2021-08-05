import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Link from "next/link";

const menuItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        menu_text: {
            height: 64,
            display: "inherit",
            alignItems: "center",
            color: "#888888",
            textAlign: "center",
            marginRight: 100,
            textDecoration: "none",
            fontWeight: "bold",
        },
        menu_text_selected: {
            height: 60,
            display: "inherit",
            alignItems: "center",
            borderBottom: "5px solid #72D23D",
            color: "#4D4D4D",
            /* textAlign: "center",*/
            marginRight: 100,
            textDecoration: "none",
            fontWeight: "bold",
        },
    }),
);
interface MenuItemProps {
    menuString: string;
    pageURL: string;
}
export default function MenuItemCustomed(props: MenuItemProps): JSX.Element {
    const router = useRouter();
    const menuItem = menuItemStyles();
    const this_page = router.pathname;
    if (props.pageURL == this_page) {
        return (
            <Link href={props.pageURL}>
                <a className={menuItem.menu_text_selected}>
                    <div style={{ fontSize: 20, whiteSpace: "nowrap", textAlign: "center" }}>{props.menuString}</div>
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={props.pageURL}>
                <a className={menuItem.menu_text}>
                    <div style={{ fontSize: 20, whiteSpace: "nowrap", textAlign: "center" }}>{props.menuString}</div>
                </a>
            </Link>
        );
    }
}
