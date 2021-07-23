import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuItemCustomed from "./menuItem";
import { alpha, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useState } from "react";
import { useAuthTokenDestroyer } from "@/state/auth";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menus: {
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            marginLeft: "25%",
        },
        menu_text: {
            height: 64,
            display: "inherit",
            alignItems: "center",
            borderTop: "1px solid black",
            color: "#000",
            textAlign: "center",
            marginRight: 20,
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "90%",
            [theme.breakpoints.up("lg")]: {
                width: "80ch",
            },
        },
        sectionDesktop: {
            display: "flex",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
            width: "100%",
            justifyContent: "flex-end",
            color: alpha(theme.palette.common.black, 1.0),
        },
    }),
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MenuBar(): JSX.Element {
    const router = useRouter();
    const logout = useAuthTokenDestroyer();
    const Logout = () => {
        logout();
        handleAlertClick("정상적으로 로그아웃 되었습니다.");
        router.push("/login");
    };
    const [alert_open, setAlertOpen] = useState(false);
    const [alert_string, setAlertString] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleAlertClick = (notice: string) => {
        setAlertOpen(true);
        setAlertString(notice);
    };
    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem
                onClick={() => {
                    router.push("/mypage", undefined, { shallow: true });
                }}>
                My Page
            </MenuItem>
            <MenuItem onClick={Logout}>Log out</MenuItem>
        </Menu>
    );
    const classes = useStyles();
    return (
        <>
            <div className={classes.menus}>
                <MenuItemCustomed menuString="메인페이지" pageURL="/"></MenuItemCustomed>
                <MenuItemCustomed menuString="데이터 제출" pageURL="#"></MenuItemCustomed>
                <MenuItemCustomed menuString="인센티브" pageURL="#"></MenuItemCustomed>
                <MenuItemCustomed menuString="오차율" pageURL="#"></MenuItemCustomed>
                <MenuItemCustomed menuString="SMP/REC" pageURL="#"></MenuItemCustomed>
            </div>
            <div className={classes.sectionDesktop}>
                <IconButton edge="end" color="inherit" aria-haspopup="true" onClick={handleProfileMenuOpen}>
                    <AccountCircle fontSize="large" />
                </IconButton>
            </div>
            {renderMenu}
            <Snackbar open={alert_open} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                    {alert_string}
                </Alert>
            </Snackbar>
        </>
    );
}
