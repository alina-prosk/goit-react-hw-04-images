import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchBarInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
    const [search, setSearsh] = useState('');

    const onChange = e => {
        setSearsh(e.currentTarget.value.toLowerCase());
    };

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit(search);
        setSearsh('');
    };

    return (
        <SearchBarHeader>
            <SearchForm onSubmit={onFormSubmit}>
                <SearchFormButton type="submit">
                    <FcSearch style={{ width: 30, height: 30 }} />
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>

                <SearchBarInput
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={search}
                    onChange={onChange}
                />
            </SearchForm>
        </SearchBarHeader>
    );
};
