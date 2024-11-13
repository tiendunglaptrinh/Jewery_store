import Header from "../../component/Header";
import classNames from "classnames/bind";


function DefaultLayout({children}) {
    return (
        <>
            <Header/>
            <div>{children}</div>
        </>
    );
}

export default DefaultLayout;