import React from 'react';

function SearchForm({ searchQuery, setSearchQuery, onSearch }) {
  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch();
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmit} name='search'>
        <span className='search-form__error'>Error</span>
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
        <input type='checkbox' id='switch' className='search-form__checkbox' />
        <label htmlFor='switch' className='search-form__toggle-switch'></label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
