import * as React from 'react';

import Loader from "react-loader-spinner";
export default class PreLoader extends React.Component {
    //other logic
    render() {
        return (
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        );
    }
}