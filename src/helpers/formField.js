import PropTypes from "prop-types";

export const FormField = props => {
    FormField.propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input type={props.type}
                   className="login input"
                   placeholder="enter here.."
                   value={props.value}
                   onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};