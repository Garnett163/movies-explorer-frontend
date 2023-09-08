import React, { useState } from 'react';

function SearchForm({ searchQuery, setSearchQuery, onSearch, shortFilm, setSearchError, onChangeCheckBox }) {
  const [inputError, setInputError] = useState(false);

  function handleChange(evt) {
    setSearchQuery(evt.target.value);
    setInputError(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!searchQuery) {
      setInputError(true);
      setSearchError('');
      return;
    }
    onSearch();
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmit} name='search' noValidate>
        <span className={`search-form__error ${inputError ? 'search-form__error_active ' : ''}`}>Нужно ввести ключевое слово</span>
        <input
          className='search-form__input'
          name='search'
          type='text'
          placeholder='Фильм'
          required
          onChange={handleChange}
          value={searchQuery}
        />
        <button className='search-form__button' type='submit'>
          Поиск
        </button>
      </form>
      <div className='search-form__checkbox-container'>
        <input type='checkbox' id='switch' className='search-form__checkbox' checked={shortFilm} onChange={onChangeCheckBox} />
        <label htmlFor='switch' className='search-form__toggle-switch'></label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
