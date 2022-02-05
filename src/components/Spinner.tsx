import { useState } from "react";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  z-index: 1000;
  margin: -40% auto;
`;

export function Spinner({loading}) {

    let [color, setColor] = useState("#EE750F");

    return (
        <div className="sweet-loading">

            <DotLoader color={color} loading={loading} css={override} size={300} />
        </div>
    );
}

export default Spinner;