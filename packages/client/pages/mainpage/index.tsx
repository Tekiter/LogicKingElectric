import SearchBar from "../../components/searchBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../components/logo";
import Sections from "../../components/sections";
//import styled from "styled-components";

export default function MainPageHome(): JSX.Element {
    return (
        <div>
            <AppBar position="static" style={{ background: "#ffffff" }}>
                <Toolbar>
                    <Logo width={"70%"} height={"50%"}></Logo>
                    <SearchBar />
                </Toolbar>
            </AppBar>
            <Sections></Sections>
        </div>
    );
}
