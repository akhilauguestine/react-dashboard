import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../../../public/tinymce/tinymce.min.js';

export default function Wysiwyg({ field, fieldChanged, value }) {
    const editorRef = useRef(null);
    let Tool1 = field.options[0].tinymce[0].toolbar1;
    var Tools1 = Tool1.replace(/,/g, '');

    return (
        <div className="fieldset__text">
            <div className="fieldset__text-wrapper">
                <div className="fieldset__label-wrap">
                    <label>{field.name}</label>
                </div>
                <div className="fieldset__field-wrap">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={value}
                        init={{
                            height: 100,
                            elementpath: false,
                            menubar: false,
                            plugins: 'lists link media table code',
                            toolbar: Tools1 ? Tools1 : '',
                            max_height: 300,
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        name={field.id}
                        id={field.id}
                        // value={value}
                        onEditorChange={(newValue, editor) => {
                            fieldChanged(field.id, newValue);
                        }}
                    />

                </div>
            </div>
        </div>
    );
}