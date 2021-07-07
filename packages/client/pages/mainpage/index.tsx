import SearchBar from "../../components/searchBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../components/logo";

export default function MainPageHome(): JSX.Element {
    return (
        <div>
            <AppBar position="static" style={{ background: "#ffffff" }}>
                <Toolbar>
                    <Logo width={"70%"} height={"50%"}></Logo>
                    <SearchBar />
                </Toolbar>
            </AppBar>
        </div>
    );
}
