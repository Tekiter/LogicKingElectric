import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade as alpha, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useState } from "react";
import { useAuthTokenDestroyer } from "@/state/auth";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.black, 0.3),
            "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.15),
            },
            [theme.breakpoints.up("md")]: {
                marginLeft: theme.spacing(55),
                width: "100%",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

export default function SearchBar(): JSX.Element {
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
            <MenuItem onClick={Logout}>Log out</MenuItem>
        </Menu>
    );
    const classes = useStyles();
    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="검색"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                />
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
