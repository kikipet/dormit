import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { IoEyedrop } from "react-icons/io5";

import "./ColorPicker.css";

function ColorPicker(props) {
    const [pick, setPick] = useState(false);

    return (
        <div className="color-picker">
            <div className="color-picker-controls">
                <div className="color-square" style={{ backgroundColor: props.color }} />
                <button
                    className="color-eyedrop"
                    name="picker"
                    type="button"
                    onClick={() => setPick(!pick)}
                >
                    <IoEyedrop />
                </button>
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                {pick ? (
                    <SketchPicker
                        className="color-sketchpicker"
                        disableAlpha={true}
                        presetColors={props.colors}
                        color={props.color}
                        width={180}
                        onChange={props.onChange}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default ColorPicker;
