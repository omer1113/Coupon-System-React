import Main from "../../MainArea/Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import "./Layout.css";



function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Router >
                <header>
                    <Header/>
                </header>
                <main>
                    <Main/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </Router>
        </div>
    );
}

export default Layout;
