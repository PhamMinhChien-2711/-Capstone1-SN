import { ErrorMessage } from "formik";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import './style.scss';

export default function InputField(props) {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;

    const showError = errors[name] && touched[name];
    return (
        <FormGroup >
            {label && <Label for={name}>{label}</Label>}
            <Input
                className='input'
                col="4"
                id={name}
                placeholder={placeholder}
                type={type}
                {...field}
                invalid={showError}
                valid={showError ? true : false}
            />

            <ErrorMessage className='error' name={name} component={FormFeedback} />
        </FormGroup>
    );
}
