import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func
};
TodoForm.defaultProps = {
    onSubmit: null
}


function TodoForm(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(!onSubmit) return;

        const formValues = {
            title: value
        };
        onSubmit(formValues);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
}

export default TodoForm;