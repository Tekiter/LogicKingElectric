import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade as alpha, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import { useAuthTokenDestroyer } from "@/state/auth";
import { useRouter } from "next/router";

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

export default function SearchBar(): JSX.Element {
    const router = useRouter();
    const logout = useAuthTokenDestroyer();
    const Logout = () => {
        logout();
        alert("로그아웃 완료");
        router.push("/login");
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
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
        </>
    );
}
