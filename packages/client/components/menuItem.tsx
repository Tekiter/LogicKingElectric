import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
const menuItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        menu_text: {
            height: 64,
            display: "inherit",
            alignItems: "center",
            color: "#000",
            textAlign: "center",
            marginRight: 20,
        },
        menu_text_selected: {
            height: 64,
            display: "inherit",
            alignItems: "center",
            borderTop: "5px solid black",
            color: "#000",
            textAlign: "center",
            marginRight: 20,
        },
    }),
);
interface MenuItemProps {
    menuString: string;
    pageURL?: string;
}
export default function MenuItemCustomed(props: MenuItemProps): JSX.Element {
    const router = useRouter();
    const menuItem = menuItemStyles();
    const this_page = router.pathname;
    if (props.pageURL == this_page) {
        return (
            <div className={menuItem.menu_text_selected}>
                <div style={{ fontSize: 20, whiteSpace: "nowrap", textAlign: "center" }}>{props.menuString}</div>
            </div>
        );
    } else {
        return (
            <div className={menuItem.menu_text}>
                <div style={{ fontSize: 20, whiteSpace: "nowrap", textAlign: "center" }}>{props.menuString}</div>
            </div>
        );
    }
}
