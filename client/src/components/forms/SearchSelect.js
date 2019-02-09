import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
    selectWrapper: {
        display: 'inline-block',
        verticalAlign: 'top',
        maxWidth: 200,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    input: {
        display: 'flex',
        padding: 8,
        width: 190,
        height: 32,
    },
    valueContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    noOptionsMessage: {
        fontSize: 16,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
})

const NoOptionsMessage = props => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    )
}

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />
}

const Control = props => {
    return (
        <TextField
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    ref: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
        />
    )
}

const Option = props => {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    )
}

const Placeholder = props => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    )
}

const SingleValue = props => {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    )
}

function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    )
}

const components = {
    Option,
    Control,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    ValueContainer,
}

type SearchSelectProps = {
    classes: Object,
    options: Array<Object>,
    clearable: Boolean,
    placeholder: String,
}

class SearchSelect extends PureComponent<SearchSelectProps> {
    render() {
        const {
            classes,
            options,
            placeholder,
            input: { value, onChange, onBlur },
        } = this.props

        return (
            <div className={classes.selectWrapper}>
                <Select
                    {...this.props}
                    value={
                        typeof value === 'string'
                            ? options.filter(option => option.value === value)
                            : value
                    }
                    onChange={option => onChange(option.value)}
                    onBlur={() => onBlur(value)}
                    options={options}
                    placeholder={placeholder}
                    components={components}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SearchSelect)
