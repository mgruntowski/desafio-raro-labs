import React, { useEffect } from "react";
import PropTypes from "prop-types";

import EmailValidator from 'email-validator'

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5, 0.25)
    }
}));

export default function TagsInput({ ...props }) {
    const classes = useStyles();
    const { selectedTags, placeholder, tags, ...other } = props;
    const [inputValue, setInputValue] = React.useState("");
    const [inputError, setInputError] = React.useState('')
    const [selectedItem, setSelectedItem] = React.useState([]);

    useEffect(() => {
        setSelectedItem(tags);
    }, [tags]);

    useEffect(() => {
        selectedTags(selectedItem);
    }, [selectedItem]);

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            const newSelectedItem = [...selectedItem];
            const duplicatedValues = newSelectedItem.indexOf(
                event.target.value.trim()
            );

            if (duplicatedValues !== -1) {
                setInputValue("");
                return;
            }

            if (!event.target.value.replace(/\s/g, "").length) return;

            if(event.target.value.trim().includes(';')) {
                const entries = event.target.value.trim().split(';')
                let invalidCount = 0
                
                entries.forEach(e => {
                    if(e?.length > 0) EmailValidator.validate(e) ? newSelectedItem.push(e) : invalidCount++
                })

                setSelectedItem(newSelectedItem)
                setInputError(invalidCount > 0 ? `Total de e-mails inválidos: ${invalidCount}` : '')
                setInputValue("")
            } else {
                if (EmailValidator.validate(event.target.value.trim())) {
                    newSelectedItem.push(event.target.value.trim());
                    setSelectedItem(newSelectedItem);
                    setInputError('')
                    setInputValue("")
                } else {
                    setInputError("E-mail inválido.")
                }
            }
        }

        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    // function handleChange(item) {
    //   let newSelectedItem = [...selectedItem];
    //   if (newSelectedItem.indexOf(item) === -1) {
    //     newSelectedItem = [...newSelectedItem, item];
    //   }
    //   setInputValue("");
    //   setSelectedItem(newSelectedItem);
    // }

    const handleDelete = (item) => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    function handleInputChange(event) {
        setInputValue(event.target.value);
        setInputError('')
    }
    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                selectedItem={selectedItem}
            >
                {({ getInputProps }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        onKeyDown: handleKeyDown,
                        placeholder
                    });
                    return (
                        <div>
                            <TextField
                                error={!!inputError}
                                helperText={inputError}
                                InputProps={{
                                    startAdornment: selectedItem.map((item) => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleDelete(item)}
                                        />
                                    )),
                                    onBlur: (event) => {
                                        handleKeyDown({ ...event, key: 'Enter' })
                                    },
                                    onChange: (event) => {
                                        handleInputChange(event);
                                        onChange(event);
                                    },
                                    onFocus
                                }}
                                {...other}
                                {...inputProps}
                            />
                        </div>
                    );
                }}
            </Downshift>
        </React.Fragment>
    );
}

TagsInput.defaultProps = {
    tags: []
};

TagsInput.propTypes = {
    selectedTags: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
};