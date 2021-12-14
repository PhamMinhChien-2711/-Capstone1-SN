import { useState } from 'react'
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import {
    plugins,
    schema,
    toolbar,
} from '@aeaton/react-prosemirror-config-default'


export default function CommentBox(props) {
    const { initValue } = props;
    const [value, setValue] = useState(initValue)

    return (
        <HtmlEditor
            schema={schema}
            plugins={plugins}
            value={initValue}
            handleChange={setValue}
            debounce={250}
        >
            <Toolbar toolbar={toolbar} />
            <Editor autoFocus />
        </HtmlEditor>
    )
}
