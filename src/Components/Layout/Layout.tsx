import React, { PropsWithChildren } from "react";

type ILayoutProps = PropsWithChildren & {
};

const Layout = ({ children }: ILayoutProps) => {

    return <div className="columns">
        <div className="column is-half is-offset-one-quarter">
            {children}
        </div>
    </div>
}

export default Layout;