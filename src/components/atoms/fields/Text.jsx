
import React, { useRef } from 'react';


export default function Text({ field, fieldChanged, value }) {
    return (
        <>
            <div className="fieldset__text">
                <div className="fieldset__text-wrapper">
                    <div className="fieldset__label-wrap">
                        <label>{field.name}</label>
                    </div>
                    <div className="fieldset__field-wrap">
                        <input type='text' className="regular-text" name={field.id} id={field.id} defaultValue={value}
                            onChange={(e) => {
                                fieldChanged(field.id, e.target.value);
                            }} />
                    </div>
                </div>
            </div>
        </>
    );
}