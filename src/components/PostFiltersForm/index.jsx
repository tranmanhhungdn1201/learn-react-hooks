import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func
};
PostFiltersForm.defaultProps = {
    onSubmit: null
}


function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setsearchTerm] = useState('');
    const typingTimoutRef = useRef(null);
    
    function handleSearchTermChange(e){
        const value = (e.target.value);
        setsearchTerm(value);
        if(!onSubmit) return;

        if(typingTimoutRef.current){
            clearTimeout(typingTimoutRef.current);
        }

        typingTimoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            };
            onSubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input
                type="text"
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;