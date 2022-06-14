
import React from 'react';
import './index.scss';
import Text from './Text'
import Wysiwyg from './Wysiwyg';


function Fields({ data, fieldChanged, values }) {
    return (
        <>
            {
                data.map((field, i) => {
                    return (
                        <div key={i} className="fieldset">
                            {field.type == 'text' ? <Text field={field} fieldChanged={fieldChanged}
                                value={values[field.id]} /> : ''}
                            {field.type == 'wysiwyg' ? <Wysiwyg field={field} fieldChanged={fieldChanged}
                                value={values[field.id]} /> : ''}
                        </div>
                    );
                })
            }
        </>
    );
}

export default Fields;