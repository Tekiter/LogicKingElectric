import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.black, 0.3),
            "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.15),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            [theme.breakpoints.up("md")]: {
                marginLeft: theme.spacing(50),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
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
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
            marginLeft: "30%",
            color: alpha(theme.palette.common.black, 1.0),
        },
    }),
);

export default function SearchBar(): JSX.Element {
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
                <IconButton edge="end" color="inherit" aria-haspopup="true">
                    <AccountCircle fontSize="large" />
                </IconButton>
            </div>
        </>
    );
}